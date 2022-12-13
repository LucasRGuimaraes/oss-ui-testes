export function formatNumber(value) {
  return Intl.NumberFormat("en").format(value);
}

export function formatPercentage(value) {
  return Intl.NumberFormat("en", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value);
}
