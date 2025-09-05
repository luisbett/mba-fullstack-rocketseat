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
    category: [{
        id: string
    }]
    attachments: [{
        url: string
    }]
}

type CategoryProps = {
    id: string
    title: string
    slug: string
}

export default function Products() {
    const [actionSheetOpened, setActionSheetOpened] = useState(false)
    const [productCards, setProductCards] = useState<ProductCardsProps[]>([])
    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(0)
    const [categories, setCategories] = useState<CategoryProps[]>([])
    // const [categoriesSelected, setCategoriesSelected] = useState<string[]>([])

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

    async function handleClearFilters() {
        try {
            const { data } = await api.get('/products')

            console.log(data.products)

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

        setActionSheetOpened(false)
    }

    async function handleFilter() {
        setProductCards(state => state.filter(item => {
            return (priceFrom > 0 ? item.priceInCents >= priceFrom * 100 : true ) && 
                (priceTo > 0 ? item.priceInCents <= priceTo * 100 : true) 
                //(categoriesSelected.length > 0 ? categoriesSelected.includes(item.category[0].id) : true)
        }))

        setActionSheetOpened(false)
    }

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

    async function fetchCategories() {
        try {
            const { data } = await api.get('/categories')

            if(data.categories) {
                setCategories(data.categories)
            }
        } catch (error) {
            const isAppError = error instanceof AppError
            
            const title = isAppError ? error.message : 'Não foi possível carregar as categorias.'

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
        fetchCategories()
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
                                onChangeText={text => setPriceFrom(Number(text))}
                            />
                            <Input 
                                placeholder="Até"
                                inputFlex={1}
                                keyboardType="numeric"
                                onChangeText={text => setPriceTo(Number(text))}
                            />
                        </HStack>
                        <Text fontFamily='$heading' fontSize='$sm' color="$gray400" mb='$5'>Categoria</Text>
                        <VStack gap='$3' mb='$16'>
                            { categories.map(category => (
                                <Checkbox key={category.id} value={category.id} size="md" gap='$2' /*onChange={() => setCategoriesSelected(state => state.includes(category.id) ? state.filter(item => item !== category.id) : [...state, category.id])}*/>
                                    <CheckboxIndicator borderWidth={1} $checked-bgColor="$orangebase" $checked-borderColor="$orangedark">
                                        <CheckboxIcon as={CheckIcon} color="$white" />
                                    </CheckboxIndicator>
                                    <CheckboxLabel color="$gray400">{category.title}</CheckboxLabel>
                                </Checkbox>
                            ))}
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