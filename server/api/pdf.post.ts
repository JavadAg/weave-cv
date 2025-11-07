import type { LaunchOptions } from "puppeteer-core"
import type { TFontFamily } from "~/constants/fonts"
import { PAPER_SIZES, type TPaperSize } from "~/constants/papers"
import { buildFontCss } from "~/utils/preview/core/fontUtils"

export default defineEventHandler(async (event) => {
  let browser:
    | Awaited<ReturnType<typeof import("puppeteer").launch>>
    | Awaited<ReturnType<typeof import("puppeteer-core").launch>>
    | undefined

  try {
    const body = (await readBody(event)) as { html: string; format: TPaperSize; fontFamily: TFontFamily }
    const { html, format, fontFamily } = body

    if (!html) {
      throw createError({
        statusCode: 400,
        statusMessage: "HTML content is required"
      })
    }

    const isVercel = !!process.env.VERCEL_ENV
    let puppeteer: typeof import("puppeteer") | typeof import("puppeteer-core")

    const launchOptions: LaunchOptions = {
      headless: true,
      args: isVercel ? [] : ["--disable-web-security", "--disable-features=IsolateOrigins,site-per-process"]
    }

    if (isVercel) {
      const chromiumModule = await import("@sparticuz/chromium")
      const chromium = chromiumModule.default
      puppeteer = await import("puppeteer-core")
      launchOptions.executablePath = await chromium.executablePath()
      launchOptions.args = [...chromium.args, "--no-sandbox", "--disable-web-security", "--disable-setuid-sandbox"]
    } else {
      puppeteer = await import("puppeteer")
    }

    browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()

    const paperSize = PAPER_SIZES[format] || PAPER_SIZES.A4

    await page.setViewport({
      width: paperSize.w,
      height: paperSize.h,
      deviceScaleFactor: 1
    })

    const host = getHeader(event, "host") || "localhost:3000"
    const protocol = getHeader(event, "x-forwarded-proto") || (host.includes("localhost") ? "http" : "https")
    const baseUrl = `${protocol}://${host}`
    const fontCss = buildFontCss(fontFamily as TFontFamily, baseUrl)

    const wrappedHtml = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            ${fontCss}
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          </style>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>${html}</body>
      </html>`

    await page.setContent(wrappedHtml, {
      waitUntil: "networkidle0",
      timeout: 30_000
    })

    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready
    })
    await new Promise((resolve) => setTimeout(resolve, 500))

    const pdf = await page.pdf({
      width: `${paperSize.w}mm`,
      height: `${paperSize.h}mm`,
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" }
    })

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
