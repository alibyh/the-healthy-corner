'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface SliderProps {
    min: number
    max: number
    step?: number
    value: [number, number]
    onChange: (value: [number, number]) => void
    className?: string
}

export default function Slider({ min, max, step = 1, value, onChange, className }: SliderProps) {
    const [minVal, setMinVal] = useState(value[0])
    const [maxVal, setMaxVal] = useState(value[1])
    const minValRef = useRef(value[0])
    const maxValRef = useRef(value[1])
    const range = useRef<HTMLDivElement>(null)

    // Convert to percentage
    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100)

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal)
        const maxPercent = getPercent(maxValRef.current)

        if (range.current) {
            range.current.style.left = `${minPercent}%`
            range.current.style.width = `${maxPercent - minPercent}%`
        }
    }, [minVal, min, max])

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current)
        const maxPercent = getPercent(maxVal)

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`
        }
    }, [maxVal, min, max])

    useEffect(() => {
        setMinVal(value[0])
        setMaxVal(value[1])
    }, [value])

    return (
        <div className={cn('relative w-full py-4', className)}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1)
                    setMinVal(value)
                    minValRef.current = value
                    onChange([value, maxVal])
                }}
                className="thumb thumb--left pointer-events-none absolute h-0 w-full outline-none z-[3]"
                style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1)
                    setMaxVal(value)
                    maxValRef.current = value
                    onChange([minVal, value])
                }}
                className="thumb thumb--right pointer-events-none absolute h-0 w-full outline-none z-[4]"
            />

            <div className="relative w-full">
                <div className="absolute h-1.5 w-full rounded bg-[rgb(var(--color-secondary))] z-[1]" />
                <div
                    ref={range}
                    className="absolute h-1.5 rounded bg-[rgb(var(--color-primary))] z-[2]"
                />
                <div className="absolute top-4 left-0 text-xs text-[rgb(var(--color-text-secondary))]">{minVal}</div>
                <div className="absolute top-4 right-0 text-xs text-[rgb(var(--color-text-secondary))]">{maxVal}</div>
            </div>

            <style jsx>{`
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          border: 2px solid rgb(var(--color-primary));
          background-color: white;
          cursor: pointer;
          margin-top: -7px; /* Align thumb vertically */
        }
        .thumb::-moz-range-thumb {
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          border: 2px solid rgb(var(--color-primary));
          background-color: white;
          cursor: pointer;
        }
      `}</style>
        </div>
    )
}
