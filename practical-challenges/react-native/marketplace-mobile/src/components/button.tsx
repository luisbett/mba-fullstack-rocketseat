import { ButtonText, Button as GluestackButton, Spinner, Text } from '@gluestack-ui/themed'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
    title?: string
    titleFontSize?: ComponentProps<typeof Text>['fontSize']
    icon?: IconSvgElement
    iconColor?: string
    isLoading?: boolean
    withArrow?: boolean
}

export function Button({ title, titleFontSize = '$md', icon, iconColor = '#F24D0D', isLoading = false, withArrow = false, variant = 'solid', ...rest }: Props) {
    return (
        <GluestackButton 
            h={ icon ? '$10' : '$14' }
            bg={ variant === 'solid' ? '$orangebase' : '$transparent' }
            borderColor={ icon ? iconColor : '$orangebase'}
            borderWidth={1}
            borderRadius='$2lg'
            justifyContent={ !withArrow || isLoading ? 'center' : 'space-between' }
            disabled={isLoading}
            {...rest}
        >
            { isLoading ?
                <Spinner color={ variant === 'solid' ? '$white' : '$orangebase' }/> : 
                <>
                    { icon ?
                        <HugeiconsIcon icon={icon} color={iconColor} /> : (
                        <>
                            <ButtonText color={ variant === 'solid' ? '$white' : '$orangebase' } fontSize={titleFontSize}>{title}</ButtonText>
                            { withArrow && <HugeiconsIcon icon={ArrowRight02Icon} color={ variant === 'solid' ? '#FFFFFF' : '#F24D0D' } /> }
                        </>
                    )}
                </>
            }
        </GluestackButton>
    )
}