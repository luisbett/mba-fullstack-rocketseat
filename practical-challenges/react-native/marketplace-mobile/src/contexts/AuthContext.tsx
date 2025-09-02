import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/services/api";

import { storageAccessTokenSave, storageAccessTokenGet, storageAccessTokenRemove } from '@/storage/storageAccessToken'
import { storageSellerSave, storageSellerGet, storageSellerRemove } from '@/storage/storageSeller'

import { SellerDTO } from "@/dtos/SellerDTO";

export type AuthContextDataProps = {
    seller: SellerDTO
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    updateSeller: (seller: SellerDTO) => Promise<void>
    isLoadingSellerData: boolean
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [seller, setSeller] = useState<SellerDTO>({} as SellerDTO)
    const [isLoadingSellerData, setIsLoadingSellerData] = useState(true)

    async function tokenUpdate(token: string) {
        try {
            setIsLoadingSellerData(true)

            await storageAccessTokenSave(token)
        } catch (error) {
            throw error
        } finally {
            setIsLoadingSellerData(false)
        }
    }

    async function sellerUpdate(sellerData: SellerDTO) {
        try {
            setIsLoadingSellerData(true)

            await storageSellerSave(sellerData)
        } catch (error) {
            throw error
        } finally {
            setIsLoadingSellerData(false)
        }
    }

    async function updateSeller(seller: SellerDTO) {
        setSeller(seller)
        await sellerUpdate(seller)
    }

    async function signIn(email: string, password: string) {
        try {
            const { data: tokenData } = await api.post('/sellers/sessions', { email, password })

            if(tokenData.accessToken) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenData.accessToken}`
                await tokenUpdate(tokenData.accessToken)
            }

            const { data } = await api.get('/sellers/me')

            if (data.seller) {
                setSeller(data.seller)
                await sellerUpdate(data.seller)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingSellerData(false)
        }
    }

    async function signOut() {
        try {
            setIsLoadingSellerData(true)

            setSeller({} as SellerDTO)

            await storageSellerRemove()
            await storageAccessTokenRemove()
        } catch (error) {
            throw error
        } finally {
            setIsLoadingSellerData(false)
        }
    }

    async function loadSellerData() {
        try {
            setIsLoadingSellerData(true)

            const sellerLogged = await storageSellerGet()
            const token = await storageAccessTokenGet()

            if (token && sellerLogged) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setSeller(sellerLogged)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingSellerData(false)
        }
    }

    useEffect(() => {
        loadSellerData()
    }, [])

    return (
        <AuthContext.Provider value={{ 
            seller, 
            signIn, 
            signOut,
            updateSeller,
            isLoadingSellerData
        }}>
            {children}
        </AuthContext.Provider>
    )
}