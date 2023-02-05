import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import { useUiStore } from '../../hooks/useUiStore';
import { onCloseDateModal } from '../../store';
import { useCalendarStore } from '../../hooks/useCalendarStore';

// import es from 'date-fns/locale/es';

// registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setformSubmitted] = useState( false );

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2)
    })

    // Memorize value when title or submitted have changed
    const titleClass = useMemo( () => {
        // if form is not running
        if( !formSubmitted ) return '';

        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid'

    }, [ formValues.title, formSubmitted ])


    useEffect( () => {
        if ( activeEvent !== null ) {
            setFormValues({ ...activeEvent });
        }

    }, [ activeEvent ])

    // Update the form
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }

    // invoke the date
    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [ changing ]: event
        })
    }

    // This function is to close modal window
    const onCloseModal = () => {
        // This is the dispacth close action 
        closeDateModal();
    }

    // functionto submit the form 
    const onSubmit = async( event ) => {
        event.preventDefault();
        // this is when the attempted form was submitted
        setformSubmitted( true );

        // Validate start date doesn't lower than end date
        const difference = differenceInSeconds( formValues.end, formValues.start );

        if ( isNaN( difference ) || difference <= 0 ) {
            Swal.fire('Wrong dates', 'Check dates entered', 'error')
            return;
        }

        // if title form is empty do nothing
        if ( formValues.title.length <= 0 ) return;

        // console.log( formValues )
        // TODO:
        // Remove error in the screen
        await startSavingEvent( formValues );
        // close modal 
        closeDateModal();
        setformSubmitted( false );
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1> New event </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Start date and time</label>
                    <DatePicker 
                        selected={ formValues.start }
                        onChange={  ( event ) => onDateChanged( event, 'start' ) }
                        className="form-control"
                        dateFormat="Pp"
                        // To change create a spanish lengauge 
                        // showTimeSelect
                        // locale="es"
                        // timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>End date and time</label>
                    <DatePicker 
                        minDate={ formValues.start } // This allow us to not select and lower date
                        selected={ formValues.end }
                        onChange={  ( event ) => onDateChanged( event, 'end' ) }
                        className="form-control"
                        dateFormat="Pp"
                        // To change create a spanish lengauge 
                        // showTimeSelect
                        // locale="es"
                        // timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and notes</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Event Title"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">A short description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span>Save</span>
                </button>

            </form>
        </Modal>
    )
}
