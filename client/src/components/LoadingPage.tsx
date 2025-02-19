//Todo: Import syles sheets as required to match wireframe
// import React from 'react';
import './styles/loading.css';
import '../assets/wireframeAssets/loadingElement1-static.png';
import '../assets/wireframeAssets/loadingElement2-static.png';
import '../assets/wireframeAssets/loadingElementgf.gif';


//Todo: Utilize styles and effects to make animated loading element
const Loader = () => {
    return (
        <div className="loader">
            <img src="../assets/wireframeAssets/loadingElementgf.gif" alt="Loading Element" />
        </div>
    )
}

export default Loader;
