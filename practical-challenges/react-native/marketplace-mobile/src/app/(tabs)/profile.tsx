import { Center, Heading, Image, VStack } from "@gluestack-ui/themed";

import { AccessIcon, CallIcon, Logout01Icon, Mail02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Profile() {
    function handleProfileUpdate() {}

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
                title='Senha atual'
                icon={AccessIcon}
                isPassword
                placeholder="Sua senha" 
            />

            <Input
                title='Nova senha'
                icon={AccessIcon}
                isPassword
                placeholder="Sua nova senha"
            />
            
            <Button w='$full' title="Atualizar cadastro" mt='$6' onPress={handleProfileUpdate} />
        </VStack>
    )
}