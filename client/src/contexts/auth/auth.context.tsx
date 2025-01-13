"use client";

import {Context, createContext, ReactNode} from "react";

export const AuthContext: Context<TContextSessionUnion> = createContext(false);

export type TContextSession= {
    id: string
    user: {
        id: string
        email: string
        isAdmin: boolean
        version: number
    }
    version: number
}

export type TContextSessionUnion = TContextSession | 'invalid' | false

export const AuthContextWrapper = ({value, children}: {value: TContextSessionUnion, children: ReactNode}) => {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}