'use client'

import React from 'react'
import { NutritionInfo } from '@/types/ui'

interface NutritionBadgeProps {
    type: 'calories' | 'protein' | 'carbs' | 'fats'
    value: number | null | undefined
    size?: 'sm' | 'md' | 'lg'
    showLabel?: boolean
}

export default function NutritionBadge({
    type,
    value,
    size = 'md',
    showLabel = true
}: NutritionBadgeProps) {
    if (!value && value !== 0) return null

    const configs = {
        calories: {
            label: 'kcal',
            color: 'rgb(var(--color-calories))',
            bgColor: 'rgb(var(--color-primary) / 0.1)',
            icon: '🔥',
        },
        protein: {
            label: 'P',
            color: 'rgb(var(--color-protein))',
            bgColor: 'rgb(var(--color-error) / 0.1)',
            icon: '💪',
        },
        carbs: {
            label: 'C',
            color: 'rgb(var(--color-carbs))',
            bgColor: 'rgb(var(--color-info) / 0.1)',
            icon: '🌾',
        },
        fats: {
            label: 'F',
            color: 'rgb(var(--color-fats))',
            bgColor: 'rgb(var(--color-warning) / 0.1)',
            icon: '🥑',
        },
    }

    const config = configs[type]

    const sizes = {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-sm px-2 py-1',
        lg: 'text-base px-3 py-1.5',
    }

    return (
        <span
            className={`nutrition-badge ${sizes[size]}`}
            style={{
                backgroundColor: config.bgColor,
                color: config.color,
            }}
        >
            <span className="font-bold">{Math.round(value)}</span>
            {showLabel && (
                <span className="opacity-75 ml-0.5">
                    {type === 'calories' ? config.label : `g ${config.label}`}
                </span>
            )}
        </span>
    )
}

interface NutritionPanelProps {
    nutrition: NutritionInfo
    layout?: 'horizontal' | 'vertical'
    size?: 'sm' | 'md' | 'lg'
}

export function NutritionPanel({
    nutrition,
    layout = 'horizontal',
    size = 'md'
}: NutritionPanelProps) {
    return (
        <div className={`flex ${layout === 'horizontal' ? 'flex-row gap-2' : 'flex-col gap-1'} flex-wrap`}>
            {nutrition.calories !== null && nutrition.calories !== undefined && (
                <NutritionBadge type="calories" value={nutrition.calories} size={size} />
            )}
            {nutrition.protein !== null && nutrition.protein !== undefined && (
                <NutritionBadge type="protein" value={nutrition.protein} size={size} />
            )}
            {nutrition.carbs !== null && nutrition.carbs !== undefined && (
                <NutritionBadge type="carbs" value={nutrition.carbs} size={size} />
            )}
            {nutrition.fats !== null && nutrition.fats !== undefined && (
                <NutritionBadge type="fats" value={nutrition.fats} size={size} />
            )}
        </div>
    )
}
