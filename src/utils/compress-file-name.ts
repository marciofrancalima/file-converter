export function compressFileName(fileName: any): string {
  // Define the maximum length for the substring
  const maxSubstringLength = 18

  // Check if the fileName is longer than the maximum length
  if (fileName.length > maxSubstringLength) {
    // Extract the fileName (before the extension)
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.')

    // Extract the extension from the fileName
    const fileExtension = fileName.split('.').pop()

    // Calculate the length of characters to keep
    const charsToKeep =
      maxSubstringLength -
      (fileNameWithoutExtension.length + fileExtension.length + 3)

    // Create the compressed fileName
    const compressedFileName =
      fileNameWithoutExtension.substring(
        0,
        maxSubstringLength - fileExtension.length - 3,
      ) +
      '...' +
      fileNameWithoutExtension.slice(-charsToKeep) +
      '.' +
      fileExtension

    return compressedFileName
  } else {
    // If the fileName is shorter than the max length
    return fileName.trim()
  }
}
