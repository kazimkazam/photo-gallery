import { NavLink } from "react-router-dom";

interface HeaderProps {
    onClick: any
};

const Header = (props: HeaderProps) => {
    return(
        <div className={ 'Header' } >
            <div className={ 'logoAndTitle' } >
                <img src={ require('../../../resources/icons/camera.png') } width={ 40 } className={ 'logo' } alt={ 'logo' } />
                <h1>photo gallery app</h1>
            </div>

            <nav>
                <ul>
                    <li><NavLink to={ '/' } onClick={ props.onClick } >home</NavLink></li>
                    <li><NavLink to={ '/random' } onClick={ props.onClick } >random</NavLink></li>
                    <li><NavLink to={ '/search' } onClick={ props.onClick } >search</NavLink></li>
                    <li><NavLink to={ '/acknowledgements' } onClick={ props.onClick } >acknowledgements</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export { Header };