"use client"
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" themes={['light', 'dark']} enableSystem>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}
