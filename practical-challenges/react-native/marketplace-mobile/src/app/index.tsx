import { router } from "expo-router";
import { useForm, Controller } from 'react-hook-form'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useFonts, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'

import { Center, GluestackUIProvider, Heading, Text, VStack } from '@gluestack-ui/themed'
import { config } from '../../config/gluestack-ui.config'

import { AccessIcon, Mail02Icon } from "@hugeicons/core-free-icons";

import { Loading } from "@/components/loading";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import Logo from '@/assets/logo.svg'

const signInSchema = z.object({
    email: z.email('E-mail inválido').min(1, 'E-mail é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória')
})

type SignInInputs = z.infer<typeof signInSchema>

export default function Index() {
    const [ fontsLoaded ] = useFonts({ DMSans_700Bold, Poppins_400Regular, Poppins_700Bold })

    const { control, handleSubmit, formState: { errors } } = useForm<SignInInputs>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    function handleSignIn({ email, password }: SignInInputs) {
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
                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: { value, onChange }}) => (
                            <Input 
                                title='E-mail'
                                icon={Mail02Icon}
                                placeholder="mail@examplo.br"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: { value, onChange }}) => (
                            <Input
                                title='Senha'
                                icon={AccessIcon}
                                isPassword
                                placeholder="Sua senha" 
                                value={value}
                                onChangeText={onChange}
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                returnKeyType="send"
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Button title="Acessar" mt='$5' w='$full' withArrow onPress={handleSubmit(handleSignIn)} />
                    <Text mt='$41'>Ainda não tem uma conta?</Text>
                    <Button mt='$5' w='$full' title="Cadastrar" variant="outline" withArrow onPress={() => router.navigate('/sign-up')} />
                </VStack>
            ) : (
                <Loading />
            )}
        </GluestackUIProvider>
    )
}