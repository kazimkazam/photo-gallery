import { Footer } from "../Footer/Footer";

const Home = () => {
    return(
        <div className="Home">
            <img src={ require('../../../resources/imgs/pexelsWelcome.jpeg') } alt={ 'Welcome' } />

            <Footer />
        </div>
    );
};

export { Home };