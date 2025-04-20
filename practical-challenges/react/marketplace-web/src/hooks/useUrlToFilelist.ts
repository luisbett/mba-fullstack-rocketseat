export async function urlToFileList(
  url: string,
  fileName: string,
): Promise<FileList> {
  const response = await fetch(url)
  const blob = await response.blob()
  const file = new File([blob], fileName, { type: blob.type })

  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(file)

  return dataTransfer.files
}
