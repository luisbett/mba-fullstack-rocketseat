import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { Box, Heading, HStack, Image, Text, Toast, useToast, VStack } from "@gluestack-ui/themed";

import { AppError } from "@/utils/AppError";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { ChartHistogramIcon } from "@hugeicons/core-free-icons";

import { Link } from "@/components/link";
import { ToastTitle } from "@gluestack-ui/themed";
import { api } from "@/services/api";
import { set } from "zod";

type ProductProps = {
    title: string
    description: string
    priceInCents: number
    category: {
        title: string
    }
    attachments: [{
        url: string
    }]
}

export default function Product() {
    const [product, setProduct] = useState<ProductProps>({} as ProductProps)
    const [numberOfVisits, setNumberOfVisits] = useState(0)

    const { id } = useLocalSearchParams()

    const toast = useToast()

    async function getProduct() {
        try {
            const { data } = await api.get(`/products/${id}`)

            if(data.product) {
                setProduct(data.product)
            }

            const { data: metricsData } = await api.get(`/products/${id}/metrics/views`)

            setNumberOfVisits(metricsData.amount)
        } catch (error) {
            const isAppError = error instanceof AppError
                        
            const title = isAppError ? error.message : 'Não foi possível carregar os dados do produto.'

            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    const toastId = 'toast-' + id
                    return (
                        <Toast 
                            nativeID={toastId}
                            action="error"
                            variant="accent"
                        >
                            <ToastTitle textAlign="center">{title}</ToastTitle>
                        </Toast>
                    )
                }
            })
        }
    }

    useEffect(() => {
        getProduct()
    },[id])

    return (
        <VStack flex={1} pt={'$16'} px='$6' bgColor="#FBF4F4">
            <Link href={'/(tabs)/products'} title="Voltar" arrowPosition="left" />            
            { product?.attachments && product.attachments[0]?.url ? (
                <Image
                    w='$full'
                    h='$50'
                    rounded='$md'
                    marginTop='$4'
                    marginBottom='$7'
                    source={{
                        uri: product.attachments[0].url,
                    }}
                    alt="Product image"
                />
            ) : (
                <Box 
                    w='$full'
                    h='$50'
                    rounded='$md'
                    marginTop='$4'
                    marginBottom='$7'
                    bgColor='$shape'
                />
            ) }
            <HStack justifyContent="space-between" mb='$4'>
                <Heading w='70%'>{product.title}</Heading>
                <HStack alignItems="baseline" gap='$1'>
                    <Text color="$gray500" fontSize='$xs'>R$</Text>
                    <Heading>{(product.priceInCents/100).toLocaleString('pt-BR')}</Heading>
                </HStack>
            </HStack>
            <Text>{product.description}</Text>
            <Heading mt='$7' fontSize='$sm'>Categoria</Heading>
            <Text fontSize='$xs' color="$gray400">{product.category?.title}</Text>
            <HStack mt='$7' bgColor="$bluelight" rounded='$2lg' p='$3' paddingRight='$4' gap='$3'>
                <Box w='$9' h='$9' bgColor="$bluedark" justifyContent='center' alignItems="center" rounded='$md'>
                    <HugeiconsIcon icon={ChartHistogramIcon} color='#FFFFFF' />
                </Box>
                <Text fontSize='$xs' color='$gray400' flexShrink={1}><Text fontFamily="$Poppins_700Bold" fontSize='$xs'>{numberOfVisits} pessoas</Text> visualizaram este produto nos últimos 7 dias</Text>
            </HStack>
        </VStack>
    )
}