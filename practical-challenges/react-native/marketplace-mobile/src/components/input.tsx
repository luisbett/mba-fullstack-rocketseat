import { Box, Input as GluestackInput, InputField, Text } from '@gluestack-ui/themed'
import { ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native'
import { ComponentProps, useState } from 'react'

type Props = ComponentProps<typeof InputField> & {
    title?: string
    icon?: IconSvgElement
    isPassword?: boolean
    inputMarginBottom?: ComponentProps<typeof GluestackInput>['pb']
}

export function Input({ title, icon, isPassword = false, inputMarginBottom = '$5', ...rest }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            { title && <Text fontSize='$xs' color='$gray300'>{title.toUpperCase()}</Text> }
            <GluestackInput
                alignItems='center'
                borderWidth={0}
                borderBottomWidth={1}
                borderBottomColor='$gray100'
                mb={inputMarginBottom}
                flex={1}
            >
                { icon && <HugeiconsIcon icon={icon} color='#949494' /> }
                <InputField 
                    fontFamily='$body' 
                    secureTextEntry={ isPassword && !showPassword ? true : false }
                    {...rest}
                />
                { isPassword && 
                    <HugeiconsIcon 
                        icon={ViewIcon}
                        color='#666666'
                        onPress={() => setShowPassword((state) => !state )} 
                    /> }
            </GluestackInput>
        </>
    )
}