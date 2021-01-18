import React from 'react'
import { useForm } from 'react-hook-form'
import CommonForm from '../../Components/CommonForm'
import {
  emailFormValidator,
  passwordFormValidator,
} from '../../FormValidators/FormValidator'
import {loginUser} from '../../services/firebase'

export default function Login({
  setSnackBar,
  location,
  history
}) {
  const [loading, setLoading] = React.useState(false)
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
  })
  const loginFormDetails = [
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      error: errors.email,
      validator: register(emailFormValidator()),
      helperText: errors.email ? errors.email.message : null,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validator: register(passwordFormValidator()),
      error: errors.password,
      helperText: errors.password ? errors.password.message : null,
    },
  ]
  const handleLogin = async (data) => {
    setLoading(true)
    const email = data.email
    const password = data.password
    
    await loginUser(email, password)
    alert("logged in successfully!")
    setLoading(false)
    history.push('/')
    }

  if (location.verified) {
    setSnackBar(location.verified)
  }
  return (
    <CommonForm
      submitFunction={handleSubmit(handleLogin)}
      isLoading={loading}
      submitButtonName={'login'}
      formHeading={'Login'}
      formDetails={loginFormDetails}
    />
  )
}
