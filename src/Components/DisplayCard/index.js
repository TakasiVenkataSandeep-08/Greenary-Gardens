import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Snackbar from '../SnackBar'
import { Link } from 'react-router-dom'
import useStyles from './style'
import { Button, CardMedia, Typography } from '@material-ui/core'


export default function MediaCard({ handleDeteItem,isAdmin, itemDetails,collectionName, loggedinUser, history }) {
 
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: '',
    type: '',
  })
  const handleCloseSnakeBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBar({ value: false, message: '', type: '' })
  }
console.log(itemDetails)
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="plants"
          height="200"
          image={itemDetails.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {itemDetails.name?itemDetails.name:itemDetails.type} {collectionName==="giftPlants"?'plant':collectionName.slice(0,-1)} {itemDetails.color ? `(${itemDetails.color})` : itemDetails.type ? `(${itemDetails.type})` : null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: &#8377; {itemDetails.price} {collectionName==="seeds"?' / kg':' / piece'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardBottom}>
        {!isAdmin ? (<a className={classes.link} href="tel:9989619954"><Typography variant='subtitle1' color='inherit'> Contact us: 9989619954
                  </Typography></a>) : (<>
            <Link style={{textDecoration:"none"}} to={`/edit/${collectionName}/${itemDetails.id}`}><Button variant="outlined" size="small" color="primary">
              Edit
        </Button>
              </Link>
            <Button onClick={()=>handleDeteItem(itemDetails.id,itemDetails.imageUrl)} variant="outlined" size="small" color="secondary">
              Delete
        </Button>
            </>
          )}
      </CardActions>
    </Card>
  )
}