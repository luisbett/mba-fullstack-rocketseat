import { Tabs } from "expo-router";

import { HugeiconsIcon } from '@hugeicons/react-native'
import { Store04Icon, UserIcon } from '@hugeicons/core-free-icons'

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: '#F24D0D',
        }}>
            <Tabs.Screen 
                name="products"
                options={{
                    tabBarLabel: 'PRODUTOS', 
                    tabBarIcon: 
                        ({ color, size }) => 
                            <HugeiconsIcon 
                                icon={Store04Icon} 
                                color={color} 
                                size={size}
                            />, 
                    sceneStyle: {
                        backgroundColor: '#FBF4F4'
                    }
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{ 
                    tabBarLabel: 'PERFIL', 
                    tabBarIcon: 
                        ({ color, size }) => 
                            <HugeiconsIcon 
                                icon={UserIcon}
                                color={color}
                                size={size}
                            />,
                    sceneStyle: {
                        backgroundColor: '#FBF4F4'
                    }
                }}
            />
            <Tabs.Screen name="product" options={{ href: null }}/>
        </Tabs>
    )
}