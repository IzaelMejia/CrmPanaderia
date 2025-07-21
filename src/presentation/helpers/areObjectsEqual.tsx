export function areObjectsEqual(a: any, b: any) {
  if (!a || !b) return false;
  const keys = Object.keys(a);
  for (let key of keys) {
    if (typeof a[key] === "object" && typeof b[key] === "object") {
      if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) return false;
    } else if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
