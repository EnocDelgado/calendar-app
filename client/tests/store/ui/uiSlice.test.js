import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Test  uiSlice', () => {
    
    test('should return to the default state', () => {
        
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })

    });

    test('should change the isDateModalOpen correctly', () => {

        //state is false
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal() )
        expect(state.isDateModalOpen).toBeTruthy();
        // state is true
        state = uiSlice.reducer( state, onCloseDateModal() );
        expect(state.isDateModalOpen).toBeFalsy();
        
        
    });


});