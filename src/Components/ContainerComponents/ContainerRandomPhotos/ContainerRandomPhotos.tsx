import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectSearchedPhotos, selectRandomWord, selectPage, selectFetchStatus } from "../../../redux/features/getSearchedPhotosSlice";
import { handleGetWord, handlePageChange } from "../../../redux/features/getSearchedPhotosSlice";
import { fetchSearchedPhotosApi, options } from "../../../resources/utils/fetchPhotos";
import { RandomPhotos } from '../../PresentationalComponents/RandomPhotos/RandomPhotos';
import { useEffect } from 'react';

const ContainerRandomPhotos = () => {
    const dispatch = useAppDispatch()
    const photos = useAppSelector(selectSearchedPhotos);
    const randomWord = useAppSelector(selectRandomWord);
    const page = useAppSelector(selectPage);
    const fetchStatus = useAppSelector(selectFetchStatus);

    // total amount of photos that can be fetched from pexels with the searched topic
    let totalResults: number;
    if (photos.length !== 0) {
        totalResults = photos[0].total_results;
    };

    // amount of photos already fetched
    let numberFetchedPhotos: number = photos.length * 30;

    // handle search
    const searchHandler = (page: number) => {
        let options: options = {
            page: page,
            perPage: 30,
            query: randomWord[0]
        }
        dispatch(fetchSearchedPhotosApi(options));
        dispatch(handlePageChange());
    };

    // get random word when page loads
    useEffect(() => {
        dispatch(handleGetWord());
    }, [  ]);

    useEffect(() => {
        if (randomWord.length !== 0) {
            searchHandler(page);
        };
    }, [ randomWord ]);

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
        <RandomPhotos
        randomWord={ randomWord[0] }
        photos={ photos }
        status={ fetchStatus }
        />
    );
};

export { ContainerRandomPhotos };
