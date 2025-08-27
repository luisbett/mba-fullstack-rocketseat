import { Box, Center, Heading, HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { AccessIcon, CallIcon, ImageUpload01Icon, Logout01Icon, Mail02Icon, UserIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Profile() {
    function handleProfileUpdate() {}

    function handleLogout() {}

    return (
        <VStack flex={1} px={'$10'} mb='$5' position="relative">
            <Center mt='$16' mb='$5'>
                <Box 
                    bgColor="$shape"
                    width='$30'
                    height='$30'
                    rounded='$xl'
                    justifyContent="center"
                    alignItems="center"
                >
                    <HugeiconsIcon icon={ImageUpload01Icon} color='#F24D0D' width='32px' height='32px' />
                </Box>
            </Center>

            <Button
                icon={Logout01Icon}
                iconColor='#DC3545'
                variant="outline"
                position="absolute"
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
            
            <Button title="Atualizar cadastro" mt='$6' onPress={handleProfileUpdate} />
        </VStack>
    )
}