import { router } from "expo-router";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

export default function Index() {
    function handleSignUp() {
        Alert.alert('Cadastrado!')
    }

    function handleSignIn() {
        router.back()
    }

    return (
        <View style={styles.container}>
            <Text>Crie sua conta</Text>
            <TouchableOpacity onPress={handleSignUp}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignIn}>
                <Text>Acessar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }
})