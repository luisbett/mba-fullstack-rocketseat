import { useState } from "react";

import { Pressable } from "react-native";

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
    VStack 
} from "@gluestack-ui/themed";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { Cancel01Icon, FilterVerticalIcon, Search01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { Link } from "@/components/link";

export default function Products() {
    const [actionSheetOpened, setActionSheetOpened] = useState(false)

    function handleClearFilters() {}

    function handleFilter() {}

    const cards = [
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 3333.33
        },
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 333.33
        },
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 333.33
        },
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 333.33
        },
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 333.33
        },
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 333.33
        },
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 333.33
        },
        {
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Sofá',
            price: 333.33
        }
    ]

    return (
        <>
            <VStack px={'$6'} borderBottomLeftRadius={'$2lg'} borderBottomRightRadius={'$2lg'} bgColor="$white">
                <HStack mt='$16' gap='$5' alignItems="center">
                    <Image
                        w='$14' 
                        h='$14'
                        rounded='$xl'
                        source={{
                            uri: 'https://github.com/luisbett.png',
                        }}
                        alt="Profile picture"
                    />
                    <VStack>
                        <Text fontFamily="$heading" color='$gray500' mb='$1'>Olá, Luis!</Text>
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
                    { cards.map((item, index) => (
                        <Card key={index} image={item.image} title={item.title} price={item.price} />
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