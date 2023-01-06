import { Header } from "../../PresentationalComponents/Header/Header";
import { useAppDispatch } from '../../../redux/hooks';
import { handleReset } from "../../../redux/features/getSearchedPhotosSlice";

const ContainerHeader = () => {
    const dispatch = useAppDispatch();

    const resetHandler = () => {
        dispatch(handleReset());

        // clear search input text
        const clearInput = document.getElementById('searchInput');
        if (clearInput) {
            (document.getElementById('searchInput') as HTMLInputElement).value = '';
        };
    };

    return(
        <Header
        onClick={ resetHandler }
        />
    );
};

export { ContainerHeader };