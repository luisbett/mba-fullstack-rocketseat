import { Card as GluestackCard, Heading, HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ComponentProps } from 'react'
import { Pressable } from 'react-native'

type Props = ComponentProps<typeof GluestackCard> & {
    id: string
    image: string
    title: string
    price: number
}

export function Card({ id, image, title, price, ...rest }: Props) {
    return (
        <GluestackCard 
            width='48.5%' 
            variant="filled" 
            bgColor="$white" 
            borderRadius='$lg'
            px='$1'
            pt='$1'
            pb='$2'
            {...rest}
        >
            <VStack>
                <Image
                    w='$full'
                    h='$24'
                    rounded='$md'
                    marginBottom='$2'
                    source={{
                        uri: image,
                    }}
                alt="image"
                />
                <Pressable onPress={() => router.navigate(`/(tabs)/product/${id}`)}>
                    <VStack px='$1'>
                        <Text fontSize='$xs' numberOfLines={1}>{title}</Text>
                        <HStack alignItems="baseline" gap='$1'>
                            <Text fontSize='$2xs' color='$gray500'>R$</Text>
                            <Heading fontSize='$sm'>{(price/100).toLocaleString('pt-BR')}</Heading>
                        </HStack>
                    </VStack>
                </Pressable>
            </VStack>
        </GluestackCard>
    )
}