// src/providers/Providers.tsx
'use client'

import { Provider } from 'react-redux'
import { store } from '@/state/store'
import { AuthProvider } from '@/providers/AuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
    )
}