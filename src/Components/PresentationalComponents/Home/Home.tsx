import React from "react";

const Home = () => {
    return(
        <div className="Home">
            <img src={ require('../../../resources/imgs/pexelsWelcome.jpeg') } alt={ 'Welcome' } />
        </div>
    );
};

export { Home };