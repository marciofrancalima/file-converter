import { FileImage, Music, Clapperboard, Rocket } from 'lucide-react'

export const About = () => {
  return (
    <div className="text-md space-y-12 pb-4 text-gray-500 md:pb-8 md:text-lg">
      <p>
        Dê um alô para o Conversor de Arquivos 👏 o seu conversor multimídia que
        te dá o poder de modificar imagens, arquivos de áudio e vídeos do jeito
        que você quiser, sem gastar um tostão!
      </p>

      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-medium text-gray-700 md:text-2xl">
          <FileImage />
          Conversor de imagem
        </h2>
        <p>
          Dê asas à tua criatividade com nossa ferramenta de conversão de
          imagens. Sabe aquela foto que precisa redimensionar, cortar, girar ou
          até mesmo mudar de formato? Pois bem, pode contar conosco. De JPEG
          para PNG e tudo o que estiver pelo meio, enriquece tuas imagens sem
          dores de cabeça.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-medium text-gray-700 md:text-2xl">
          <Music />
          Transformação de Áudio
        </h2>
        <p>
          Põe pra tocar esses projetos de áudio! Com nosso conversor de áudio,
          você pode mudar arquivos entre diversos formatos tipo MP3, WAV ou AAC.
          Faça seus ajustes e arrase na trilha sonora perfeita.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-medium text-gray-700 md:text-2xl">
          <Clapperboard />
          Transformação de Vídeo
        </h2>
        <p>
          Luz, câmera, ação! Edite e converta vídeos à vontade. Quer mudar
          formatos ou brincar de diretor cortando e grudando cenas? Faça e solte
          o play nos vídeos mais impressionantes - seja para o Instagram,
          YouTube ou qualquer outra finalidade.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-medium text-gray-700 md:text-2xl">
          <Rocket />
          Use sem limites (grátis)
        </h2>
        <p>
          Aqui não tem essa de cobrar a mais ou jogar regras mirabolantes. Use a
          sua criatividade e transforme arquivos de imagem, áudio e vídeo como
          quiser. Seu bolso agradece, porque aqui é zero estresse e zero custo!
        </p>
      </div>
    </div>
  )
}

export default About
