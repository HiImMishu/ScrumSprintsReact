import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import {useAuth} from '../context/auth.js'
import LoginComponent from './LoginComponent'
import BASE_URL from '../constants'

const LoginContainer = () => {
    const [email, setEmail] = useState("")
    const [password, setPaswword] = useState("")
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const {authToken, setAuthToken} = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(BASE_URL + "/users/token", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            setPasswordError(false)
            setEmailError(false)

            if (response.ok) {
                return response.json()
            }
            else if (response.status === 404) {
                setEmailError(true)

            }
            else if (response.status === 401) {
                setPasswordError(true)
            }
            else {
                throw Error("Error occured.")
            }
        })
        .then(data => {
            if (data) {
                setAuthToken(data.access_token)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    if (authToken) 
        return <Redirect to="/" />

    return <LoginComponent 
        email = {email}
        password = {password}
        emailError = {emailError}
        passwordError = {passwordError} 
        setEmail = {setEmail}
        setPassword = {setPaswword}
        handleSubmit = {handleSubmit}
    />
}

export default LoginContainer