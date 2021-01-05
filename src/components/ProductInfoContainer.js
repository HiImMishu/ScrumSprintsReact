import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useAuth} from '../context/auth'
import jwt from 'jwt-decode'
import NavigationContainer from './NavigationContainer'
import ProductInfoComponent from './ProductInfoComponent'
import BASE_URL from '../constants'
import {productModel} from '../models/ProductModel'

const ProductInfoContainer = () => {
    const [logOut, setLogOut] = useState()
    const {authToken} = useAuth()
    const [refreshProduct, setRefreshProduct] = useState(true)
    const token = jwt(authToken)
    var { id } = useParams()
    const [product, setProduct] = useState(productModel)

    useEffect(() => {
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
    }, [refreshProduct, setRefreshProduct, authToken, id])

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <ProductInfoComponent
                {...product} 
            />
        </div>
    )
}

export default ProductInfoContainer