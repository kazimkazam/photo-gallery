import { createAsyncThunk } from "@reduxjs/toolkit";

export interface options {
    page: number,
    perPage: number,
    query: string
};

const fetchSearchedPhotosApi = createAsyncThunk('getSearchedPhotosState/getSearchedPhotos', async (options: options) => {
    const response = await fetch(`https://api.pexels.com/v1/search/?page=${options.page}&per_page=${options.perPage}&query=${options.query}`, {
        headers: {
            Authorization: process.env.REACT_APP_KEY!,
        }
    });

    return response.json();
});

export { fetchSearchedPhotosApi };
