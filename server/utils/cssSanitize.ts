export function sanitizeCss(input: string): string {
  if (!input) return ''
  const css = input
    .replace(/@import[^;]+;?/gi, '') // جلوگیری از لود منابع خارجی
    .replace(/url\\([^)]*\\)/gi, 'none') // url() ممنوع
    .replace(/position\\s*:\\s*fixed/gi, 'position: static') // fixed ممنوع

  // بلاک‌بندی ساده
  const blocks = css.split('}')
  const safeBlocks: string[] = []
  for (const b of blocks) {
    const [selRaw, declRaw] = b.split('{')
    if (!selRaw || !declRaw) continue

    // فقط داخل Shadow: :host یا .resume-root
    const sels = selRaw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.startsWith(':host') || s.startsWith('.resume-root'))
    if (!sels.length) continue

    const allowed = declRaw
      .split(';')
      .map((p) => p.trim())
      .filter(Boolean)
      .filter(isAllowed)
    if (!allowed.length) continue

    safeBlocks.push(`${sels.join(',')}{${allowed.join(';')}}`)
  }
  return safeBlocks.join('}')
}

const ALLOWED_PROPS = new Set([
  'color',
  'background-color',
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'margin',
  'margin-top',
  'margin-bottom',
  'padding',
  'padding-top',
  'padding-bottom',
  'border',
  'border-color',
  'border-width',
  'border-style',
  'border-radius',
  'text-align',
  'text-transform',
  'gap',
  'row-gap',
  'column-gap'
])
function isAllowed(d: string) {
  const [prop] = d.split(':')
  if (!prop) return false
  const p = prop.trim().toLowerCase()
  if (p.startsWith('--')) return true // اجازه‌ی CSS Variables
  return ALLOWED_PROPS.has(p)
}
