// src/app/error/page.tsx
import { FC, memo } from "react";
import { ErrorFallbackProps } from "./ErrorFallback";

const ErrorPage: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
    <div role="alert" className="p-4 border border-red-500 bg-red-100 rounded-md">
        <p className="text-red-700 font-bold">Something went wrong:</p>
        <pre className="text-red-500 whitespace-pre-wrap">{error.message}</pre>
        <button 
            onClick={resetErrorBoundary} 
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Try again
        </button>
    </div>
);

export default memo(ErrorPage);