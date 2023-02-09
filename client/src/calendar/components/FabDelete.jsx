import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }


  return (
    <button
        aria-label="btn-delete"
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        // If it not event selected delted bottom is hidden
        style={{
            display: hasEventSelected ? '': 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}