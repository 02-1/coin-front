export function toFormattedString(value) {
  if (value >= 1000000) {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return value.toFixed(2);
  }
}
