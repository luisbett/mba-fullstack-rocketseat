import { useState } from "react";
import { router } from "expo-router";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";

import { Center, Heading, Image, Toast, ToastTitle, useToast, VStack } from "@gluestack-ui/themed";

import { AccessIcon, CallIcon, ImageUpload01Icon, Logout01Icon, Mail02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { api } from "@/services/api";

import { AppError } from "@/utils/AppError";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Box } from "@gluestack-ui/themed";
import { HugeiconsIcon } from "@hugeicons/react-native";

const updateProfileSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.email('E-mail inválido').min(1, 'E-mail é obrigatório'),
    password: z.string(),
    newPassword: z.string(),
})

type UpdateProfileInputs = z.infer<typeof updateProfileSchema>

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    const { seller, signOut, updateSeller } = useAuth()

    const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateProfileInputs>({
        resolver: zodResolver(updateProfileSchema),
        values: {
            name: seller.name,
            phone: seller.phone,
            email: seller.email,
            password: '',
            newPassword: ''
        }
    })

    async function handleProfileUpdate({ name, phone, email, password, newPassword }: UpdateProfileInputs) {
        try {
            setIsLoading(true)

            const { data } = await api.put('/sellers', {
                name, phone, email, password, newPassword
            })

            if(data.seller) {
                updateSeller(data.seller)
            }

            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    const toastId = 'toast-' + id
                    return (
                        <Toast 
                            nativeID={toastId}
                            action="success"
                            variant="accent"
                        >
                            <ToastTitle textAlign="center">Perfil atualizado com sucesso.</ToastTitle>
                        </Toast>
                    )
                }
            })

            reset()
        } catch (error) {
            const isAppError = error instanceof AppError
            
            const title = isAppError ? error.message : 'Não foi possível atualizar o perfil. Tente novamente mais tarde.'

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
        } finally {
            setIsLoading(false)
        }
    }

    async function handleLogout() {
        await signOut()
        router.replace('/')
    }

    return (
        <VStack flex={1} px={'$10'} mb='$5' position="relative">
            <Center mt='$16' mb='$5'>
                { seller.avatar?.url ? (
                    <Image
                        w='$30'
                        h='$30'
                        rounded='$xl'
                        source={{
                            uri: seller.avatar?.url,
                        }}
                        alt="Profile picture"
                    />
                ) : (
                    <Box
                        w='$30'
                        h='$30'
                        rounded='$xl'
                        bgColor="$shape"
                        justifyContent="center"
                        alignItems="center"
                        
                    >
                        <HugeiconsIcon icon={ImageUpload01Icon} color='#F24D0D' width='32px' height='32px' />
                    </Box>
                )}
            </Center>
            <Button
                icon={Logout01Icon}
                iconColor='#DC3545'
                variant="outline"
                position="absolute"
                w='$10'
                top='$16'
                right='$6'
                onPress={handleLogout}
            />
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
                        title='Senha atual'
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
                name="newPassword"
                render={({ field: { value, onChange }}) => (
                    <Input
                        title='Nova senha'
                        icon={AccessIcon}
                        isPassword
                        placeholder="Sua nova senha"
                        value={value}
                        onChangeText={onChange}
                        errorMessage={errors.newPassword?.message}
                    />
                )}
            />
            <Button w='$full' title="Atualizar cadastro" mt='$6' onPress={handleSubmit(handleProfileUpdate)} isLoading={isLoading} />
        </VStack>
    )
}