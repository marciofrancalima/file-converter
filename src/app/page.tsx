import { Dropzone } from '@/components/dropzone'

export default function Home() {
  return (
    <div className="space-y-16 pb-8">
      <div className="space-y-6">
        <h1 className="text-center text-3xl font-medium md:text-5xl">
          Meu Conversor de Arquivos
        </h1>
        <p className="text-md text-center text-gray-400 md:px-24 md:text-lg xl:px-44 2xl:px-52">
          Dê asas à tua imaginação com o Conversor de Arquivos - a sua
          ferramenta online preferida para conversões (gratuitas e sem limites).
          Transforme fotos, áudios e vídeos para o formato que quiser. Comece a
          converter agora mesmo!
        </p>
      </div>

      <Dropzone />
    </div>
  )
}
