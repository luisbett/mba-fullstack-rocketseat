import { router } from "expo-router";

import { Box, Center, Heading, Text, VStack, ScrollView } from "@gluestack-ui/themed";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { AccessIcon, CallIcon, ImageUpload01Icon, Mail02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import Logo from '@/assets/logo.svg'

export default function SignUp() {
    function handleSignUp() {}

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={'$10'} mb='$12'>
                <Center mt='$16'>
                    <Logo width={'64px'} height={'48px'}/>
                </Center>

                <Center mt='$12' mb='$8.5'>
                    <Heading fontSize='$2xl' color="$gray500">Crie sua conta</Heading>
                    <Text textAlign="center">Informe os seus dados pessoais e de acesso</Text>
                </Center>

                <Center>
                    <Box 
                        bgColor="$shape"
                        width='$30'
                        height='$30'
                        rounded='$xl'
                        justifyContent="center"
                        alignItems="center"
                        mb='$5'
                    >
                        <HugeiconsIcon icon={ImageUpload01Icon} color='#F24D0D' width='32px' height='32px' />
                    </Box>
                </Center>

                <Input 
                    title='Nome'
                    icon={UserIcon}
                    placeholder="Seu nome completo"
                />

                <Input 
                    title='Telefone'
                    icon={CallIcon}
                    placeholder="(00) 00000-0000"
                />

                <Heading fontSize='$md' mt='$5' mb='$5'>Acesso</Heading>

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

                <Input
                    title='Confirmar senha'
                    icon={AccessIcon}
                    isPassword
                    placeholder="Confirme a senha" 
                />
                
                <Button title="Cadastrar" w='$full' mt='$10' withArrow onPress={handleSignUp} />

                <Text mt='$15'>Já tem uma conta?</Text>
                <Button mt='$5' w='$full' title="Acessar" variant="outline" withArrow onPress={() => router.back()} />
            </VStack>
        </ScrollView>
    )
}