export function toFormattedString(value) {
  if (typeof value === "number") {
    if (value >= 1000) {
      const parts = value.toFixed(0).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else if (value >= 100) {
      return value.toFixed(0);
    } else if (10 <= value && value < 100) {
      return value.toFixed(2);
    } else if (0 <= value && value < 10) {
      return value.toFixed(3);
    } else {
      return value.toFixed(4);
    }
  } else {
    return value;
  }
}
