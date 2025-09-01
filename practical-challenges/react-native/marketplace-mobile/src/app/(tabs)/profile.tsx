import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";

import { Center, Heading, Image, VStack } from "@gluestack-ui/themed";

import { AccessIcon, CallIcon, Logout01Icon, Mail02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

const updateProfileSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.email('E-mail inválido').min(1, 'E-mail é obrigatório'),
    oldPassword: z.string().min(1, 'Senha é obrigatória'),
    newPassword: z.string().min(1, 'Nova senha é obrigatória'),
})

type UpdateProfileInputs = z.infer<typeof updateProfileSchema>

export default function Profile() {
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateProfileInputs>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            oldPassword: '',
            newPassword: ''
        }
    })

    function handleProfileUpdate({ name, phone, email, oldPassword, newPassword }: UpdateProfileInputs) {
        console.log(name, phone, email, oldPassword, newPassword)
    }

    function handleLogout() {}

    return (
        <VStack flex={1} px={'$10'} mb='$5' position="relative">
            <Center mt='$16' mb='$5'>
                <Image
                    w='$30'
                    h='$30'
                    rounded='$xl'
                    source={{
                        uri: 'https://github.com/luisbett.png',
                    }}
                    alt="Profile picture"
                />
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
                name="oldPassword"
                render={({ field: { value, onChange }}) => (
                    <Input
                        title='Senha atual'
                        icon={AccessIcon}
                        isPassword
                        placeholder="Sua senha"
                        value={value}
                        onChangeText={onChange}
                        errorMessage={errors.oldPassword?.message}
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
            <Button w='$full' title="Atualizar cadastro" mt='$6' onPress={handleSubmit(handleProfileUpdate)} />
        </VStack>
    )
}