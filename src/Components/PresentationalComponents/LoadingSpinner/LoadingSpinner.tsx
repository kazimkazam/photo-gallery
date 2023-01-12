import LoadingSpinnerComponent from 'react-spinners-components';

const LoadingSpinner = () => {
    return(
        <div className={ 'loadingSpinner' } data-testid={ 'loadingSpinner' } >
            <h3>please, wait a moment.</h3>
            <h3>photos are loading...</h3>
            <LoadingSpinnerComponent type={ 'Ripple' } colors={ [ '#DCD7C9', '#39B5E0'] } size={ '150px' } />
        </div>
    );
};

export { LoadingSpinner };