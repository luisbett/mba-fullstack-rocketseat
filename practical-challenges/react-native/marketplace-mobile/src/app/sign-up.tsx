import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";

import { api } from "@/services/api";

import { AppError } from "@/utils/AppError";

import { Box, Center, Heading, Text, VStack, ScrollView, useToast, Toast, ToastTitle, Image } from "@gluestack-ui/themed";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { AccessIcon, CallIcon, ImageUpload01Icon, Mail02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import Logo from '@/assets/logo.svg'
import { Pressable } from "react-native";
import { useState } from "react";

const signUpSchema = z.object({
    file: z
    .custom<FileList>(),
    name: z.string().min(1, 'Nome é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.email('E-mail inválido').min(1, 'E-mail é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
    passwordConfirmation: z.string().min(1, 'Confirmação de senha é obrigatória'),
})

type SignUpInputs = z.infer<typeof signUpSchema>

export default function SignUp() {
    const[userPhoto, setUserPhoto] = useState('')

    const toast = useToast()

    const { control, handleSubmit, formState: { errors }, reset } = useForm<SignUpInputs>({
        resolver: zodResolver(signUpSchema),
    })

    async function handleSignUp({ file, name, phone, email, password, passwordConfirmation }: SignUpInputs) {
        try {
            let fileId = ''

            if (file) {
                const files = new FormData()

                files.append('files', file as any)

                const { data } = await api.post('/attachments', files, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                fileId = data.attachments[0].id
            }

            await api.post('/sellers', { 
                name, 
                phone, 
                email, 
                avatarId: fileId ? fileId : null,
                password, 
                passwordConfirmation 
            })

            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    const toastId = 'toast-' + id
                    return (
                        <Toast 
                            nativeID={toastId}
                            action="success"
                            variant="accent"
                            alignItems="center"
                        >
                            <ToastTitle textAlign="center">Cadastro realizado com sucesso.</ToastTitle>
                        </Toast>
                    )
                }
            })

            reset()
            router.navigate('/')
        } catch (error) {
            const isAppError = error instanceof AppError

            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    const toastId = 'toast-' + id
                    return (
                        <Toast 
                            nativeID={toastId}
                            action="error"
                            variant="accent"
                        >
                            <ToastTitle textAlign="center">{title}</ToastTitle>
                        </Toast>
                    )
                }
            })
        }
    }

    async function handleUserPhotoSelect(onChange: (file: any) => void) {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            aspect: [4,4],
            allowsEditing: true
        })

        if(photoSelected.canceled) {
            return
        }

        const photoURI = photoSelected.assets[0].uri

        if(photoURI) {
            const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
                size: number
            }

            //Check if image is greater than 5MB
            if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                return toast.show({
                    placement: 'top',
                    render: ({ id }) => {
                        const toastId = 'toast-' + id
                        return (
                            <Toast 
                                nativeID={toastId}
                                action="error"
                                variant="accent"
                            >
                                <ToastTitle textAlign="center">A imagem deve ter no máximo 5MB de tamanho</ToastTitle>
                            </Toast>
                        )
                    }
                })
            }

            const fileExtension = photoURI.split('.').pop()

            setUserPhoto(photoURI)

            // Pass the file object to the form
            onChange({
                uri: photoURI,
                name: photoURI.split('/').pop(),
                type: `${photoSelected.assets[0].type}/${fileExtension}`,
            })
        }
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
                    <Controller 
                        control={control}
                        name="file"
                        render={({ field: { onChange }}) => (
                            <Pressable onPress={() => handleUserPhotoSelect(onChange)}>
                                { userPhoto ? (
                                    <Image
                                        w='$30'
                                        h='$30'
                                        rounded='$xl'
                                        mb='$5'
                                        source={{
                                            uri: userPhoto,
                                        }}
                                        alt="Profile picture"
                                    />
                                ) : (
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
                                )}
                            </Pressable>
                        )}
                    />
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
                    name="passwordConfirmation"
                    render={({ field: { value, onChange }}) => (
                        <Input
                            title='Confirmar senha'
                            icon={AccessIcon}
                            isPassword
                            placeholder="Confirme a senha"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.passwordConfirmation?.message}
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