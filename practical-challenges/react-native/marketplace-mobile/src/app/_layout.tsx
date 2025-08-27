import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '../../config/gluestack-ui.config';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <GluestackUIProvider config={config}>
            <Stack screenOptions={{ headerShown: false }} />
        </GluestackUIProvider>
    );
}