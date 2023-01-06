import { SearchedPhotosState } from "../redux/features/getSearchedPhotosSlice";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import store from "../redux/store/store";

// app render is defined in setupTests.tsx

describe('tests related with Home page', () => {
    const initialState: SearchedPhotosState = {
        photos: [],
        randomWord: [],
        searchTopic: '',
        page: 1,
        fetchStatus: 'idle',
        errorStatus: ''
    };

    it('should load the Home page with initial state', () => {
        expect(screen.getByTestId('Home')).toBeInTheDocument();

        let state = store.getState().getSearchedPhotos;
        expect(state).toStrictEqual(initialState);
    });
});