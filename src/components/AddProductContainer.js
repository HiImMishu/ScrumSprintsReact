import AddProductComponent from './AddProductComponent'
import NavigationContainer from './NavigationContainer'
import {useState} from 'react'

const AddProductContainer = () => {
    const [logOut, setLogOut] = useState()

    return (
        <div>
            <NavigationContainer 
                logOut = {logOut}
                setLogOut = {setLogOut}
            />
            <AddProductComponent />
        </div>
    )
}

export default AddProductContainer