import React from "react";

const FullPageSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
        </div>
    );
};

export default FullPageSpinner;
