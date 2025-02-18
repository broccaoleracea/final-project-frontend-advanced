// src/providers/Providers.tsx
'use client'

import { Provider } from 'react-redux'
import {store} from '@/state/store'
import Redirect from "@/Redirect";

export function Providers({ children }: { children: React.ReactNode }) {
  
    
    return (
        <Provider store={store}>
            
                <Redirect>
                {children}
                </Redirect>
            
        </Provider>
    )
}