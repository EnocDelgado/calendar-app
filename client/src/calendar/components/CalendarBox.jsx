
/**
 * This functions return us two title and a name of the user
 * @param { event } param0 
 * @returns Title and name of the event
 */
export const CalendarBox = ({ event }) => {

    const { title, user } = event;

    return (
        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </>
    )
}