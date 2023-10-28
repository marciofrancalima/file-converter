import { File, FileAudio, FileImage, FileText, Video } from 'lucide-react'

export const fileToIcon = (fileType: any) => {
  if (fileType.includes('video')) return <Video />
  if (fileType.includes('audio')) return <FileAudio />
  if (fileType.includes('text')) return <FileText />
  if (fileType.includes('image')) return <FileImage />
  else return <File />
}
