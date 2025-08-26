import { Button as GluestackButton, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
    title: string
    isLoading?: boolean
}

export function Button({ title, isLoading, ...rest }: Props) {
    return (
        <GluestackButton 
            w='$full'
            h='$16'
            bg='$orangebase'
            {...rest}
        >
            <Text>{title}</Text>
        </GluestackButton>
    )
}