import React from 'react'
import clsx from 'clsx'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {Typography} from '@material-ui/core'
import { Hidden, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './style'
import SuccessButton from '../CustomButtons/success'
import { Link } from 'react-router-dom'
import { purple,deepOrange,lightBlue,green} from '@material-ui/core/colors';
import EcoIcon from '@material-ui/icons/Eco'

export default function SideBar({
  authFinder,
  logout
}) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    right: false
  })
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const list = (anchor) => <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom'
    })}
    role='presentation'
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
      {[{ name: 'Home', to: '/', icon: <EcoIcon className={classes.icon} /> },{ name: 'Pots', to: '/pots', icon: <EcoIcon className={ classes.icon}/>}, { name: 'Gift Plants', to: '/gift/plants',icon:<EcoIcon className={ classes.icon}/> }, { name: 'Bowls', to: '/bowls',icon:<EcoIcon className={ classes.icon}/> }, { name: 'Seeds',to:'/seed',icon:<EcoIcon className={ classes.icon} />}].map((text, index) => (
              <Link key={index} to={text.to} style={{textDecoration:"none",color:"black"}}>
            <ListItem className={classes.linkText} button key={text.name}>
                    <ListItemIcon>{ text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
        </ListItem>
        </Link>
      ))}
    </List>
    <Divider />
    <List>
      {[{name:'Signup',color:green['A400'],hoverColor:green['A200'],to:'/signup',hide:authFinder},{name:'Login',color:lightBlue['A700'],hoverColor:lightBlue['A400'],to:'/login',hide:authFinder},{ name: 'Logout' ,color:deepOrange[500],hoverColor:deepOrange[700],hide:!authFinder}].map((text,index) => (
        text.name !== 'Logout' ?
                  <Link key={index} to={text.to} style={text.hide? {display:"none"}:{display:"block",textDecoration:"none",color:"white"}}>
            <ListItem key={text.name} className={classes.buttonList}>
                <SuccessButton color={text.color} hoverColor={text.hoverColor} text={text.name}/>
            </ListItem>
            </Link>
          :
                  <ListItem key={text.name} className={classes.buttonList} style={text.hide? {display:"none"}:{display:"block",color:"white"}}>
                    <SuccessButton color={text.color} hoverColor={text.hoverColor} text={text.name} onClick={logout} />
        </ListItem>
      ))}
    </List>
    <a className={classes.linkText} style={{textAlign:"center"}} href="tel:9989619954"><Typography variant='subtitle1' color='inherit'> Contact us</Typography></a>
  </div>

  return (
      <>
        <Hidden only={['lg', 'xl', 'md']}><Button onClick={toggleDrawer('right', true)} className={classes.menuButton}>
            <IconButton
          edge='start'

          color='inherit'
          aria-label='menu'
        >
                <MenuIcon />
        </IconButton>
      </Button>
      </Hidden>
        <SwipeableDrawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </>
  )
}
