import { Footer } from "../Footer/Footer";

const Home = () => {
    return(
        <div className="Home" data-testid={ 'Home' }>
            <img src={ require('../../../resources/imgs/pexelsWelcome.jpeg') } alt={ 'Welcome' } />

            {/* the initial idea was not to have the footer as it is, but I'll leave this way for now */}
            {/* this way, is also pretty fast to change the component's look */}
            <Footer />
        </div>
    );
};

export { Home };