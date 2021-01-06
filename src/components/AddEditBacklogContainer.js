import AddEditBacklogComponent from './AddEditBacklogComponent'
import NavigationContainer from './NavigationContainer'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useAuth} from '../context/auth'
import BASE_URL from '../constants'

const AddEditBacklogContainer = (props) => {
    const [logOut, setLogOut] = useState()
    const [action, setAction] = useState("add")
    const [description, setDescription] = useState("")
    const [success, setSuccess] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    let date = new Date()
    const [endDate, setEndDate] = useState(new Date(date.setDate(date.getDate() + 14)));
    const [backlog, setBacklog] = useState({
        id: null,
        description: "",
        startTime: "",
        endTime: ""
    })
    const {authToken} = useAuth()
    var {productId} = useParams("productId")

    useEffect(() => {
        if (!backlog.id && props.location.backlog) {
            setBacklog(props.location.backlog)
            setAction(props.location.action)
            setStartDate(new Date(props.location.backlog.startTime))
            setEndDate(new Date(props.location.backlog.endTime))
            setDescription(props.location.backlog.description)
        }
    }, [props.location.action, props.location.backlog, backlog.id])

    const updateBacklog = () => {
        fetch(BASE_URL + `/products/${productId}/sprints/${backlog.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                id: parseInt(backlog.id),
                description: description,
                productId: parseInt(productId),
                startTime: startDate,
                endTime: endDate
            })
        })
        .then(response => {
            if (response.ok) {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    const saveBacklog = () => {
        fetch(BASE_URL + `/products/${productId}/sprints`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                description: description,
                productId: parseInt(productId),
                startTime: startDate,
                endTime: endDate
            })
        })
        .then(response => {
            if (response.ok) {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(endDate < startDate) {
            return
        }

        if (action === "update") {
            updateBacklog()
        }
        else {
            saveBacklog()
        }
    }

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <AddEditBacklogComponent
                startDate = {startDate}
                setStartDate = {setStartDate} 
                endDate = {endDate}
                setEndDate = {setEndDate}
                description = {description}
                setDescription = {setDescription}
                handleSubmit = {handleSubmit}
                success = {success}
            />
        </div>
    )
}

export default AddEditBacklogContainer