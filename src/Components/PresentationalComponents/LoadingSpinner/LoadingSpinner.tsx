import ReactLoading from 'react-loading';

const LoadingSpinner = () => {
    return(
        <div className={ 'loadingSpinner' } >
            <h3>please, wait a moment.</h3>
            <h3>photos are loading...</h3>
            <ReactLoading type={ 'bubbles' } color={ '#DCD7C9' } height={ '8rem' } width={ '8rem' } />
        </div>
    );
};

export { LoadingSpinner };