import HomePageComponent from './HomePageComponent'
import NavigationContainer from './NavigationContainer'
import {useAuth} from '../context/auth'
import jwt from 'jwt-decode'
import BASE_URL from '../constants'
import { useState, useEffect } from 'react'
import {fetchUser, userModel} from '../service/UserService'

const HomePageContainer = () => {
    const {authToken} = useAuth()
    const token = jwt(authToken)
    const [logOut, setLogOut] = useState(false)
    const [loadUser, setLoadUser] = useState(true)
    const [teamCode, setTeamCode] = useState("")
    const [invalidCode, setInvalidCode] = useState(false)  
    const [userData, setUserData] = useState(userModel)     

    const joinTeam = () => {
        if(teamCode.length === 0) {
            return
        }

        fetch(BASE_URL + "/teams/members", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                userId: userData.id,
                teamCode: teamCode
            })
        })
        .then(response => {
            if (response.ok) {
                setLoadUser(true)
            }
            else if(response.status === 404) {
                setInvalidCode(true)
                setTimeout(() => setInvalidCode(false), 3000)
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    useEffect(() => {
        if (loadUser) {
            setLoadUser(false)
            fetchUser(token.sub, authToken, setLogOut, setUserData)
        }
    }, [loadUser, setLoadUser, token.sub, authToken, setLogOut, setUserData])
    
    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <HomePageComponent 
                {...userData}
                teamCode = {teamCode}
                setTeamCode = {setTeamCode}
                joinTeam = {joinTeam}
                invalidCode = {invalidCode}
            />
        </div>
    )
}

export default HomePageContainer