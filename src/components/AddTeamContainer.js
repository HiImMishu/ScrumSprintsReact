import { useState } from 'react'
import NavigationContainer from './NavigationContainer'
import AddTeamComponent from './AddTeamComponent'
import {useAuth} from '../context/auth'
import jwt from 'jwt-decode'
import BASE_URL from '../constants'

const AddTeamContainer = () => {
    const [logOut, setLogOut] = useState()
    const [teamName, setTeamName] = useState("")
    const {authToken} = useAuth()
    const token = jwt(authToken)
    const [addSuccess, setAddSuccess] = useState(false)

    const addTeam = (event) => {
        event.preventDefault()

        fetch(BASE_URL + "/teams/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                name: teamName,
                teamLeader: parseInt(token.sub)
            })
        })
        .then(response => {
            if (response.status === 201) {
                setAddSuccess(true)
                setTimeout(() => setAddSuccess(false), 3000)
            }
        })
    }

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <AddTeamComponent
                teamName = {teamName}
                setTeamName = {setTeamName} 
                addTeam = {addTeam}
                addSuccess = {addSuccess}
            />
        </div>
    )
}

export default AddTeamContainer