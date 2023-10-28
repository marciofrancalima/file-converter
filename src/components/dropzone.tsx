'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ReactDropzone from 'react-dropzone'
import { useToast } from './ui/use-toast'
import {
  Check,
  Download,
  FileSymlink,
  Loader,
  UploadCloud,
  X,
  XCircle,
} from 'lucide-react'
import { Action } from '../../types'
import { Skeleton } from './ui/skeleton'
import { fileToIcon } from '@/utils/file-to-icon'
import { compressFileName } from '@/utils/compress-file-name'
import { bytesToSize } from '@/utils/bytes-to-size'
import { convertFile } from '@/utils/convert-file'
import { Badge } from './ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import loadFfmpeg from '@/utils/load-ffmpeg'

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
  const [actions, setActions] = useState<Action[]>([])
  const [files, setFiles] = useState<Array<any>>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [defaultValues, setDefaultValues] = useState('video')
  const [selected, setSelected] = useState('...')
  const acceptedFiles = {
    'image/*': [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.webp',
      '.ico',
      '.tif',
      '.tiff',
      '.raw',
      '.tga',
    ],
    'audio/*': [],
    'video/*': [],
  }
  const ffmpegRef = useRef<any>(null)
  const { toast } = useToast()

  const handleHover = () => setIsHover(true)
  const handleExitHover = () => setIsHover(false)

  const updateAction = (fileName: string, to: string) => {
    setActions(
      actions.map((action) => {
        if (action.fileName === fileName) {
          return {
            ...action,
            to,
          }
        }

        return action
      }),
    )
  }

  const download = (action: Action) => {
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = action.url
    a.download = action.output

    document.body.appendChild(a)
    a.click()

    // Clean up after download
    URL.revokeObjectURL(action.url)
    document.body.removeChild(a)
  }

  const downloadAll = () => {
    for (const action of actions) {
      !action.isError && download(action)
    }
  }

  const convert = async () => {
    let tmpActions = actions.map((elt) => ({
      ...elt,
      isConverting: true,
    }))

    setActions(tmpActions)
    setIsConverting(true)

    for (const action of tmpActions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action)

        tmpActions = tmpActions.map((elt) =>
          elt === action
            ? {
                ...elt,
                isConverted: true,
                isConverting: false,
                url,
                output,
              }
            : elt,
        )

        setActions(tmpActions)
      } catch (error) {
        tmpActions = tmpActions.map((elt) =>
          elt === action
            ? {
                ...elt,
                isConverted: false,
                isConverting: false,
                isError: true,
              }
            : elt,
        )

        setActions(tmpActions)
      }
    }

    setIsDone(true)
    setIsConverting(false)
  }

  const reset = () => {
    setIsDone(false)
    setActions([])
    setFiles([])
    setIsReady(false)
    setIsConverting(false)
  }

  const handleUpload = (data: Array<any>) => {
    handleExitHover()
    setFiles(data)

    const tmp: Action[] = []

    data.forEach((file: any) => {
      tmp.push({
        fileName: file.name,
        fileSize: file.size,
        from: file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2),
        to: null,
        fileType: file.type,
        file,
        isConverting: false,
        isConverted: false,
        isError: false,
      })
    })

    setActions(tmp)
  }

  const deleteAction = (action: Action) => {
    setActions(actions.filter((elt) => elt !== action))
    setFiles(files.filter((elt) => elt.name !== action.fileName))
  }

  const checkIsReady = useCallback(() => {
    let tmpIsReady = true

    actions.forEach((action: Action) => {
      if (!action.to) {
        tmpIsReady = false
      }
    })

    setIsReady(tmpIsReady)
  }, [actions])

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false)
      setFiles([])
      setIsReady(false)
      setIsConverting(false)
    } else {
      checkIsReady()
    }
  }, [actions, checkIsReady])

  const load = async () => {
    const ffmpegResponse: FFmpeg = await loadFfmpeg()
    ffmpegRef.current = ffmpegResponse

    setIsLoaded(true)
  }

  useEffect(() => {
    load()
  }, [])

  if (actions.length) {
    return (
      <div className="space-y-6">
        {actions.map((action: Action, i: any) => (
          <div
            key={i}
            className="relative flex h-fit w-full cursor-pointer flex-wrap items-center justify-between space-y-2 rounded-xl border px-4 py-4 lg:h-20 lg:flex-nowrap lg:px-10 lg:py-0"
          >
            {!isLoaded && (
              <Skeleton className="absolute -ml-10 h-full w-full cursor-progress rounded-xl" />
            )}
            <div className="flex items-center gap-4">
              <span className="text-2xl text-green-600">
                {fileToIcon(action.fileType)}
              </span>
              <div className="flex w-96 items-center gap-1">
                <span className="text-md overflow-x-hidden font-medium">
                  {compressFileName(action.fileName)}
                </span>
                <span className="text-sm text-gray-400">
                  {bytesToSize(action.fileSize)}
                </span>
              </div>
            </div>

            {action.isError ? (
              <Badge variant="destructive" className="flex gap-2">
                <span>Erro ao converter arquivo</span>
                <XCircle />
              </Badge>
            ) : action.isConverted ? (
              <Badge variant="default" className="flex gap-2 bg-green-500">
                <span>Feito</span>
                <Check />
              </Badge>
            ) : action.isConverting ? (
              <Badge variant="default" className="flex gap-2">
                <span>Convertendo</span>
                <span className="animate-spin">
                  <Loader />
                </span>
              </Badge>
            ) : (
              <div className="text-md flex items-center gap-4 text-gray-400">
                <span>Converter para</span>
                <Select
                  onValueChange={(value) => {
                    if (extensions.audio.includes(value)) {
                      setDefaultValues('audio')
                    } else if (extensions.video.includes(value)) {
                      setDefaultValues('video')
                    }
                    setSelected(value)
                    updateAction(action.fileName, value)
                  }}
                  value={selected}
                >
                  <SelectTrigger className="text-md w-32 bg-gray-50 text-center font-medium text-gray-600 outline-none focus:outline-none focus:ring-0">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent className="h-fit">
                    {action.fileType.includes('image') && (
                      <div className="grid w-fit grid-cols-2 gap-2">
                        {extensions.image.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}

                    {action.fileType.includes('video') && (
                      <Tabs defaultValue={defaultValues} className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="video" className="w-full">
                            Vídeo
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="w-full">
                            Áudio
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="video">
                          <div className="grid w-fit grid-cols-3 gap-2">
                            {extensions.video.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="audio">
                          <div className="grid w-fit grid-cols-3 gap-2">
                            {extensions.audio.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}

                    {action.fileType.includes('audio') && (
                      <div className="grid w-fit grid-cols-2 gap-2">
                        {extensions.audio.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action.isConverted ? (
              <Button variant="outline" onClick={() => download(action)}>
                Baixar
              </Button>
            ) : (
              <span
                onClick={() => deleteAction(action)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-2xl text-gray-400 hover:bg-gray-50"
              >
                <X />
              </span>
            )}
          </div>
        ))}

        <div className="flex w-full justify-end">
          {isDone ? (
            <div className="w-fit space-y-4">
              <Button
                size="lg"
                className="text-md relative flex w-full items-center gap-2 rounded-xl py-4 font-semibold"
                onClick={downloadAll}
              >
                {actions.length > 1 ? 'Baixar todos' : 'Baixar'}
                <Download />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={reset}
                className="rounded-xl"
              >
                Converter outro(s) arquivo(s)
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={!isReady || isConverting}
              className="text-md relative flex w-44 items-center rounded-xl py-4 font-semibold"
              onClick={convert}
            >
              {isConverting ? (
                <span className="animate-spin text-lg">
                  <Loader />
                </span>
              ) : (
                <span>Converter</span>
              )}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={acceptedFiles}
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
