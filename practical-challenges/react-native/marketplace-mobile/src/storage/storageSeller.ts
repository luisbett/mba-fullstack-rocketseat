import AsyncStorage from '@react-native-async-storage/async-storage'

import { SellerDTO } from '@/dtos/SellerDTO'

import { SELLER_STORAGE } from './storageConfig'

export async function storageSellerSave(seller: SellerDTO) {
    await AsyncStorage.setItem(SELLER_STORAGE, JSON.stringify(seller))
}

export async function storageSellerGet() {
    const storage = await AsyncStorage.getItem(SELLER_STORAGE)

    const seller: SellerDTO = storage ? JSON.parse(storage) : {}

    return seller
}

export async function storageSellerRemove() {
    await AsyncStorage.removeItem(SELLER_STORAGE)
}