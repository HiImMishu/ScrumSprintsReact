import TeamInfoComponent from './TeamInfoComponent'
import NavigationContainer from './NavigationContainer'
import {useState, useEffect} from 'react'
import {useAuth} from '../context/auth'
import {useParams, Redirect} from 'react-router-dom'
import {teamModel} from '../models/TeamModel'
import {productModel} from '../models/ProductModel'
import jwt from 'jwt-decode'
import BASE_URL from '../constants'

const TeamInfoContainer = () => {
    const [logOut, setLogOut] = useState()
    const [refreshTeam, setRefreshTeam] = useState(true)
    const [data, setData] = useState(teamModel)
    const [teamName, setTeamName] = useState("")
    const [product, setProduct] = useState(productModel)
    const [teamDeleted, setTeamDeleted] = useState(false)
    const {authToken} = useAuth()
    const token = jwt(authToken)
    var { teamId } = useParams("teamId")

    useEffect(() => {
        if (data.name) {
            setTeamName(data.name)
        }

        if (refreshTeam) {
            setRefreshTeam(false)

            fetch(BASE_URL + "/teams/"+teamId, {
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
            })
            .then(data => {
                if (data) {
                    setData(data)
                }
            })
        }

        if (data.product && data.product.id) {
            fetch(BASE_URL + "/products/"+data.product.id, {
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
            })
            .then(data => {
                if (data) {
                    setProduct(data)
                }
            })
        }

    }, [refreshTeam, authToken, teamId, data.name, data.product])

    const updateTeam = (event, memberId) => {
        event.preventDefault()

        if (teamName === data.name && event.type === "submit") {
            return
        }

        fetch(BASE_URL + "/teams/"+teamId, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                id: parseInt(teamId),
                name: teamName,
                teamLeader: (parseInt(memberId) === -1) ? data.teamLeader.id : parseInt(memberId)
            })
        })
        .then(response => {
            if (response.ok) {
                if (event.type === "submit") {
                    setData(prevData => ({
                        ...prevData,
                        name: teamName
                    }))
                }
                else {
                    setRefreshTeam(true)
                }
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    const removeTeamMember = (memberId) => {
        fetch(BASE_URL + "/teams/members", {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                userId: parseInt(memberId),
                teamId: parseInt(data.id)
            })
        })
        .then(response => {
            if (response.ok) {
                setData(prevData => ({
                    ...prevData,
                    "members": prevData.members.slice().filter(i => {return i.id !== memberId})
                }))
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    const deleteTeam = () => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            fetch(BASE_URL + "/teams/"+data.id, {
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
                    setTeamDeleted(true)
                }
                else if (response.status === 401) {
                    setLogOut(true)
                }
            })
        }
    }

    if (teamDeleted) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <TeamInfoComponent
                {...data}
                userId = {token.sub}
                teamName = {teamName}
                setTeamName = {setTeamName}
                updateTeam = {updateTeam}
                removeTeamMember = {removeTeamMember}
                prod = {product}
                deleteTeam = {deleteTeam}
            />
        </div>
    )
}

export default TeamInfoContainer