import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import MatchCard from '../../Components/DisplayCard'
import Loader from '../../Components/Loader'
import useStyles from './style'
import { getAllDocuments, getSingleDocument,deleteDocument } from '../../services/firebase'
import {Link} from 'react-router-dom'
export default function Index({
    loggedinUser,
    externalData,
    collectionName='plants',
    ...rest
}){
    const classes = useStyles()
    const [filteredData, setFilteredData] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [snackBar, setSnackBar] = React.useState({
        value: false,
        message: '',
        type: '',
    })
        const [type, setType] = React.useState('all')
        const [cost,setCost] = React.useState('all')

    
    useEffect(() => {
        var mounted = true
        async function getPlants() {
            setLoading(true)
            if (Object.keys(loggedinUser).length !== 0) {
                const isAdminResponse = await getSingleDocument('users', loggedinUser.id)
                if (isAdminResponse.isAdmin) {
                    setIsAdmin(true)
                }
            }
                const response = await getAllDocuments(collectionName)
                if (mounted) {
                    setFilteredData(response)
                }
                setLoading(false)
        }
        
            getPlants()
        
        return () => { mounted = false }
    },[])

    const handleDeleteItem = async(id,imageUrl) => {
    await deleteDocument(collectionName,id,imageUrl)
        setFilteredData((prevData) => {
            const newState = prevData.filter(item => item.id !== id)
            return newState
    })
    }
    
 
    if (!loading) {
        if (filteredData.length !== 0) {
            
            return (
                <div className={classes.root}>
                    {isAdmin && <Link style={{textDecoration:"none"}} to={`/create/${collectionName}`}><Button fullWidth className={classes.addButton} variant="outlined" color="primary">Add {collectionName.slice(0, -1)}</Button></Link>}
                    <Grid container spacing={2}>
                        {filteredData.map((item,index) => {
                            return (
                                <Grid
                                    container
                                    item
                                    key={index}
                                    xs={12}
                                    sm={6}
                                    lg={3}
                                    spacing={3}
                                    className={classes.wrapper}
                                >
                                    <MatchCard
                                        handleDeteItem={handleDeleteItem}
                                        isAdmin={isAdmin}
                                        key={item.id}
                                        itemDetails={item}
                                        loggedinUser={loggedinUser}
                                        history={rest.history}
                                        collectionName={collectionName}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            )
        } else {
            return (
                <Typography
                    component='h1'
                    color='secondary'
                    variant='h4'
                    align='center'
                >
                    No Items To show
                </Typography>
            )
        }
    } else {
        return (
            <Typography align='center'>
                <Loader />
            </Typography>
        )
    }
}

