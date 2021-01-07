import NavigationContainer from './NavigationContainer'
import BacklogComponent from './BacklogComponent'
import {useState, useEffect} from 'react'
import {productModel} from '../models/ProductModel'
import {useParams} from 'react-router-dom'
import {useAuth} from '../context/auth'
import BASE_URL from '../constants'
import jwt from 'jwt-decode'

const BacklogContainer = (props) => {
    const [logOut, setLogOut] = useState()
    const [product, setProduct] = useState(productModel)
    const [backlog, setBacklog] = useState({
        description: "",
        endTime: "",
        id: null,
        startTime: ""
    })
    var {backlogId} = useParams("backlogId")
    const {authToken} = useAuth()
    const token = jwt(authToken)

    useEffect(() => {
        if (props.location.product) {
            setProduct(props.location.product)
        }

        if (props.location.product) {
            setBacklog(props.location.product.backlogs.filter(b =>parseInt(b.id) === parseInt(backlogId))[0])
        }
    }, [props.location.product, backlogId])

    const updateItem = (item) => {
        fetch(BASE_URL + `/products/${product.id}/items/${item.itemId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                itemId: parseInt(item.itemId),
                productId: parseInt(product.id),
                description: item.description,
                status: item.status,
                sprintId: item.status !== "Added" ? parseInt(backlog.id) : -1,
                modifiedBy: parseInt(token.sub)
            })
        })
        .then(response => {
            if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    const onDragEnd = (result) => { 
        const {destination, source, draggableId} = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (destination.droppableId !== source.droppableId) {
            setProduct(prevProduct => ({
                ...prevProduct,
                "productItems": prevProduct.productItems.slice().map(i => {
                    if (i.status === source.droppableId && parseInt(i.itemId) === parseInt(draggableId)) {
                        i.status = destination.droppableId
                        i.sprint = backlog
                        i.modifiedBy = {
                            id: token.sub,
                            firstName: token.family_name,
                            lastName: token.given_name,
                            email: token.email
                        }
                        updateItem(i)
                    }
                    return i
                })
            }))
        }
    }

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <BacklogComponent
                {...product}
                backlog = {backlog}
                onDragEnd = {onDragEnd}
            />
        </div>
    )
}

export default BacklogContainer