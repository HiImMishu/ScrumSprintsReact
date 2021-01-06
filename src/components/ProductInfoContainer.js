import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useAuth} from '../context/auth'
import NavigationContainer from './NavigationContainer'
import ProductInfoComponent from './ProductInfoComponent'
import BASE_URL from '../constants'
import {productModel} from '../models/ProductModel'

const ProductInfoContainer = (props) => {
    const [logOut, setLogOut] = useState()
    const {authToken} = useAuth()
    const [refreshProduct, setRefreshProduct] = useState(true)
    var { id } = useParams()
    const [product, setProduct] = useState(productModel)
    const [productName, setProductName] = useState("")
    const [teamId, setTeamId] = useState("")
    const [leadedTeams, setLeadedTeams] = useState([{
        id: null,
        name: "",
        createdAt: null
    }])

    useEffect(() => {
        if (product.name) {
            setProductName(product.name)
        }

        if (product.devTeam?.id) {
            setTeamId(product.devTeam.id)
        }

        if (props.location.teams) {
            setLeadedTeams(props.location.teams)
        }

        if (refreshProduct) {
            setRefreshProduct(false)

            fetch(BASE_URL + "/products/"+id, {
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
    }, [refreshProduct, product.devTeam.id, authToken, id, props.location.teams, product.name])

    const deleteBacklog = (backlogId) => {
        fetch(BASE_URL + `/products/${product.id}/sprints/${backlogId}`, {
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
                setProduct(prevProduct => ({
                    ...prevProduct,
                    "backlogs": prevProduct.backlogs.slice().filter(b => {return b.id !== backlogId})
                }))
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    const deleteItem = (itemId) => {
        fetch(BASE_URL + `/products/${product.id}/items/${itemId}`, {
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
                setProduct(prevProduct => ({
                    ...prevProduct,
                    "productItems": prevProduct.productItems.slice().filter(i => {return i.itemId !== itemId})
                }))
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    const updateTeam = (event) => {
        event.preventDefault()

        if (teamId === -1) {
            return
        }

        fetch(BASE_URL + `/products/${product.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                id: parseInt(product.id),
                Name: productName,
                devTeam: parseInt(teamId)
            })
        })
        .then(response => {
            if (response.ok) {
                setRefreshProduct(true)
            }
            else if (response.status === 401) {
                setLogOut(true)
            }
        })
    }

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <ProductInfoComponent
                {...product} 
                deleteItem = {deleteItem}
                leadedTeams = {leadedTeams}
                updateTeam = {updateTeam}
                productName = {productName}
                setProductName = {setProductName}
                teamId = {teamId}
                setTeamId = {setTeamId}
                deleteBacklog = {deleteBacklog}
            />
        </div>
    )
}

export default ProductInfoContainer