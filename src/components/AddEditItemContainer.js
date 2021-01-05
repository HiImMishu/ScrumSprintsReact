import {useAuth} from '../context/auth'
import {useEffect, useState} from 'react'
import AddEditItemComponent from './AddEditItemComponent'
import NavigationContainer from './NavigationContainer'
import { itemModel } from '../models/ProductModel'
import BASE_URL from '../constants'
import {useParams} from 'react-router-dom'

const AddEditItemContainer = (props) => {
    const {authToken} = useAuth()
    const [logOut, setLogOut] = useState()
    const [item, setItem] = useState(itemModel)
    const [action, setAction] = useState("add")
    const [success, setSuccess] = useState(false)
    var {productId} = useParams("productId")

    useEffect(() => {
        if (!item.itemId && props.location.item) {
            setItem(props.location.item)
            setAction(props.location.action)
        }
    }, [item.itemId, props.location.item, props.location.action, setItem, setAction])

    const handleChange = (event) => {
        const {name, value} = event.target
        setItem((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const updateItem = () => {
        fetch(BASE_URL + `/products/${productId}/items/${item.itemId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                itemId: parseInt(item.itemId),
                description: item.description,
                status: item.status,
                productId: parseInt(productId),
                sprintId: item.sprint ? parseInt(item.sprint.id) : null,
                modifiedBy: item.modifiedBy ? parseInt(item.modifiedBy.id) : null
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

    const saveItem = () => {
        fetch(BASE_URL + `/products/${productId}/items`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                description: item.description,
                productId: parseInt(productId)
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

        if (action === "update") {
            updateItem()
        }
        else {
            saveItem()
        }
    }

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <AddEditItemComponent
                {...item} 
                handleChange = {handleChange}
                handleSubmit = {handleSubmit}
                success = {success}
            />
        </div>
    )
}

export default AddEditItemContainer