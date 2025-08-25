import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed'
import { config } from '../../config/gluestack-ui.config'

export default function Index() {
    const [ fontsLoaded ] = useFonts({ DMSans_700Bold })

    function handleSignUp() {
        router.navigate('/sign-up')
    }

    function handleSignIn() {
        router.navigate('/(tabs)/products')
    }
    
    return (
        <GluestackUIProvider config={config}>
            { fontsLoaded ? (
                <Center flex={1} gap={16}>
                    <Text>Acesse sua conta</Text>
                    <TouchableOpacity onPress={handleSignIn}>
                        <Text>Acessar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSignUp}>
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                </Center>
            ) : (
                <View />
            )}
        </GluestackUIProvider>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }
})