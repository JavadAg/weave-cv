/**
 * Helper functions
 */
export const fmtDate = (iso: string | undefined, format: string) => {
  if (!iso) return ""

  const date = new Date(iso)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

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

  return format
    .replaceAll("YYYY", year.toString())
    .replaceAll("YY", year.toString().slice(-2))
    .replaceAll("MMMM", monthNames[month] || "")
    .replaceAll("MMM", shortMonthNames[month] || "")
    .replaceAll("MM", (month + 1).toString().padStart(2, "0"))
    .replaceAll("DD", day.toString().padStart(2, "0"))
}
