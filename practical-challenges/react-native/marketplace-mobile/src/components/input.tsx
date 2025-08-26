import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField>

export function Input({ ...rest }: Props) {
    return (
        <GluestackInput>
            <InputField {...rest} />
        </GluestackInput>
    )
}