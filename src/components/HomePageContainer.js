import HomePageComponent from './HomePageComponent'
import NavigationComponent from './NavigationComponent'
import {useAuth} from '../context/auth'
import jwt from 'jwt-decode'
import BASE_URL from '../constants'
import { useState, useEffect } from 'react'

const HomePageContainer = () => {
    const {authToken, setAuthToken} = useAuth()
    const token = jwt(authToken)
    const [logOut, setLogOut] = useState(false)
    const [loadUser, setLoadUser] = useState()
    const [teamCode, setTeamCode] = useState("")
    const [invalidCode, setInvalidCode] = useState(false)  
    const [userData, setUserData] = useState({
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
    })

    useEffect(() => {
        if (logOut) {
            setLogOut(false)
            setAuthToken("");
        }
    }, [token.exp, logOut, setAuthToken])
            

    const fetchUser = () => {
        if (loadUser) {
            return
        }
        setLoadUser(true)

        fetch(BASE_URL + "/users/"+token.sub, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
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
            setUserData(data)
        })
        .catch(error => {
            console.log(error)
            setLoadUser(false)
        })
    }

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
                setLoadUser(false)
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

    fetchUser()

    return (
        <div>
            <NavigationComponent setLogOut = {setLogOut}/>
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