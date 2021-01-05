import AddProductComponent from './AddProductComponent'
import NavigationContainer from './NavigationContainer'
import {useEffect, useState} from 'react'
import {useAuth} from '../context/auth'
import jwt from 'jwt-decode'
import {fetchUser, userModel} from '../service/UserService'
import BASE_URL from '../constants'

const AddProductContainer = () => {
    const [logOut, setLogOut] = useState()
    const {authToken} = useAuth()
    const token = jwt(authToken)
    const [userData, setUserData] = useState(userModel) 
    const [loadUser, setLoadUser] = useState(true)
    const [team, setTeam] = useState("") 
    const [productName, setProductName] = useState("")
    const [addSuccess, setAddSuccess] = useState(false)

    useEffect(() => {
        if (loadUser) {
            setLoadUser(false)
            fetchUser(token.sub, authToken, setLogOut, setUserData)
        }
    }, [loadUser, setLoadUser, token.sub, authToken, setLogOut, setUserData])

    const addProduct = (event) => {
        event.preventDefault()
        
        fetch(BASE_URL + "/products/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            body: JSON.stringify({
                name: productName,
                ownerId: parseInt(token.sub),
                devTeam: parseInt(team)
            })
        })
        .then(response => {
            if (response.status === 201) {
                setLoadUser(true)
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
            <AddProductComponent
                {...userData}
                team = {team}
                setTeam = {setTeam}
                productName = {productName}
                setProductName = {setProductName} 
                addProduct = {addProduct}
                addSuccess = {addSuccess}
            />
        </div>
    )
}

export default AddProductContainer