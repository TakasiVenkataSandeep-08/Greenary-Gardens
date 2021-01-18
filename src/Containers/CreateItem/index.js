import React from 'react'
import {getSingleDocument} from '../../services/firebase'
import Loader from '../../Components/Loader'
import { Typography } from '@material-ui/core'
import CommonItemForm from '../../Components/CommonItemForm'
import {useForm} from 'react-hook-form'
import {uploadImage,addDocument} from '../../services/firebase'

function Index({
    loggedinUser,
    match,
}) {
    const collectionName = match.params.collectionName
    const [loading, setLoading] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false)
    const [buttonLoading,setButtonLoading] = React.useState(false)
    const {register,handleSubmit,errors} = useForm()
    React.useEffect(() => {
        var mounted = true
        async function initializeCreateItem() {
            setLoading(true)
            if (Object.keys(loggedinUser).length !== 0) {
                const isAdminResponse = await getSingleDocument('users', loggedinUser.id)
                if (isAdminResponse.isAdmin) {
                    setIsAdmin(true)
                }
            }
                setLoading(false)
        }
        
            initializeCreateItem()
        
        return () => { mounted = false }
    }, [])

    const formData = [
        {
            name: collectionName==="pots"||collectionName==="bowls"?"type":"name",
            error: errors.type,
            helperText: errors.type ? errors.type.message : null,
            type:"text"
        },
        {
             name: "price",
            error: errors.price,
            helperText: errors.price ? errors.price.message : null,
            type:"number"
        }   
    ]
    if (collectionName === "pots" || collectionName === "bowls") {
        formData.push({
                    name: "color",
                    error: errors.color,
                    helperText: errors.color ? errors.color.message : null,
                    type:"text"
                })
    }
    
    const createDocument = async(data) => {
        setButtonLoading(true)
        if (data.image.length !== 0) {
            let url = await uploadImage(collectionName,new Date(),data.image[0])
            delete data.image
            data.price = parseInt(data.price)
            data.imageUrl = url
            await addDocument(collectionName,data)
            setButtonLoading(false)
            alert(`${collectionName.slice(0,-1)} added successfully!`)
            
        }
        else {
            setButtonLoading(false)
            alert("please select an image!")
        }
    }

    if (!loading) {
        if (isAdmin) {
            return (
                <CommonItemForm collectionName={collectionName} loading={buttonLoading} register={register} handleFunction={handleSubmit(createDocument)} formData={formData} />
            )
        }
        else {
            return (<center><Typography component="h1" variant="h4" color="secondary">You have no access to this page</Typography></center>)
        }
    }
    else {
       return  <center><Loader/></center>
    }
}

export default Index
