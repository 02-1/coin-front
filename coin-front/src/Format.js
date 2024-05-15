export function toFormattedString(value) {
  if (typeof value === "number") {
    if (value >= 1000) {
      const parts = value.toFixed(0).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else if (value > 1) {
      return value.toFixed(0);
    } else {
      return value.toFixed(3);
    }
  } else {
    return value;
  }
}
