import type { LaunchOptions } from "puppeteer-core"

export default defineEventHandler(async (event) => {
  let browser

  try {
    const body = await readBody(event)
    const { html, format = "A4" } = body

    if (!html) {
      throw createError({
        statusCode: 400,
        statusMessage: "HTML content is required"
      })
    }

    const isVercel = !!process.env.VERCEL_ENV
    let puppeteer: typeof import("puppeteer") | typeof import("puppeteer-core")

    let launchOptions: LaunchOptions = {
      headless: true
    }

    if (isVercel) {
      const chromiumModule = await import("@sparticuz/chromium")
      const chromium = chromiumModule.default
      puppeteer = await import("puppeteer-core")
      const executablePath = await chromium.executablePath()
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath
      }
    } else {
      puppeteer = await import("puppeteer")
    }

    browser = await puppeteer.launch(launchOptions)

    const page = await browser.newPage()

    // Get paper dimensions for @page rule
    const PAPER_SIZES: Record<string, { w: number; h: number }> = {
      A4: { w: 210, h: 297 },
      Letter: { w: 215.9, h: 279.4 }
    }
    const paperSize = PAPER_SIZES[format] || PAPER_SIZES.A4

    // Wrap HTML with proper styling to ensure no default margins/padding
    const wrappedHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `

    // Set content with HTML
    await page.setContent(wrappedHtml, {
      waitUntil: "networkidle0"
    })

    // Generate PDF with explicit dimensions matching @page rule
    const pdf = await page.pdf({
      width: `${paperSize.w}mm`,
      height: `${paperSize.h}mm`,
      printBackground: true,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm"
      }
    })

    // Return PDF as buffer
    setHeader(event, "Content-Type", "application/pdf")
    setHeader(event, "Content-Disposition", `attachment; filename="resume.pdf"`)

    return pdf
  } catch (error: unknown) {
    console.error("PDF generation error:", error)
    const err = error as { statusCode?: number; statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Failed to generate PDF"
    })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
})
