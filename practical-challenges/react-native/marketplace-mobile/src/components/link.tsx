import { Link as RouterLink } from 'expo-router'

import { ComponentProps } from 'react'

type Props = ComponentProps<typeof RouterLink> & {
    href: string
    title: string
}

export function Link({ href, title, ...rest }: Props) {
    return (
        <RouterLink href={href} {...rest}>
            {title}
        </RouterLink>
    )
}