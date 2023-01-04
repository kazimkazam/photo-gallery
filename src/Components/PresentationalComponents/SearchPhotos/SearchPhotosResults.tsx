import { Photos, RequestState } from "../../../redux/features/getSearchedPhotosSlice";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface SearchPhotosProps {
    photos: Photos[],
    status: RequestState
};

const SearchPhotosResults: React.FC<SearchPhotosProps> = (props) => {
    // return that there were no results found
    if (props.photos.length !== 0) {
        if (props.photos[0].photos.length === 0 && props.status === 'succeded') {
            return(
                <div className={ 'searchResults' }>
                    <p>No photos were found related with this word.</p>
                </div>
            )
        }
    };

    // return photos found
    if (props.photos.length !== 0 && props.status === 'succeded') {
        return(
            <div className={ 'searchResults' }>
                { props.photos.map(photosArray => photosArray.photos.map(photo => {
                    return(
                        <div>
                            <img src={ photo.src.large } alt={ photo.alt } key={ photo.id } />
                            <p>photo by:</p>
                            <a href={ photo.photographer_url } >@{ photo.photographer }</a>
                            <br></br>
                        </div>
                    )
                })) }
            </div>
        );
    } else if (props.photos.length !== 0 && props.status === 'loading') {
        // show loading spinner while waiting for photos fetching
        return(
            <div className={ 'searchResults' }>
                { props.photos.map(photosArray => photosArray.photos.map(photo => {
                    return(
                        <div>
                            <img src={ photo.src.large } alt={ photo.alt } key={ photo.id } />
                            <p>photo by:</p>
                            <a href={ photo.photographer_url } >@{ photo.photographer }</a>
                            <br></br>
                        </div>
                    )
                })) }

                <LoadingSpinner />
            </div>
        );
    } else if (props.photos.length === 0 && props.status === 'loading') {
        // show loading spinner while waiting for photos fetching on first search made
        return(
            <div className={ 'searchResults' }>
                <LoadingSpinner />
            </div>
        )
    };

    // default
    return(
        <div></div>
    );
};

export { SearchPhotosResults };
