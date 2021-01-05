import {useAuth} from '../context/auth'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import AddEditItemComponent from './AddEditItemComponent'
import NavigationContainer from './NavigationContainer'

const AddEditItemContainer = (props) => {
    var { id } = useParams()
    const {authToken} = useAuth()
    const [logOut, setLogOut] = useState()
    const token = jwt(authToken)

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <AddEditItemComponent
                id = {id} 
            />
        </div>
    )
}

export default AddEditItemContainer