import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    fontFamily: 'Montserrat',
    marginBottom: theme.spacing(9.5),
    },
  title: {
    color: '#f8f8ff',
    fontWeight: 'bolder',
    fontFamily: 'Montserrat',
    marginRight: theme.spacing(4)
  },
  link: {
    marginLeft: theme.spacing(3),
    fontFamily: 'Montserrat',
    textDecoration: "none",
    color: 'white',
  },
  lastLink: {
    margin: "auto",
    textDecoration: "none",
    color: 'white',
  },
  signupLink: {
    marginLeft: "auto",
    textDecoration: "none",
    color: 'white',
  },
  margin: {
    margin: theme.spacing(1),
    textTransform: 'capitalize'
  },
  navbar: {
    backgroundColor: '#2e7d32'
  }
}))
export default useStyles
