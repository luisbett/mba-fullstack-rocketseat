import { router } from "expo-router";

import { useFonts, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'

import { Center, GluestackUIProvider, Heading, Text, VStack } from '@gluestack-ui/themed'
import { config } from '../../config/gluestack-ui.config'

import { AccessIcon, Mail02Icon } from "@hugeicons/core-free-icons";

import { Loading } from "@/components/loading";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import Logo from '@/assets/logo.svg'

export default function Index() {
    const [ fontsLoaded ] = useFonts({ DMSans_700Bold, Poppins_400Regular })

    function handleSignUp() {
        router.navigate('/sign-up')
    }

    function handleSignIn() {
        router.navigate('/(tabs)/products')
    }
    
    return (
        <GluestackUIProvider config={config}>
            { fontsLoaded ? (
                <VStack px={'$10'} flex={1}>
                    <Center mt='$16'>
                        <Logo width={'64px'} height={'48px'}/>
                    </Center>

                    <Center mt='$12' mb='$16'>
                        <Heading fontSize='$2xl' color="$gray500">Acesse sua conta</Heading>
                        <Text>Informe seu e-mail e senha para entrar</Text>
                    </Center>

                    <Input 
                        title='E-mail'
                        icon={Mail02Icon}
                        placeholder="mail@examplo.br"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        title='Senha'
                        icon={AccessIcon}
                        isPassword
                        placeholder="Sua senha" 
                    />
                    
                    <Button title="Acessar" mt='$10' withArrow onPress={handleSignIn} />

                    <Text mt='$41'>Ainda não tem uma conta?</Text>
                    <Button mt='$5' title="Cadastrar" variant="outline" withArrow onPress={handleSignUp} />
                </VStack>
            ) : (
                <Loading />
            )}
        </GluestackUIProvider>
    )
}