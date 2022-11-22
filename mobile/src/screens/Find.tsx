import { useState } from 'react'
import { Heading, useToast, VStack } from "native-base";
import { api } from '../services/api'

import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export function Find(){
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')

    const toast = useToast()
    const { navigate } = useNavigation()
    
    async function handleJoinPool(){

        try {
            setIsLoading(true)

            // Caso venha vazio o campo de input
            if(!code.trim()){
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            // Conectando e mandando os dados para API
            await api.post('pools/join', { code })
            navigate('pools') // redirecionando o usuário

            toast.show({
                title: `Você entrou no bolão de código ${code}`,
                placement: 'top',
                bgColor: 'green.500'
            })

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            // bolão não encontrado
            if(error.response?.data?.message === 'Pool not found.'){
                return toast.show({
                    title: 'Bolão não encontrado!',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            // Usuário já está no bolão
            if(error.response?.data?.message === 'You are already a join this pool.'){
                return toast.show({
                    title: 'Você já está neste bolão!',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            // Erros genéricos
            toast.show({
                title: 'Não foi possível encontrar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })

        }

    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton/>

            {/* Vstack deixa uma coisa embaixo da outra */}
            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de seu código único
                </Heading>

                <Input 
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />

                <Button 
                    title='BUSCAR BOLÃO'
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />


            </VStack>

        </VStack>
    )
}