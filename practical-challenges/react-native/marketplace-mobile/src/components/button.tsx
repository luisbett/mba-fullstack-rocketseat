import { Button as GluestackButton, Spinner, Text } from '@gluestack-ui/themed'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
    title: string
    isLoading?: boolean
    withArrow?: boolean
}

export function Button({ title, isLoading, withArrow = false, variant = 'solid', ...rest }: Props) {
    return (
        <GluestackButton 
            w='$full'
            h='$14'
            bg={ variant === 'solid' ? '$orangebase' : '$transparent' }
            borderColor='$orangebase'
            borderWidth={1}
            borderRadius='$2lg'
            justifyContent={ !withArrow || isLoading ? 'center' : 'space-between' }
            {...rest}
        >
            { isLoading ?
                <Spinner color={ variant === 'solid' ? '$white' : '$orangebase' }/> : 
                <>
                    <Text color={ variant === 'solid' ? '$white' : '$orangebase' }>{title}</Text>
                    { withArrow && <HugeiconsIcon icon={ArrowRight02Icon} color={ variant === 'solid' ? '#FFFFFF' : '#F24D0D' } /> }
                </>
            }
        </GluestackButton>
    )
}