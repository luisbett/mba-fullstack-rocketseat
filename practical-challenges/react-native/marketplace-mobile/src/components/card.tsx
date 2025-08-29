import { Card as GluestackCard, Heading, HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackCard> & {
    image: string
    title: string
    price: number
}

export function Card({ image, title, price, ...rest }: Props) {
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
                <VStack px='$1'>
                    <Text fontSize='$xs'>{title}</Text>
                    <HStack alignItems="baseline" gap='$1'>
                        <Text fontSize='$2xs' color='$gray500'>R$</Text>
                        <Heading fontSize='$sm'>{price.toLocaleString('pt-BR')}</Heading>
                    </HStack>
                </VStack>
            </VStack>
        </GluestackCard>
    )
}