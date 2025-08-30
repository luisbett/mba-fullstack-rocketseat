import { Stack, useLocalSearchParams } from "expo-router";

import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import { Button } from "@/components/button";

export default function ProductLayout() {
    const { id } = useLocalSearchParams()

    return (
        <VStack flex={1}>
            <Stack screenOptions={{ headerShown: false }} />
            <HStack bgColor="$white" p='$8' justifyContent="space-between" alignItems="center">
                <HStack alignItems="baseline" gap='$1'>
                    <Text color="$gray500" fontSize='$xs'>R$</Text>
                    <Heading fontSize='$2xl'>35,89</Heading>
                </HStack>
                <Button 
                    w='$41' 
                    h='$10' 
                    px={'$4'} 
                    title="Entrar em contato" 
                    titleFontSize={'$sm'} 
                    justifyContent="center"
                />
            </HStack>
        </VStack>
    )
}