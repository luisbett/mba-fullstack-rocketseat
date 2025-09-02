import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import { api } from "@/services/api";

import { AppError } from "@/utils/AppError";

import { Heading, HStack, Text, Toast, ToastTitle, useToast, VStack } from "@gluestack-ui/themed";

import { Button } from "@/components/button";
import { Alert } from "react-native";

type ProductProps = {
    priceInCents: number
    owner: {
        phone: string
    }
}

export default function ProductLayout() {
    const [product, setProduct] = useState<ProductProps>({} as ProductProps)

    const toast = useToast()

    const { id } = useLocalSearchParams()

    function handleOpenWpp(phone: string) {
        //Open Wpp here
        Alert.alert('Wpp phone: ' + phone)
    }

    async function getProduct() {
        try {
            const { data } = await api.get(`/products/${id}`)

            if(data.product) {
                setProduct(data.product)
            }
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
        <VStack flex={1}>
            <Stack screenOptions={{ headerShown: false }} />
            <HStack bgColor="$white" p='$8' justifyContent="space-between" alignItems="center">
                <HStack alignItems="baseline" gap='$1'>
                    <Text color="$gray500" fontSize='$xs'>R$</Text>
                    <Heading fontSize='$2xl'>{(product.priceInCents/100).toLocaleString('pt-BR')}</Heading>
                </HStack>
                <Button 
                    w='$41' 
                    h='$10' 
                    px={'$4'} 
                    title="Entrar em contato" 
                    titleFontSize={'$sm'} 
                    justifyContent="center"
                    onPress={() => handleOpenWpp(product.owner?.phone)}
                />
            </HStack>
        </VStack>
    )
}