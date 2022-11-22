// Para importar uma imagem é necessário importar este componente IMAGE from next/image
import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'

// Import do axios
import { api } from '../lib/axios'

// Criação do bolão
import { FormEvent, useState } from 'react'

// no TS, toda vez que temos uma função que recebe um tipo de parâmetro, é necessário por a tipagem esperada
interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

// props: HomeProps quer dizer que props ta seguindo a tipagem definida na interface HomeProps
export default function Home(props: HomeProps) {
  // Capturando o que foi digitado com state
  const [poolTitle, setPoolTitle]= useState('')

  async function createPool(event: FormEvent){
    // Retirando o comportamento padrão
    event.preventDefault()

    // Utilizando os state para ter acesso as informações digitadas no input
    try{
      // Na hora que o usuário cria um bolão, um code de responsta é gerado pelo banco de dados
      const response = await api.post('/pools',{
        title: poolTitle,
      })

      // Recebendo o código do bolão que foi retornado pela API
      const { code } = response.data

      // Copiando este código para a área de transferência do usuário
      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência')

      // Limpando o input ao finalizar a criação do bolão
      setPoolTitle('') 

    } catch (err){
      console.log(err)
      alert('Falha ao criar o bolão, tente novamente!')
    }

  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
        quality={100}
      />
    </div>
  )
}

// Fazendo a conexão com a API sem fazer com que os motores de busca "bloquem"
export const getServerSideProps = async () => {
  // Fazendo as promisses (aguardos de chamadas da API) ocorram de forma simultânea
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}
