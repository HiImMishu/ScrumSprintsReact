import BASE_URL from '../constants'

export const userModel = {
    id: null,
    archivedAt: null,
    signetAt: null,
    email: "",
    firstName: "",
    lastName: "",
    products: [{
        id: null,
        name: ""
    }],
    teamParticipated: [{
        id: null,
        name: "",
        createdAt: null
    }],
    teamsLeaded: [{
        id: null,
        name: "",
        createdAt: null
    }]
}

export const fetchUser = (id, token, setLogOut, setUserData) => {
    fetch(BASE_URL + "/users/"+id, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        else if (response.status === 401) {
            setLogOut(true)
        }
        else {
            throw Error("Error occured. Status code: " + response.status)
        }
    })
    .then(data => {
        if (data) {
            setUserData(data)
        }
    })
    .catch(error => {
        console.log(error)
    })
}