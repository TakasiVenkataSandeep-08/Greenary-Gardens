import React from 'react'
import { useForm } from 'react-hook-form'
import {
  passwordFormValidator,
  emailFormValidator,
  confirmPasswordValidator,
  textFormValidator
} from '../../FormValidators/FormValidator'
import CommonForm from '../../Components/CommonForm'
import {addUser} from '../../services/firebase'
export default function Signup({
  setSnackBar,
  history
}) {
  const [loading,setLoading] = React.useState(false)
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: 'onChange'
  })
  const SignupFormDetails=[
    {
    name:"email",
    type:"email",
    label:"Email Address",
    validator:register(emailFormValidator()),
    error:errors.email,
    helperText:errors.email ? errors.email.message : null
    },
  
    {
    name:"password",
    label:"Password",
    type:"password",
    validator:register(passwordFormValidator()),
    error:errors.password,
    helperText:errors.password ? errors.password.message : null
    },
    {
    name:"confirmPassword",
    label:"confirm Password",
    type:"password",
    validator:register(confirmPasswordValidator(getValues)),
    error:errors.confirmPassword,
    helperText:errors.confirmPassword ? errors.confirmPassword.message : null
    }
  ]
  const handleSignupSubmit = async (data) => {
     setLoading(true)
    const email = data.email
    const password = data.password
    await addUser(email, password)
    alert("user created successfully!")
    setLoading(false)
    history.push("/login");
  }
  return (
    <CommonForm submitFunction={handleSubmit(handleSignupSubmit)} isLoading={loading} submitButtonName={"signup"} formHeading={"Signup"} formDetails={SignupFormDetails} />
  )
}
