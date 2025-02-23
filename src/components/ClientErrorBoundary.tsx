"use client";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
            <h2 className="text-2xl font-bold text-red-600">Terjadi Kesalahan!</h2>
            <p className="text-zinc-700">{error.message}</p>
            <button
                onClick={resetErrorBoundary}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Coba Lagi
            </button>
        </div>
    );
};

export function ClientErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
        )}>
            {children}
        </ErrorBoundary>
    );
}
