import { useLocalSearchParams } from "expo-router";

import { Box, Heading, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { Link } from "@/components/link";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ChartHistogramIcon } from "@hugeicons/core-free-icons";

export default function Product() {
    const { id } = useLocalSearchParams()

    return (
        <VStack flex={1} pt={'$16'} px='$6' bgColor="#FBF4F4">
            <Link href={'/(tabs)/products'} title="Voltar" arrowPosition="left" />            
            <Image
                w='$full'
                h='$50'
                rounded='$md'
                marginTop='$4'
                marginBottom='$7'
                source={{
                    uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                }}
            alt="Product image"
            />
            <HStack justifyContent="space-between" mb='$4'>
                <Heading>Sofá</Heading>
                <HStack alignItems="baseline" gap='$1'>
                    <Text color="$gray500" fontSize='$xs'>R$</Text>
                    <Heading>35,89</Heading>
                </HStack>
            </HStack>
            <Text>Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado. Largura: 1,80m Altura do chão: 20 cm</Text>
            <Heading mt='$7' fontSize='$sm'>Categoria</Heading>
            <Text fontSize='$xs' color="$gray400">Móvel</Text>
            <HStack mt='$7' bgColor="$bluelight" rounded='$2lg' p='$3' paddingRight='$4' gap='$3'>
                <Box w='$9' h='$9' bgColor="$bluedark" justifyContent='center' alignItems="center" rounded='$md'>
                    <HugeiconsIcon icon={ChartHistogramIcon} color='#FFFFFF' />
                </Box>
                <Text fontSize='$xs' color='$gray400' flexShrink={1}><Text fontFamily="$Poppins_700Bold" fontSize='$xs'>24 pessoas</Text> visualizaram este produto nos últimos 7 dias</Text>
            </HStack>
        </VStack>
    )
}