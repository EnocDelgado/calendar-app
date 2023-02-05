import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {  isDateModalOpen } = useSelector( 
        state => state.ui 
    );

    // This function allow us to open the modal when is clicked
    const openDateModal = () => {
        // Dispatch is the reference to an action
        dispatch( onOpenDateModal() )
    }

    // This function allow us to close the modal when is clic out box
    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    // 
    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }



    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        closeDateModal,
        openDateModal,
        toggleDateModal,
    }

}