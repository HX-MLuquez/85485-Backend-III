export function suma(a, b) {
  // console.log("--->", a, b);
  if (typeof a !== "number" || typeof b !== "number") {
    return "error";
  }
  return a + b;
}

export function sumaPro(...args) {}
