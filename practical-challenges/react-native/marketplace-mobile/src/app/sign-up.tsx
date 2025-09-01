import { router } from "expo-router";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";

import { Box, Center, Heading, Text, VStack, ScrollView } from "@gluestack-ui/themed";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { AccessIcon, CallIcon, ImageUpload01Icon, Mail02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import Logo from '@/assets/logo.svg'

const signUpSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.email('E-mail inválido').min(1, 'E-mail é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
    passwordConfirm: z.string().min(1, 'Confirmação de senha é obrigatória'),
})

type SignUpInputs = z.infer<typeof signUpSchema>

export default function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpInputs>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    })

    function handleSignUp({ name, phone, email, password, passwordConfirm }: SignUpInputs) {
        console.log(name, phone, email, password, passwordConfirm)
    }

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
                <Controller 
                    control={control}
                    name="name"
                    render={({ field: { value, onChange }}) => (
                        <Input 
                            title='Nome'
                            icon={UserIcon}
                            placeholder="Seu nome completo"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="phone"
                    render={({ field: { value, onChange }}) => (
                        <Input 
                            title='Telefone'
                            icon={CallIcon}
                            placeholder="(00) 00000-0000"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.phone?.message}
                        />
                    )}
                />
                <Heading fontSize='$md' mt='$5' mb='$5'>Acesso</Heading>
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
                            errorMessage={errors.password?.message}
                        />
                    )}
                />
                <Controller 
                    control={control}
                    name="passwordConfirm"
                    render={({ field: { value, onChange }}) => (
                        <Input
                            title='Confirmar senha'
                            icon={AccessIcon}
                            isPassword
                            placeholder="Confirme a senha"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.passwordConfirm?.message}
                        />
                    )}
                />
                <Button title="Cadastrar" w='$full' mt='$10' withArrow onPress={handleSubmit(handleSignUp)} />
                <Text mt='$15'>Já tem uma conta?</Text>
                <Button mt='$5' w='$full' title="Acessar" variant="outline" withArrow onPress={() => router.back()} />
            </VStack>
        </ScrollView>
    )
}