import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectSearchedPhotos, selectSearchTopic, selectPage, selectFetchStatus } from "../../../redux/features/getSearchedPhotosSlice";
import { handleChange, handlePageChange } from "../../../redux/features/getSearchedPhotosSlice";
import { fetchSearchedPhotosApi, options } from "../../../resources/utils/fetchPhotos";
import { SearchBar } from "../../PresentationalComponents/SearchBar/SearchBar";
import { SearchPhotosResults } from "../../PresentationalComponents/SearchPhotos/SearchPhotosResults";
import { useEffect } from 'react';

const ContainerSearchPhotos = () => {
    const dispatch = useAppDispatch()
    const photos = useAppSelector(selectSearchedPhotos);
    const searchTopic = useAppSelector(selectSearchTopic);
    const page = useAppSelector(selectPage);
    const fetchStatus = useAppSelector(selectFetchStatus);

    // total amount of photos that can be fetched from pexels with the searched topic
    let totalResults: number;
    if (photos.length !== 0) {
        totalResults = photos[0].total_results;
    };

    // amount of photos already fetched
    let numberFetchedPhotos: number = photos.length * 30;

    // handle changes on searchBar
    const eventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleChange(event));
    };

    // handle search
    const searchHandler = (page: number) => {
        let options: options = {
            page: page,
            perPage: 30,
            query: searchTopic
        }
        dispatch(fetchSearchedPhotosApi(options));
        dispatch(handlePageChange());
    };

    // handle enter key keydown or search Button onClick
    const enterKeyDownHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            searchHandler(page);
        };
    };

    const clickHandler = () => {
        searchHandler(page);
    };

    // create infinite scroll
    const scrollHandler = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
    
        if (scrollTop + clientHeight >= scrollHeight && numberFetchedPhotos <= totalResults) {
            searchHandler(page);
        };
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [ photos ]);

    return(
        <div>
        <SearchBar
        onChange={ eventHandler }
        onClick={ clickHandler }
        onKeyDown={ enterKeyDownHandler }
        />

        <SearchPhotosResults
        photos={ photos }
        status={ fetchStatus }
        />
        </div>
    );
};

export { ContainerSearchPhotos };
