import { SearchedPhotosState } from "../redux/features/getSearchedPhotosSlice";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import store from "../redux/store/store";
import { server } from "../mocks/server";
import { rest } from 'msw';
import { emptyMockResponse } from "../mocks/mockResponse";

// app render is defined in setupTests.tsx

describe('tests related with Search photos Page', () => {
    const initialState: SearchedPhotosState = {
        photos: [],
        randomWord: [],
        searchTopic: '',
        page: 1,
        fetchStatus: 'idle',
        errorStatus: ''
    };

    // navigate to search photos page before each test
    beforeEach(() => {
        fireEvent.click(screen.getByTestId('searchNav'));
        // await waitFor(() => expect(screen.getByTestId('Search')).toBeInTheDocument());
    });

    it('should load Search Page with initial state and with div showing only the search bar', () => {
        expect(screen.getByTestId('Search')).toBeInTheDocument();
        expect(screen.getByTestId('searchBar')).toBeInTheDocument();

        let state = store.getState().getSearchedPhotos;
        expect(state).toStrictEqual(initialState);

        expect(screen.getByTestId('Search')).toBeEmptyDOMElement();
    });

    it('should change search topic state when the user inserts a search topic on the search bar', async () => {
        fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'test' } } );

        let state = store.getState().getSearchedPhotos;
        expect(state.searchTopic).toBe('test');
    });

    it('should search for the photos on enter keydown and show them', async () => {
        // insert search topic
        fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'test' } } );

        let state = store.getState().getSearchedPhotos;
        expect(state.searchTopic).toBe('test');

        // give focus to search bar
        fireEvent.click(screen.getByTestId('searchInput'));

        // enter keydown
        fireEvent.keyDown(screen.getByTestId('searchInput'), { key: 'Enter' }); // , code:'Enter', keyCode: 13, charCode: 13 

        // verify
        // check that photos are being shown
        await waitFor(() => expect(screen.getByAltText('Man Doing A Sample Test In The Laboratory')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('Man Looking Through A Microscope')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('An Ophthalmologist Conducting a Vision Test')).toBeInTheDocument());
    });

    it('should search for the photos on search button click and show them', async () => {
        // insert search topic
        fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'test' } } );

        let state = store.getState().getSearchedPhotos;
        expect(state.searchTopic).toBe('test');

        // click on search button
        fireEvent.click(screen.getByTestId('searchButton'));

        // verify
        // check that photos are being shown
        await waitFor(() => expect(screen.getByAltText('Man Doing A Sample Test In The Laboratory')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('Man Looking Through A Microscope')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('An Ophthalmologist Conducting a Vision Test')).toBeInTheDocument());
    });

    it('should fetch more photos when user scrolls to the end of page', async () => {

    });

    it('should show that there were no photos found related with the search topic that was used if that is the case', async () => {
        // intercept this request and return mock results respective to the case where no photos are found
        server.use(
            rest.get('https://api.pexels.com/v1/search/', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json(emptyMockResponse),
                );
            }),
        );

        // insert search topic
        fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'test' } } );

        let state = store.getState().getSearchedPhotos;
        expect(state.searchTopic).toBe('test');

        // click on search button
        fireEvent.click(screen.getByTestId('searchButton'));

        // check that state has changed, i.e., random word was created, fetch was completed and that photos state is still empty
        state = store.getState().getSearchedPhotos;
        await waitFor(() => expect(state.photos.length).toBe(0));
        await waitFor(() => expect(screen.getByText('No photos were found related with this topic.')).toBeInTheDocument());
    });
});