import { primitive as auraPrimitive } from '@primeuix/themes/aura/base'

const token = (scale: unknown, key: string) =>
  (scale as Record<string, string> | undefined)?.[key]?.trim()

export function getStatisticChartPalette() {
  const offerColor = token(auraPrimitive.cyan, '500') ?? '#06b6d4'
  const refusalColor = token(auraPrimitive.orange, '500') ?? '#f97316'
  const pendingColor = token(auraPrimitive.gray, '500') ?? '#6b7280'

  const offerHoverColor = token(auraPrimitive.cyan, '400') ?? '#22d3ee'
  const refusalHoverColor = token(auraPrimitive.orange, '400') ?? '#fb923c'
  const pendingHoverColor = token(auraPrimitive.gray, '400') ?? '#9ca3af'

  return {
    backgroundColor: [offerColor, refusalColor, pendingColor] as const,
    hoverBackgroundColor: [offerHoverColor, refusalHoverColor, pendingHoverColor] as const,
  }
}

export function getChartTextColor(): string {
  const rootStyle = getComputedStyle(document.documentElement)
  return (
    rootStyle.getPropertyValue('--p-text-color')?.trim() || getComputedStyle(document.body).color
  )
}
