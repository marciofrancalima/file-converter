export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) return '0 Byte'

  // Index of the sizes array
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  // Size number
  const size = (bytes / Math.pow(1024, i)).toFixed(2)

  return `${size} ${sizes[i]}`
}
