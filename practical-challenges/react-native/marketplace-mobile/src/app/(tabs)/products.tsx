import { useEffect, useState } from "react";
import { Pressable } from "react-native";

import { api } from "@/services/api";

import { 
    Actionsheet,
    ActionsheetBackdrop, 
    ActionsheetContent, 
    ActionsheetDragIndicator, 
    ActionsheetDragIndicatorWrapper,
    Checkbox, 
    CheckboxIndicator,
    CheckboxIcon, 
    CheckboxLabel, 
    CheckIcon, 
    Heading, 
    HStack, 
    Image, 
    ScrollView, 
    Text, 
    VStack, 
    useToast,
    ToastTitle,
    Toast,
    Box
} from "@gluestack-ui/themed";

import { useAuth } from "@/hooks/useAuth";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { Cancel01Icon, FilterVerticalIcon, Search01Icon } from "@hugeicons/core-free-icons";

import { AppError } from "@/utils/AppError";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { Link } from "@/components/link";

type ProductCardsProps = {
    id: string
    title: string
    priceInCents: number
    attachments: [{
        url: string
    }]
}

export default function Products() {
    const [actionSheetOpened, setActionSheetOpened] = useState(false)
    const [productCards, setProductCards] = useState<ProductCardsProps[]>([])

    const { seller } = useAuth()

    const toast = useToast()

    async function handleSearch(search: string) {
        try {
            const { data } = await api.get(`/products?search=${search}`)

            if(data.products) {
                setProductCards(data.products)
            }
        } catch (error) {
            const isAppError = error instanceof AppError
            
            const title = isAppError ? error.message : 'Não foi possível carregar os produtos.'

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

    function handleClearFilters() {}

    function handleFilter() {}

    async function fetchProducts() {
        try {
            const { data } = await api.get('/products')

            if(data.products) {
                setProductCards(data.products)
            }
        } catch (error) {
            const isAppError = error instanceof AppError
            
            const title = isAppError ? error.message : 'Não foi possível carregar os produtos.'

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
        fetchProducts()
    }, [])

    return (
        <>
            <VStack px={'$6'} borderBottomLeftRadius={'$2lg'} borderBottomRightRadius={'$2lg'} bgColor="$white">
                <HStack mt='$16' gap='$5' alignItems="center">
                    { seller.avatar?.url ? (
                        <Image
                            w='$14' 
                            h='$14'
                            rounded='$xl'
                            source={{
                                uri: seller.avatar.url,
                            }}
                            alt="Profile picture"
                        />
                    ) : (
                        <Box 
                            w='$14' 
                            h='$14'
                            rounded='$xl'
                            bgColor="$shape"
                        />
                    ) }
                    
                    <VStack>
                        <Text fontFamily="$heading" color='$gray500' mb='$1'>Olá, {seller.name}!</Text>
                        <Link href="./profile" title="Ver perfil" arrowPosition="right"/>
                    </VStack>
                </HStack>

                <Text mt='$8' fontSize='$sm' color="$gray500" mb='$1'>Explore produtos</Text>

                <HStack mt='$1' gap='$4.5'>
                    <Input 
                        icon={Search01Icon}
                        placeholder="Pesquisar..."
                        inputMarginBottom='$6'
                        inputFlex={1}
                        onChangeText={handleSearch}
                    />
                    <Button
                        icon={FilterVerticalIcon}
                        variant="outline"
                        onPress={() => setActionSheetOpened(true)}
                        w='$10'
                    />
                </HStack>
            </VStack>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HStack py='$3.5' px='$4' flexWrap="wrap" gap='$2' justifyContent="space-between">
                    { productCards?.map((item, _index) => (
                        <Card key={item.id} id={item.id} image={item.attachments[0].url} title={item.title} price={item.priceInCents} />
                    ))}
                </HStack>
            </ScrollView>
            <Actionsheet isOpen={actionSheetOpened} onClose={() => setActionSheetOpened(false)}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <VStack w='$full' pt='$12' pb='$8' px='$6'>
                        <HStack pb='$6' justifyContent="space-between" alignItems="flex-start">
                            <Heading>Filtrar anúncios</Heading>
                            <Pressable onPress={() => setActionSheetOpened(false)}>
                                <HugeiconsIcon icon={Cancel01Icon} color='#666666' />
                            </Pressable>
                        </HStack>
                        <Text fontFamily='$heading' fontSize={'$sm'} color="$gray400" mb='$2'>Valor</Text>
                        <HStack gap='$5.5' mb='$6'>
                            <Input 
                                placeholder="De"
                                inputFlex={1}
                                keyboardType="numeric"
                            />
                            <Input 
                                placeholder="Até"
                                inputFlex={1}
                                keyboardType="numeric"
                            />
                        </HStack>
                        <Text fontFamily='$heading' fontSize='$sm' color="$gray400" mb='$5'>Categoria</Text>
                        <VStack gap='$3' mb='$16'>
                            <Checkbox value="1" size="md" gap='$2'>
                                <CheckboxIndicator borderWidth={1} $checked-bgColor="$orangebase" $checked-borderColor="$orangedark">
                                    <CheckboxIcon as={CheckIcon} color="$white" />
                                </CheckboxIndicator>
                                <CheckboxLabel color="$gray400">Brinquedo</CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="1" size="md" gap='$2'>
                                <CheckboxIndicator borderWidth={1} $checked-bgColor="$orangebase" $checked-borderColor="$orangedark">
                                    <CheckboxIcon as={CheckIcon} color="$white" />
                                </CheckboxIndicator>
                                <CheckboxLabel color="$gray400">Móvel</CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="1" size="md" gap='$2'>
                                <CheckboxIndicator borderWidth={1} $checked-bgColor="$orangebase" $checked-borderColor="$orangedark">
                                    <CheckboxIcon as={CheckIcon} color="$white" />
                                </CheckboxIndicator>
                                <CheckboxLabel color="$gray400">Papelaria</CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="1" size="md" gap='$2'>
                                <CheckboxIndicator borderWidth={1} $checked-bgColor="$orangebase" $checked-borderColor="$orangedark">
                                    <CheckboxIcon as={CheckIcon} color="$white" />
                                </CheckboxIndicator>
                                <CheckboxLabel color="$gray400">Saúde & Beleza</CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="1" size="md" gap='$2'>
                                <CheckboxIndicator borderWidth={1} $checked-bgColor="$orangebase" $checked-borderColor="$orangedark">
                                    <CheckboxIcon as={CheckIcon} color="$white" />
                                </CheckboxIndicator>
                                <CheckboxLabel color="$gray400">Utensílio</CheckboxLabel>
                            </Checkbox>
                            <Checkbox value="1" size="md" gap='$2'>
                                <CheckboxIndicator borderWidth={1} $checked-bgColor="$orangebase" $checked-borderColor="$orangedark">
                                    <CheckboxIcon as={CheckIcon} color="$white" />
                                </CheckboxIndicator>
                                <CheckboxLabel color="$gray400">Vestuário</CheckboxLabel>
                            </Checkbox>
                        </VStack>
                        <HStack gap='$3'>
                            <Button 
                                w='50%'
                                h='$10'
                                variant="outline" 
                                title="Limpar filtro" 
                                titleFontSize={'$sm'} 
                                justifyContent="center"
                                onPress={handleClearFilters}
                            />
                            <Button 
                                w='50%'
                                h='$10' 
                                title="Filtrar" 
                                titleFontSize={'$sm'} 
                                justifyContent="center"
                                onPress={handleFilter}
                            />
                        </HStack>
                    </VStack>
                </ActionsheetContent>
            </Actionsheet>
        </>
    )
}