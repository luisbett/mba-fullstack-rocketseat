import { router } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
    function handleSignUp() {
        router.navigate('/sign-up')
    }

    function handleSignIn() {
        router.navigate('/(tabs)/products')
    }
    
    return (
        <View style={styles.container}>
            <Text>Acesse sua conta</Text>
            <TouchableOpacity onPress={handleSignIn}>
                <Text>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }
})