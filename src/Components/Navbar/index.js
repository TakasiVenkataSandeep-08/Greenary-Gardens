import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Hidden } from '@material-ui/core'
import useStyles from './style'
import { Link } from 'react-router-dom'
import SideBar from '../Sidebar'
import {NavbarDetails} from '../../Constants/navbarDetails';
import {logoutUser} from '../../services/firebase'

export default function Navbar({
  authFinder
}) {
  const classes = useStyles()
  const navbarDetails = NavbarDetails(authFinder);
  async function handleUserLogoutclick(){
    await logoutUser()
    alert("loggedout successfully!")
  }
  return (
   
    <div className={classes.root}>
    
      <AppBar className={classes.navbar} position='fixed'>
      
        <Toolbar>
        
          <Typography variant='h5'  className={classes.title}>
            Greenary Gardens
          </Typography>
        
          <Hidden only={['sm', 'xs']}>
            {navbarDetails.map((detail, index) => {
              if (!detail.isButton) {
               console.log(index)
                return (<><Link
                  key={index}
                  to={detail.to}
                  className={detail.isLastLink ? classes.lastLink : classes.link}
                >
                
                  <Typography variant='subtitle1' color='inherit'>
                    {detail.name}
                  </Typography>
                </Link>
                  {index === 5 && (<a className={classes.link} href="tel:9989619954"><Typography variant='subtitle1' color='inherit'> Contact: 9989619954
                  </Typography></a>)}
                  </>)
              }
              
              else {
                console.log(index)
                return (
                  <Link
                  key={index}
                  to={detail.to}
                  className={detail.isLastLink ? classes.signupLink:classes.link}
                  style={
                    detail.authFinder ? { display: 'none' } : { display: 'block' }
                  }
                >
               
                  <Button
                    color={detail.to==='/'?'secondary':'primary'}
                    className={classes.margin}
                    variant='contained'
                    {...(detail.to==='/' && {onClick:handleUserLogoutclick})}
                  >
                    {detail.name}
                  </Button> 
                </Link>
                )
              }
            })}
            
            </Hidden>
        
          <Hidden  only={['lg', 'xl']}>
          
            <SideBar authFinder={authFinder} logout={handleUserLogoutclick} />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}
