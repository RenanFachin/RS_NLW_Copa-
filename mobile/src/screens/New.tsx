import { useState } from 'react'
import { Heading, VStack, Text, useToast } from "native-base";

import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Button } from '../components/Button';

import Logo from '../assets/logo.svg'
import { api } from '../services/api'

export function New(){
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()
    
    // Função para criar um novo bolão
    // o trim() é para que não seja válido o preenchimento de espaços
    async function handlePoolCreate(){
        // Verificando se algo foi digitado
        if(!title.trim()){
            return toast.show({
                title: 'Informe um nome para o seu bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        // Enviando as informações para o backend
        try {
            setIsLoading(true)

            // requisição para api
            await api.post('/pools', { title })

            // Exibindo uma mensagem de sucesso da criação do bolão
            toast.show({
                title: 'Bolão criado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })

            // Limpando o valor de title e consequentemente o valor que está no input
            setTitle('')

        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível criar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }



    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" />

            {/* Vstack deixa uma coisa embaixo da outra */}
            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </Heading>

                <Input 
                    mb={2}
                    placeholder="Qual nome do seu bolão?"
                    onChangeText={setTitle}
                    value={title}
                />

                <Button 
                    title='CRIAR MEU BOLÃO'
                    onPress={handlePoolCreate}
                    isLoading={isLoading}
               />

                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>

            </VStack>

        </VStack>
    )
}