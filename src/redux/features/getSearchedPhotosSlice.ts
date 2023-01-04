import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchedPhotosApi } from "../../resources/utils/fetchPhotos";
import { RootState } from "../store/store";

var randomWord = require('random-words');

interface Photo {
    id: number,
    width: number,
    height: number,
    url: string,
    photographer: string,
    photographer_url: string,
    photographer_id: number,
    avg_color: string,
    src: { original: string, large2x: string, large: string, medium: string, small: string, portrait: string, landscape: string, tiny: string },
    liked: boolean,
    alt: string
};

export interface Photos {
    page: number,
    perPage: number,
    photos: Photo[],
    total_results: number,
    next_page: string
};

export type RequestState = 'idle' | 'loading' | 'succeded' | 'failed';

interface SearchedPhotosState {
    photos: Photos[],
    randomWord: string[],
    searchTopic: string,
    page: number,
    fetchStatus: RequestState,
    errorStatus: string | undefined
};

const initialState: SearchedPhotosState = {
    photos: [],
    randomWord: [],
    searchTopic: '',
    page: 1,
    fetchStatus: 'idle',
    errorStatus: ''
};

export const getSearchedPhotosSlice = createSlice({
    name: 'getSearchedPhotos',
    initialState,
    reducers: {
        handleGetWord: (state) => {
            const word: string = randomWord(1);
            state.randomWord.push(word);
        },

        handleChange: (state, action) => {
            state.searchTopic = action.payload.target.value;
        },

        handlePageChange: (state) => {
            state.page += 1;
        },

        handleReset: (state) => {
            state.photos = [];
            state.randomWord = [];
            state.searchTopic = '';
            state.page = 1;
            state.fetchStatus = 'idle';
            state.errorStatus = '';
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchSearchedPhotosApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
        })
        .addCase(fetchSearchedPhotosApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(fetchSearchedPhotosApi.fulfilled, (state, action) => {
            state.fetchStatus = 'succeded';
            state.errorStatus = '';
            state.photos.push(action.payload);
        })
    }
});

export const { handleGetWord, handleChange, handlePageChange, handleReset } = getSearchedPhotosSlice.actions;

export const selectSearchedPhotos = (state: RootState) => state.getSearchedPhotos.photos;
export const selectRandomWord = (state: RootState) => state.getSearchedPhotos.randomWord;
export const selectSearchTopic = (state: RootState) => state.getSearchedPhotos.searchTopic;
export const selectPage = (state: RootState) => state.getSearchedPhotos.page;
export const selectFetchStatus = (state: RootState) => state.getSearchedPhotos.fetchStatus;

export default getSearchedPhotosSlice.reducer;
