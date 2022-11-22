import { VStack, useToast, HStack } from 'native-base';
import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Share } from 'react-native';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';

// Criando uma tipagem
interface RouteParams {
    id: string;
}

export function Details(){
    const [optionSelected, setOptionSelected] = useState<'Seus palpites' | "Ranking do grupo">('Seus palpites')
    const [isLoading, setIsLoading] = useState(true)
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)
    
    // Capturando o que foi enviado pela rota como parâmetro
    const route = useRoute()
    const { id } = route.params as RouteParams

    // Utilizando o toast de aviso
    const toast = useToast()

    // Buscando as informações do backEnd
    async function fetchPoolDetails(){
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)

        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível carregar os detalhes',
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setIsLoading(false)
        }
    }

    // Fazendo o compartilhamento
    async function handleCodeShare() {
        // Dentro do método share é definido o que será compartilhado
        await Share.share({
            message: poolDetails.code
        })
    }
    
    // Toda vez que o conteúdo de id mudar, será executado novamente a função fetchPoolDetails
    useEffect(() => {
        fetchPoolDetails()
    },[id])

    // Se o isLoading for verdadeiro será renderizado o componente de loading
    if(isLoading){
        return (
            <Loading />
        )
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header 
                title={poolDetails.title} 
                showBackButton 
                showShareButton
                onShare={handleCodeShare}
            />

            {
                poolDetails._count?.participants > 0 ?
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option 
                        title='Seus palpites' 
                        isSelected={optionSelected === 'Seus palpites'}
                        onPress={() => setOptionSelected('Seus palpites')}
                        />

                        <Option 
                        title='Ranking do grupo' 
                        isSelected={optionSelected === 'Ranking do grupo'}
                        onPress={() => setOptionSelected('Ranking do grupo')}
                        />
                    </HStack>

                    <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
                </VStack>

                :

                <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>
    )
}