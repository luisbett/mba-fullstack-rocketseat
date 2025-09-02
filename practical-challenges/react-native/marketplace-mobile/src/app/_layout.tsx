import { Stack } from 'expo-router';

import { AuthContextProvider } from '@/contexts/AuthContext';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '../../config/gluestack-ui.config';

export default function Layout() {
    return (
        <GluestackUIProvider config={config}>
            <AuthContextProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthContextProvider>
        </GluestackUIProvider>
    );
}