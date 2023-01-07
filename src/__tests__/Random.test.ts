import { screen, fireEvent, waitFor } from "@testing-library/react";
import store from "../redux/store/store";
import { server } from "../mocks/server";
import { rest } from 'msw';
import { emptyMockResponse } from "../mocks/mockResponse";
import userEvent from "@testing-library/user-event";

// app render is defined in setupTests.tsx

describe('tests related with Random photos Page', () => {
    // navigate to random photos page before each test
    beforeEach(() => {
        fireEvent.click(screen.getByTestId('randomNav'));
    });

    it('should load Random Page with initial state and with only the loading spinner showing', () => {
        expect(screen.getByTestId('Random')).toBeInTheDocument();

        let state = store.getState().getSearchedPhotos;
        expect(state.photos.length).toBe(0);

        expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
        expect(screen.getByTestId('Random').childNodes.length).toBe(1); // 1 ---> is the loading spinner
    });

    it('should fetch photos using a random word as search query and show the photos', async () => {
        let state = store.getState().getSearchedPhotos;
        await waitFor(() => expect(state.randomWord.length).not.toBe(0));

        // check that random word is being shown
        state = store.getState().getSearchedPhotos;
        await waitFor(() => expect(screen.getByText('Random word is')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(state.randomWord[0])).toBeInTheDocument());
        
        // check that photos are being shown
        await waitFor(() => expect(screen.getByAltText('Man Doing A Sample Test In The Laboratory')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('Man Looking Through A Microscope')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('An Ophthalmologist Conducting a Vision Test')).toBeInTheDocument());
    });

    it('should fetch more photos when user scrolls to the end of page', async () => {
        // assert that random word is created and photos are being shown, then fire the scroll event
        let state = store.getState().getSearchedPhotos;
        await waitFor(() => expect(screen.getByText('Random word is')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(state.randomWord[0])).toBeInTheDocument());
        
        // check that photos are being shown
        await waitFor(() => expect(screen.getByAltText('Man Doing A Sample Test In The Laboratory')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('Man Looking Through A Microscope')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByAltText('An Ophthalmologist Conducting a Vision Test')).toBeInTheDocument());

        // fire scroll event
        fireEvent.scroll(window, { target: { scrollY: 900 } });

        // check that more photos were fetched and are now being shown
        await waitFor(() => expect(screen.getAllByAltText('Man Doing A Sample Test In The Laboratory').length).toBeGreaterThan(1));
        await waitFor(() => expect(screen.getAllByAltText('Man Looking Through A Microscope').length).toBeGreaterThan(1));
        await waitFor(() => expect(screen.getAllByAltText('An Ophthalmologist Conducting a Vision Test').length).toBeGreaterThan(1));

        state = store.getState().getSearchedPhotos;
        expect(state.page).toBeGreaterThan(1);
    });

    it('should show that there were no photos found related with the random word that was used if that is the case', async () => {
        // intercept this request and return mock results respective to the case where no photos are found
        server.use(
            rest.get('https://api.pexels.com/v1/search/', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json(emptyMockResponse),
                );
            }),
        );

        // check that state has changed, i.e., random word was created, fetch was completed and that photos state is still empty
        let state = store.getState().getSearchedPhotos;
        await waitFor(() => expect(state.photos.length).toBe(0));
        await waitFor(() => expect(state.randomWord.length).not.toBe(0));
    });
});