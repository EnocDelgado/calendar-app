import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvent } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    // These are all events exported
    const { events, activeEvent } = useSelector( state => state.calendar );
    // get user from store
    const { user } = useSelector( state => state.auth );

    // Here call to dispatch action 
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    // This event save our notes
    const startSavingEvent = async( calendarEvent ) => {
        // TODO: getting the backend

        try {
            // Todo allright
            if( calendarEvent.id ) {
            // Updateing
            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
            
            dispatch( onUpdateEvent({ ...calendarEvent, user }) );

            return;
            } 

            // Creating
            const { data } = await calendarApi.post('events', calendarEvent )
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );

        } catch ( error ) {
            console.log( error );
            Swal.fire('Save error', error.response.data.msg, 'error' );
        }

        
        
    }

    // function to delete an event
    const startDeletingEvent = async() => {
        // Todo: Backend classes
        try {
            // delete event
            await calendarApi.delete(`/events/${ activeEvent.id }`)
            
            dispatch( onDeleteEvent() );
            

        } catch ( error ) {
            console.log( error );
            Swal.fire('Delete error', error.response.data.msg, 'error' );
        }

        
    }

    const startLoadingEvent = async() => {
        try {
            // Load all events saving in the database
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvent( data.events );
            dispatch( onLoadEvent( events ) );

        } catch ( error ) {
            console.error( 'Loading Event errors' );
            console.log( error );
        }
    };

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvent
    }
}