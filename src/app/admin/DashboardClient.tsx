'use client'
import { useEffect } from 'react'
import {useAppDispatch} from "@/hooks/hooks";


// @ts-ignore
export default function DashboardClient({ initialData }) {
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(setInitialData(initialData))
    // }, [initialData])

    return ( 
        <div>something</div>
    )
}