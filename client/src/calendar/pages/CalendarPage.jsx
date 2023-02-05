import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarBox, CalendarModal, FabAddNew, Navbar, FabDelete } from "../";

import { getMessages, localizer } from '../../helpers';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' || 'week' ));

  // This function allows us to change the style of the entry.
  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    
    return {
      style
    }
  }

  // Here we send an event to our dispatch
  const onDoubleClick = ( event ) => {
    // This is the dispach of action to open the modal
    openDateModal( event);
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    // Save in the localStorage
    localStorage.setItem( 'lastView', event );
    setLastView( event )
  }

  return (
    <>
      <Navbar />
      <Calendar
        // If I want my calendar to Spanish, we have to import getMessagesES() and  change 'es', getMessagesES() in culture and messages
        culture='en'
        localizer={ localizer }
        events={ events }
        // invoking the state
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessages() }
        eventPropGetter={ eventStyleGetter }
        components = {{
          // Send by reference the calendar event
          event: CalendarBox
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      {/* this is a event when we closing session */}
      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  )
}
