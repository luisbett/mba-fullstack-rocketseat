import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Products() {
    return (
        <View style={styles.container}>
            <Text>Produtos</Text>
            <TouchableOpacity onPress={() => router.navigate('/product/58')}>
                <Text>Ver produto</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }
})