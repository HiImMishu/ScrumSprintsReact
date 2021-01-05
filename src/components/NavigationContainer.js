import NavigationComponent from './NavigationComponent'
import BASE_URL from '../constants'
import {useAuth} from '../context/auth'
import {useEffect} from 'react'
import jwt from 'jwt-decode'

const NavigationContainer = (props) => {
    const {authToken, setAuthToken} = useAuth()
    const token = jwt(authToken)

    useEffect(() => {
        if (props.logOut) {
            props.setLogOut(false)
            setAuthToken("");
        }
    }, [token.exp, props.logOut, setAuthToken, props])

    const archiveAccount = () => {
        fetch(BASE_URL + "/users/"+token.sub, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            }
        })
        .then(response => {
            if (response.ok) {
                props.setLogOut(true)
            }
        })
    }

    return (
        <NavigationComponent
            archiveAccount = {archiveAccount}
            setLogOut = {props.setLogOut} 
        />
    )
}

export default NavigationContainer