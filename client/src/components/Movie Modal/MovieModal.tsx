//Todo: Import RecsContainer from RecsContainer

//Todo: Import styles as needed

//Todo: Import OMDBcontainer to fetch movie data

//Todo: Create a container to display OMDBContainer data

//Todo: Stylize the container to match the wireframe

//Todo: Add Recscontainer to display movie recommendations


//Todo: Add like buttons to add to User's favorite movies


//Todo: HTML for exporting the MovieModal component

import React from 'react';

interface MovieModalProps {
    movie: string;
    onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{movie}</h2>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default MovieModal;



//Todo: export MovieModal
