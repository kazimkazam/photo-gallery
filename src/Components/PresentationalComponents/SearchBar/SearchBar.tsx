type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: (e: React.MouseEvent) => void,
    onKeyDown: (e: React.KeyboardEvent) => void
}

const SearchBar = (props: Props) => {
    return(
        <div className="searchBar">
            <input id={ 'searchInput' } type={ 'text' } placeholder={ 'insert the search topic here.' } onChange={ props.onChange } onKeyDown={ props.onKeyDown } />
            <button onClick={ props.onClick } >search</button>
        </div>
    );
};

export { SearchBar };