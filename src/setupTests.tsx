import '@testing-library/jest-dom';
import './App/App.css';
import './resources/styles/styles.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ContainerHeader } from './Components/ContainerComponents/ContainerHeader/ContainerHeader';
import { ContainerHome } from './Components/ContainerComponents/ContainerHome/ContainerHome';
import { ContainerRandomPhotos } from './Components/ContainerComponents/ContainerRandomPhotos/ContainerRandomPhotos';
import { ContainerSearchPhotos } from './Components/ContainerComponents/ContainerSearchPhotos/ContainerSearchPhotos';
import { Acknowledgements } from './Components/PresentationalComponents/Acknowledgements/Acknowledgements';
import { render } from '@testing-library/react';
import { server } from './mocks/server';

beforeAll(() => {
    server.listen();
});

beforeEach(() => {
    render(
        <Provider store={ store }>
            <div className="App">
                <Router>
                <ContainerHeader />

                <div className='Container'>
                    <Routes>
                    <Route path={ '/' } element={ <ContainerHome /> } ></Route>
                    <Route path={ '/random' } element={ <ContainerRandomPhotos /> } ></Route>
                    <Route path={ '/search' } element={ <ContainerSearchPhotos /> } ></Route>
                    <Route path={ '/acknowledgements' } element={ <Acknowledgements /> } ></Route>
                    </Routes>
                </div>
                </Router>
            </div>
        </Provider>
    );
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
