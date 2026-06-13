// src/utils/formatters.js
export function formatCurrency(amountStr, {
  minorUnit = 2,
  decimalSeparator = '.',
  prefix = '$',
  suffix = ''
} = {}) {
  const amount = parseInt(amountStr, 10);
  if (isNaN(amount)) return `${prefix}0${decimalSeparator}${'0'.repeat(minorUnit)}${suffix}`;
  const factor = Math.pow(10, minorUnit);
  const number = amount / factor;
  return `${prefix}${number.toLocaleString(undefined, {
    minimumFractionDigits: minorUnit,
    maximumFractionDigits: minorUnit
  })}${suffix}`;
}