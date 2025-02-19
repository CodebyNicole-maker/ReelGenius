//Todo: Import syles sheets as required to match wireframe
// import React from 'react';
import './styles/loading.css';
import '../assets/wireframeAssets/loadingElement1-static.png';
import '../assets/wireframeAssets/loadingElement2-static.png';
import '../assets/wireframeAssets/loadingElementgf.gif';
import { useState, useCallback } from "react";
import { LoadingOverlay } from "@achmadk/react-loading-overlay";



//Todo: Utilize styles and effects to make animated loading element
const Loader = () => {
    const [isActive, setActive] = useState(false);
    const handleButtonClicked = useCallback (() => {
        setActive(value => !value);
    }, []);

    return (
        <LoadingOverlay
            active={isActive}
            spinner
            text="Loading your content..."
        >
            <div style={{ height: 200}}>
                <p>Some content or children</p>
                <button onClick={handleButtonClicked}>
                    Toggle Loading Overlay
                </button>
            </div>
        </LoadingOverlay>
    );
};





// const Loader = () => {
//     return (
//         <div className="loader">
//             <img src="./loadingElementgf.gif" alt="Loading" />
//         </div>
//     )
// }

export default Loader;
