import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useFonts, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import { Poppins_400Regular } from '@expo-google-fonts/poppins'
import { Center, GluestackUIProvider, Text, VStack } from '@gluestack-ui/themed'
import { config } from '../../config/gluestack-ui.config'
import { Loading } from "@/components/loading";
import Logo from '@/assets/logo.svg'
import { Input } from "@/components/input";
import { Button } from "@/components/button";

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
                <VStack flex={1}>
                    <Center mt='$16'>
                        <Logo width={'64px'} height={'48px'}/>
                        <Text>Acesse sua conta</Text>
                    </Center>

                    <Input placeholder="mail@examplo.br" keyboardType="email-address" autoCapitalize="none" />
                    <Input placeholder="Sua senha" secureTextEntry />
                    
                    <Button title="Acessar" onPress={handleSignIn} />

                    <TouchableOpacity onPress={handleSignUp}>
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                </VStack>
            ) : (
                <Loading />
            )}
        </GluestackUIProvider>
    )
}