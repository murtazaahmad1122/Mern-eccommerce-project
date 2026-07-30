const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(value) {
  const amount = Number(value);

  return Number.isFinite(amount) ? currencyFormatter.format(amount) : "";
}
