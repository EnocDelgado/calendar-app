import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    // These are all events exported
    const { events, activeEvent } = useSelector( state => state.calendar );

    // Here call to dispatch action 
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    // This event save our notes
    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo allright
        if( calendarEvent._id ) {
            // Updateing
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Creating
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    // function to delete an event
    const startDeletingEvent = () => {
        // Todo: Backend classes


        dispatch( onDeleteEvent() );
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}