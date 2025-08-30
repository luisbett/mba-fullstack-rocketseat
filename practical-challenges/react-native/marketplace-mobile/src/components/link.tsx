import { HStack, Text } from '@gluestack-ui/themed'
import { ArrowLeft02Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Link as RouterLink } from 'expo-router'

import { ComponentProps } from 'react'

type Props = ComponentProps<typeof RouterLink> & {
    href: string
    title: string
    arrowPosition: 'left' | 'right'
}

export function Link({ href, title, arrowPosition, ...rest }: Props) {
    return (
        <RouterLink href={href} {...rest}>
            <HStack alignItems='center' gap='$2'>
                { arrowPosition === 'left' && <HugeiconsIcon icon={ArrowLeft02Icon} color='#F24D0D' /> }
                <Text fontSize='$sm' color='$orangebase'>{title}</Text>
                { arrowPosition === 'right' && <HugeiconsIcon icon={ArrowRight02Icon} color='#F24D0D' /> }
            </HStack>
        </RouterLink>
    )
}