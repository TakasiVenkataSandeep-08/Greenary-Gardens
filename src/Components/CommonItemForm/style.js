import {makeStyles} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100vw',
        marginTop: theme.spacing(3),
      padding:20
    },
    submit: {
      margin: theme.spacing(4, 0, 0),
    },
    heading:{
      color:"teal",
      fontWeight:"900",
      display:"flex",
      alignSelf:"flex-start"
    },
    avatar:{
      padding:25,
    },
    input:{
      marginTop:theme.spacing(2),
        color:"#4267B2",
        outline:"none"
    },
    loading:{
      marginRight:theme.spacing(2),
    }
  }));
  export default useStyles