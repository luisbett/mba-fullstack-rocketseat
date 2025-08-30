import { Box, HStack, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { FilterVerticalIcon, Search01Icon } from "@hugeicons/core-free-icons";

import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Link } from "@/components/link";

export default function Products() {
    function handleOpenDrawer() {}

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
                        onPress={handleOpenDrawer}
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
        </>
    )
}