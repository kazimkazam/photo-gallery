import { screen, fireEvent, waitFor } from "@testing-library/react";

// app render is defined in setupTests.tsx

describe('tests related with Navigation tabs', () => {
    it('should load the Home page and change to other tabs on click', async () => {
        expect(screen.getByTestId('Home')).toBeInTheDocument();

        // click on random nav tab
        fireEvent.click(screen.getByTestId('randomNav'));
        await waitFor(() => expect(screen.getByTestId('Random')).toBeInTheDocument());

        // click on search nav tab
        fireEvent.click(screen.getByTestId('searchNav'));
        await waitFor(() => expect(screen.getByTestId('Search')).toBeInTheDocument());

        // return to home page
        fireEvent.click(screen.getByTestId('homeNav'));
        await waitFor(() => expect(screen.getByTestId('Home')).toBeInTheDocument());
    });
});