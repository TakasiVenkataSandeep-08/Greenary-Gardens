import React from 'react'
import Plants from '../Plants'
function index({
    loggedinUser
}) {
    return (
        <Plants loggedinUser={loggedinUser} collectionName={"seeds"}/>
    )
}

export default index