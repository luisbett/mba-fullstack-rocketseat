import { Tabs } from "expo-router";
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Store04Icon, UserIcon } from '@hugeicons/core-free-icons'

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="products" options={{ tabBarLabel: 'Produtos', tabBarIcon: () => <HugeiconsIcon icon={Store04Icon} /> }}/>
            <Tabs.Screen name="profile" options={{ tabBarLabel: 'Perfil', tabBarIcon: () => <HugeiconsIcon icon={UserIcon} /> }}/>
            <Tabs.Screen name="product" options={{ href: null }}/>
        </Tabs>
    )
}