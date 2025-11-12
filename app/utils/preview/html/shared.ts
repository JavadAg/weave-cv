/**
 * Helper functions
 */
const sanitizeFormat = (format: string, options?: { hideDay?: boolean }) => {
  if (!options?.hideDay) {
    return format
  }

  const tokenRegex = /(YYYY|YY|MMMM|MMM|MM|DD)|([^YMD]+)/g
  const tokens: Array<{ value: string; type: "date" | "separator" }> = []

  let match: RegExpExecArray | null
  while ((match = tokenRegex.exec(format)) !== null) {
    if (match[1]) {
      tokens.push({ value: match[1], type: "date" })
    } else if (match[2]) {
      tokens.push({ value: match[2], type: "separator" })
    }
  }

  const filtered = tokens.filter((token) => !(token.type === "date" && token.value === "DD"))

  const sanitized = filtered.filter((token, index, array) => {
    if (token.type !== "separator") return true

    const hasPreviousDate = array.slice(0, index).some((item) => item.type === "date")
    const hasNextDate = array.slice(index + 1).some((item) => item.type === "date")

    return hasPreviousDate && hasNextDate
  })

  const result = sanitized.map((token) => token.value).join("")

  return result.replaceAll(/\s{2,}/g, " ").trim() || "YYYY-MM"
}

export const fmtDate = (iso: string | null | undefined, format: string, options?: { hideDay?: boolean }) => {
  if (!iso) return ""

  const date = new Date(iso)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const effectiveFormat = sanitizeFormat(format, options)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return effectiveFormat
    .replaceAll("YYYY", year.toString())
    .replaceAll("YY", year.toString().slice(-2))
    .replaceAll("MMMM", monthNames[month] || "")
    .replaceAll("MMM", shortMonthNames[month] || "")
    .replaceAll("MM", (month + 1).toString().padStart(2, "0"))
    .replaceAll("DD", day.toString().padStart(2, "0"))
}
