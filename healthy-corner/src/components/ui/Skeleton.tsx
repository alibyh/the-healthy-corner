import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'circular' | 'rectangular'
    width?: string | number
    height?: string | number
}

export default function Skeleton({
    className,
    variant = 'rectangular',
    width,
    height,
    style,
    ...props
}: SkeletonProps) {
    const variantStyles = {
        text: 'h-4',
        circular: 'rounded-full',
        rectangular: 'rounded-md',
    }

    return (
        <div
            className={cn('skeleton', variantStyles[variant], className)}
            style={{
                width: width,
                height: height,
                ...style,
            }}
            {...props}
        />
    )
}

// Pre-built skeleton components
export function MenuItemCardSkeleton() {
    return (
        <div className="bg-[rgb(var(--color-surface))] rounded-lg shadow-md overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 mt-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>
        </div>
    )
}

export function CategoryCardSkeleton() {
    return (
        <div className="bg-[rgb(var(--color-surface))] rounded-lg shadow-md overflow-hidden">
            <Skeleton className="w-full h-40" />
            <div className="p-4">
                <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
        </div>
    )
}
