'use client'

import { useState, useEffect } from 'react'
import { FAVORITES_STORAGE_KEY } from '@/lib/constants'

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
            if (stored) {
                setFavorites(JSON.parse(stored))
            }
        } catch (e) {
            console.error('Failed to load favorites', e)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Save to local storage whenever favorites change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
        }
    }, [favorites, isLoaded])

    const addFavorite = (id: string) => {
        if (!favorites.includes(id)) {
            setFavorites(prev => [...prev, id])
        }
    }

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(item => item !== id))
    }

    const toggleFavorite = (id: string) => {
        if (favorites.includes(id)) {
            removeFavorite(id)
        } else {
            addFavorite(id)
        }
    }

    const isFavorite = (id: string) => favorites.includes(id)

    return {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        isLoaded
    }
}
