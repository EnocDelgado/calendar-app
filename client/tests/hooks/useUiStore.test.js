import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks/useUiStore';
import { uiSlice } from '../../src/store';


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}


describe('Test in useUiStore', () => {

    test('should return the default values', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook( () => useUiStore(), {
            // wrapper return a component
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        });
        
    });

    test('openDateModal should set true in the isDateModalOpen', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        // refresh memory in customhook true or false
        const { openDateModal } = result.current;
        // use act to test a react component
        act( () => {
            openDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();


    });


    test('closeDateModal should set false in isDateModalOpen', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        // use act to test a react component
        act(() => {
            result.current.closeDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });


    test('toggleDateModal should change the state respectively', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        act(() => {
            result.current.toggleDateModal();
        });
        expect( result.current.isDateModalOpen ).toBeFalsy();

        act(() => {
            result.current.toggleDateModal();
        });
        expect( result.current.isDateModalOpen ).toBeTruthy();

    });


    
});