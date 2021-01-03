import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import RegisterComponent from './RegisterComponent'
import BASE_URL from '../constants'

const RegisterContainer = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [registerSuccess, setRegisterSuccess] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        setEmailError(false)

        if (passwordError) {
            return
        }

        fetch(BASE_URL + "/users", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        })
        .then(response => {
            setEmailError(false)

            if (response.ok) {
                setRegisterSuccess(true)
            }
            else if (response.status === 409) {
                setEmailError(true)
            }
            else {
                throw Error("Error status: " + response.status)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const comparePasswords = () => {
        if (password.length > 0 && (password !== passwordConfirm)) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
    } 

    if (registerSuccess) {
        return <Redirect to="/login" />
    }

    return (
        <RegisterComponent
            firstName = {firstName}
            setFirstName = {setFirstName}
            lastName = {lastName}
            setLastName = {setLastName}
            email = {email}
            setEmail = {setEmail}
            password = {password}
            setPassword = {setPassword}
            passwordConfirm = {passwordConfirm}
            setPasswordConfirm = {setPasswordConfirm}
            emailError = {emailError}
            passwordError = {passwordError}
            handleSubmit = {handleSubmit}
            comparePasswords = {comparePasswords} 
        />
    )
}

export default RegisterContainer