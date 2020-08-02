
function host(endpoint){

    return `https://api.backendless.com/254AAFE3-B024-C8AA-FF27-B4E66C953400/C09856F5-F55F-45C6-99BB-C5E35280862F/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_ID: 'data/movies/'
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

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            login: username, 
            password
        })
    })).json();

    localStorage.setItem('user-token', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}


async function logout(){
    const token = localStorage.getItem('userToken');

    return fetch(host(endpoints.LOGOUT),{
        headers: {
            'user-token': token
        }
    });
}

//Loading all the movies available in DB
async function getMovies(){
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES),{
        headers: {
            'user-token': token
        }
    })).json();
}

//Loading a specific movie with the provided ID
async function getMovieById(id){
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_ID + id),{
        headers: {
            'user-token': token
        }
    })).json();
}

//Creating a new movie and adding it to our DB
async function createMovie(movie){
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {   
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}


//Updating a specific movie, which already exists in our DB
async function updateMovie(id, updatedProps){
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_ID + id), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();
}


//Deleting a specific movie, which already exists in our DB
async function deleteMovie(id){
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_ID + id), {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
}

async function getMoviesByOwner(ownerId){
   const token = localStorage.getItem('userToken');

   return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`),{
       headers: {
        'user-token': token
       }
   })).json();
}


//Reducing the tickets value of specific movie after the buy ticket has been cliked
function buyTicket(movie){

    const newTickets = movie.tickets -1;
    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets: newTickets });

}

