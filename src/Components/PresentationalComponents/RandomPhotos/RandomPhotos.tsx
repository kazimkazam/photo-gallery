import { Photos, RequestState } from "../../../redux/features/getSearchedPhotosSlice";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface RandomPhotosProps {
    randomWord: string,
    photos: Photos[],
    status: RequestState
};

const RandomPhotos: React.FC<RandomPhotosProps> = (props: RandomPhotosProps) => {
    if (props.photos.length !== 0 && props.status === 'succeded') {
        return(
            <div className={ 'searchResults' }>
                <h3>Random word is <span className="randomWord">{ props.randomWord }</span></h3>
                { props.photos.map(photosArray => photosArray.photos.map(photo => {
                    return(
                        <div key={ photo.id }>
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
        return(
            <div className={ 'searchResults' }>
                <h3>Random word is <span className="randomWord">{ props.randomWord }</span></h3>
                { props.photos.map(photosArray => photosArray.photos.map(photo => {
                    return(
                        <div key={ photo.id }>
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
        return(
            <div className={ 'searchResults' }>
                <LoadingSpinner />
            </div>
        )
    } else if (props.photos.length === 0 && props.status === 'succeded') {
        return(
            <div className={ 'searchResults' }>
                <p>No photos were found related with this word.</p>
            </div>
        )
    };

    return(
        <div className={ 'searchResults' }>
            
        </div>
    );
};

export { RandomPhotos };
