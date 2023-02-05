import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// This is an example of how is an event
const tempEvent =   {
    _id: new Date().getTime(),
    title: 'Boss Birthday',
    notes: 'Buy his Cake',
    start: new Date(),
    end: addHours( new Date(), 2) ,
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Ethan'
    }
};


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        // Here send id
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        },
        // here clean an active event
        onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        // Update an event
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event._id === payload._id ) {
                    return payload;
                }

                return event;
            });
        },
        // Delete an event
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event._id !== state.activeEvent._id );
                state.activeEvent = null;
            }
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;