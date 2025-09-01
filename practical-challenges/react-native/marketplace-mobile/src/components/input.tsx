import { ComponentProps, useState } from 'react'

import { Input as GluestackInput, HStack, InputField, Text } from '@gluestack-ui/themed'

import { AlertCircleIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react-native'

type Props = ComponentProps<typeof InputField> & {
    title?: string
    icon?: IconSvgElement
    isPassword?: boolean
    inputMarginBottom?: ComponentProps<typeof GluestackInput>['pb']
    inputFlex?: number
    errorMessage?: string
}

export function Input({ title, icon, isPassword = false, inputMarginBottom = '$5', inputFlex = 0, errorMessage = '', ...rest }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            { title && <Text fontSize='$xs' color='$gray300'>{title.toUpperCase()}</Text> }
            <GluestackInput
                alignItems='center'
                borderWidth={0}
                borderBottomWidth={1}
                borderBottomColor='$gray100'
                mb={errorMessage ? '$0' : inputMarginBottom}
                flex={inputFlex}
            >
                { icon && <HugeiconsIcon icon={icon} color={errorMessage ? '#DC3545' : '#949494'} /> }
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
            { errorMessage && (
                <HStack gap='$1' py='$1.5'>
                    <HugeiconsIcon icon={AlertCircleIcon} size='16px' color='#DC3545' />
                    <Text fontSize='$xs' color='$danger'>{errorMessage}</Text>
                </HStack>
            )}
        </>
    )
}