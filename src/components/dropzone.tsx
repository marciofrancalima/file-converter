'use client'

import { useState } from 'react'
import ReactDropzone from 'react-dropzone'
import { useToast } from './ui/use-toast'
import { FileSymlink, UploadCloud } from 'lucide-react'

const extensions = {
  image: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'ico',
    'tif',
    'tiff',
    'svg',
    'raw',
    'tga',
  ],
  video: [
    'mp4',
    'm4v',
    'mp4v',
    '3gp',
    '3g2',
    'avi',
    'mov',
    'wmv',
    'mkv',
    'flv',
    'ogv',
    'webm',
    'h264',
    '264',
    'hevc',
    '265',
  ],
  audio: ['mp3', 'wav', 'ogg', 'aac', 'wma', 'flac', 'm4a'],
}

export const Dropzone = () => {
  const [isHover, setIsHover] = useState(false)
  const { toast } = useToast()

  const handleHover = () => setIsHover(true)
  const handleExitHover = () => setIsHover(false)

  return (
    <ReactDropzone
      onDrop={() => {
        console.log('handleUpload')
      }}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      onDropRejected={() => {
        handleExitHover()
        toast({
          variant: 'destructive',
          title: 'Erro ao tentar carregar arquivo',
          description: 'Arquivos permitidos: Áudio, Vídeo e imagem',
          duration: 4000,
        })
      }}
      onError={() => {
        handleExitHover()
        toast({
          variant: 'destructive',
          title: 'Erro ao tentar carregar arquivo',
          description: 'Arquivos permitidos: Áudio, Vídeo e imagem',
          duration: 4000,
        })
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="flex h-72 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed bg-gray-50 shadow-sm lg:h-80 xl:h-96"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-gray-500">
            {isHover ? (
              <>
                <div className="flex justify-center text-6xl">
                  <FileSymlink size={56} />
                </div>
                <h3 className="text-center text-2xl font-medium">
                  Solte os arquivos aqui
                </h3>
              </>
            ) : (
              <>
                <div className="flex justify-center text-6xl">
                  <UploadCloud size={56} />
                </div>
                <h3 className="text-center text-2xl font-medium">
                  Clique ou arraste os arquivo aqui
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  )
}
