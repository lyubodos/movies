function host(endpoint){

    return `https://api.backendless.com/254AAFE3-B024-C8AA-FF27-B4E66C953400/C09856F5-F55F-45C6-99BB-C5E35280862F/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout'
}


async function register(username, password){

    return (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            username, 
            password
        })
    })).json();
}


async function login(username, password){

    return (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            login: username, 
            password
        })
    })).json();
}


async function logout(){
    const token = localStorage.getItem('userToken');

    return fetch(host(endpoints.LOGOUT),{
        headers: {
            'user-token': token
        }
    });
}
