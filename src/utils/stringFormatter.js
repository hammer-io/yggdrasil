export const convertBytesToString = (n) => { // eslint-disable-line import/prefer-default-export
  if (n < 1000) {
    return `${n} Bytes`
  }
  if (n < 1000000) {
    return `${(n / 1000).toFixed(2)} KB`
  }
  if (n < 1000000000) {
    return `${(n / 1000000).toFixed(2)} MB`
  }
  if (n < 1000000000000) {
    return `${(n / 1000000000).toFixed(2)} GB`
  }
  return `${(n / 1000000000).toFixed(2)} TB`
}
