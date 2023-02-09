import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvent, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calerndarStates";


describe('Test in calendarSlice', () => {

    test('should return to the default state', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test('onSetActiveEvent should activate the event', () => {
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        expect(state.activeEvent).toEqual( events[0] );
    });

    test('onAddNewEvent should add the event', ()=> {

        const newEvent = {
            id: '3',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Boss Birthday',
            notes: 'Buy his Cake'
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        expect( state.events ).toEqual([ ...events, newEvent ]);

    });

    test('onUpdateEvent should update the event', ()=> {

        const updatedEvent = {
            id: '1',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Boss Birthday Updated',
            notes: 'Buy his Cake Updated'
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
        expect( state.events ).toContain( updatedEvent )

    });


    test('onDeleteEvent should delete the active event', () => {
        // calendarWithActiveEventState
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect( state.activeEvent ).toBe( null );
        expect( state.events ).not.toContain( events[0] )
    });


    test('onLoadEvents should establish the events', () => {
        // initialState
        const state = calendarSlice.reducer( initialState, onLoadEvent( events ) );
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual(events)

        const newState = calendarSlice.reducer( state, onLoadEvent( events ) );
        expect( state.events.length ).toBe( events.length );
    });

    test('onLogoutCalendar should clean up the state', () => {
        // calendarWithActiveEventState
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
    });

    
});