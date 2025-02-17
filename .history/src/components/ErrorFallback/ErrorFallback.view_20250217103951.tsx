import { FC, memo } from "react";
import { ErrorFallbackProps } from "./ErrorFallback.type";

const ErrorFallbackView: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
    <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
);

export default memo(ErrorFallbackView);