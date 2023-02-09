import calendarApi from '../../src/api/calendarApi'

describe('Testing in CalendarApi', () => {
    
    test('should have the default configuration', () => {
        // This test just evaluate aour interceptors configuration

        // console.log(calendarApi);
        // console.log(process.env)
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    
    });

    test('shuould have the x-token in the header of all requests ', async() => {

        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token );
        const res = await calendarApi.get('/auth')
                                    .then((res) => res)
                                    .catch((res) => res);

        expect(res.config.headers['x-token']).toBe( token );
        
    });


});