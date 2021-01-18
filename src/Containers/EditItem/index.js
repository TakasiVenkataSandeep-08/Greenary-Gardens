import React from 'react'
import Loader from '../../Components/Loader'
import { Typography } from '@material-ui/core'
import CommonItemForm from '../../Components/CommonItemForm'
import { useForm } from 'react-hook-form'
import {uploadImage,updateDocument,getSingleDocument} from '../../services/firebase'

function Index({
    loggedinUser,
    match,
    history
}) {
    const collectionName = match.params.collectionName
    const id = match.params.id
    const [loading, setLoading] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false)
    const { register, handleSubmit, errors } = useForm({
        mode:"onChange"
    })
    const [buttonLoading,setButtonLoading] = React.useState(false)
    const [item,setItem] = React.useState({})
    React.useEffect(() => {
        let mounted = true
        async function initializeEditItem() {
            setLoading(true)
            if (Object.keys(loggedinUser).length !== 0) {
                const isAdminResponse = await getSingleDocument('users', loggedinUser.id)
                console.log(isAdminResponse)
                if (isAdminResponse.isAdmin) {
                    setIsAdmin(true)
                    const itemData = await getSingleDocument(collectionName, id)
                    setItem(itemData)
                }    
            }
                setLoading(false)
        }
        
            initializeEditItem()
        
        return () => { mounted = false }
    }, [])
    
        const formData = [
        {
            name: collectionName==="pots"||collectionName==="bowls"?"type":"name",
            error: errors.type,
            helperText: errors.type ? errors.type.message : null,
            value: (Object.keys(item)!==0 && (collectionName==="pots"||collectionName==="bowls"))?item.type:item.name,
            type:"text"
            },
        {
             name: "price",
            error: errors.price,
            helperText: errors.price ? errors.price.message : null,
            value: item.price,
            type:"number"
        }   
    ]
    if (collectionName === "pots" || collectionName === "bowls") {
        formData.push({
                    name: "color",
                    error: errors.color,
                    helperText: errors.color ? errors.color.message : null,
            value: item.color,
                    type:"text"
                })
    }

    const updateEditedDocument = async (data) => {
        console.log(data)
        setButtonLoading(true)
    if(data.image.length!==0)
    {
      let url = await uploadImage(collectionName,new Date(),data.image[0])
        delete data.image
        data.price = parseInt(data.price)
            data.imageUrl = url
        await updateDocument(collectionName, id, data)
        setButtonLoading(false)
    }
    else {
        delete data.image
        data.price = parseInt(data.price)
        await updateDocument(collectionName, id, data)
        setButtonLoading(false)
    }
    history.push(`/${collectionName==="giftPlants"?'gitf/plants':collectionName==="plants"?'':collectionName}`)
  }

    if (!loading) {
        if (isAdmin) {
            return (
                <CommonItemForm item={item} collectionName={collectionName} loading={buttonLoading} register={register} handleFunction={handleSubmit(updateEditedDocument)} formData={formData} />
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