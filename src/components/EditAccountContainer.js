import NavigationContainer from './NavigationContainer'
import EditAccountComponent from './EditAccountComponent'
import {useEffect, useState} from 'react'
import {useAuth} from '../context/auth'
import jwt from 'jwt-decode'
import BASE_URL from '../constants'
import {fetchUser, userModel} from '../service/UserService'

const EditAccountContainer = (props) => {
    const [logOut, setLogOut] = useState()
    const {authToken} = useAuth()
    const token = jwt(authToken)
    const [userData, setUserData] = useState(userModel) 
    const [loadUser, setLoadUser] = useState(true) 
    const [editSuccess, setEditSuccess] = useState(false)

    useEffect(() => {
        if (loadUser) {
            setLoadUser(false)
            fetchUser(token.sub, authToken, setLogOut, setUserData)
        }
    }, [loadUser, setLoadUser, token.sub, authToken, setLogOut, setUserData])

    const handleChange = (event) => {
        const {name, value} = event.target
        setUserData((prevState) => ({
                ...prevState,
                [name]: value
        }))
    }

    const editUser = (event) => {
        event.preventDefault()

        fetch(BASE_URL + "/users/"+token.sub, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email
            })
        })
        .then(response => {
            if (response.status === 204) {
                setLoadUser(true)
                setEditSuccess(true)
                setTimeout(() => setEditSuccess(false), 3000)
            }
        })
    }

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <EditAccountComponent
                {...userData}
                handleChange = {handleChange}
                editUser = {editUser}
                editSuccess = {editSuccess}
            />
        </div>
    )
}

export default EditAccountContainer