//Todo: Import styles as needed

//Todo: Import UserList to capture user's favorite movies

//Todo: Import OMDBcontainer to fetch movie data

//Todo: Import MovieModal to display movie details

//Todo: Import LoadingPage to display loading animation

//Todo: Import auth to check if user is logged in
//? Striken code is used to check if user is logged in

//Todo: Import useEffect and useState hooks from React


//Todo: Create a container to include the OMDBcontainer, MovieModal, and UserList components





//Todo: Pull UserList current user and capture the user's favorite movies - saved as array of movie ids


//Todo: Stylize the container to match the wireframe
    //Todo: Use carousel to display favorite movies
    //Todo: Add a like button to remove from user's favorite movies
    //? Stylize as a filled in heart to begin to show that the movie is a favorite
    //? Stylize as an empty heart to show that the movie is not a favorite


//Todo: Add HTML React code to export the FavoritesCarousel component

//Todo: export FavoritesCarousel
    


//! Example code

import { useState, useEffect } from 'react';


interface CardProps {
    key: number;
    text: string;
    icon: string;
    btnText: string;
    btnLink: string;
    btnIcon?: string;
    headerImg?: string;
    sendInteraction: (interaction: any) => void;
}

const Card: React.FC<CardProps> = ({ key, text, icon, btnText, btnLink, btnIcon, headerImg }) => {

    const openUrl = (url: string, label: string) => {
        window.open(url, '_blank');
    }

    const headText = text.length > 30 ? text.substring(0, 30) + '...' : text;

    let headerSection = null;
    let marginClass;
    if (headerImg) {
        headerSection = <div style={{ backgroundImage: `url("${headerImg}")`, }} className="carousel-bg-img">
            <img src={icon} height="40px" className="carousel-logo-img" />
        </div>;
        marginClass = '30';
    } else {
        headerSection = <img src={icon} height="45px" className='mt-15' />;
        marginClass = '15';
    }

    return (
        <li className="carousel-card carousel-li" key={key}>
            {headerSection}
            <div className={"carousel-card-text mt-" + marginClass}>
                <p>{headText}</p>
            </div>
            <a className="carousel-card-outline" href='javascript:void(0)'
                onClick={() => openUrl(btnLink, btnText)}>
                {btnIcon &&
                    <span><img src={btnIcon} height="12px" /> &nbsp;{btnText}</span>
                }
                {!btnIcon &&
                    <span>{btnText}</span>
                }
            </a>
        </li>
    )
}


/**
* Component to render a carousel
* @param {Array} items Items to show
* @returns
*/
interface CarouselItem {
    icon: string;
    text: string;
    headerImg?: string;
    btnText: string;
    btnLink: string;
    btnIcon?: string;
}

interface CarouselProps {
    items: CarouselItem[];
    sendInteraction: (interaction: any) => void;
}

function Carousel({ items, sendInteraction }: CarouselProps) {
    let cards = items.map((t, index) =>
        <Card key={index} icon={t.icon} text={t.text}
         headerImg= {t.headerImg}
         btnText={t.btnText} btnLink={t.btnLink} btnIcon={t.btnIcon}
         sendInteraction={sendInteraction} />
);

useEffect(() => {
document.documentElement.style.setProperty('--num', items.length.toString());
}, [items])

const [currentIndex, setCurrentIndex] = useState(0);

const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
};

const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
};

const carouselStyle = {
    transform: `translateX(-${currentIndex * 20}%)`,
};

return (
    <div className="carouselwrapper module-wrapper">
        <div className="ui">
        <button onClick={handlePrevClick} className="carousel-button carousel-prev">
            <span className="material-icons">&lsaquo;</span>
        </button>
        <button onClick={handleNextClick} className="carousel-button carousel-next">
            <span className="material-icons">&#8250;</span>
        </button>
    </div>
    <ul className="carousel" style={carouselStyle}>
        {cards}
     </ul>
    </div>
);
}

export default Carousel;