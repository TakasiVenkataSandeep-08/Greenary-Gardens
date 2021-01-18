import {makeStyles} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    backgroundColor: '#f8f8ff',
    marginTop: theme.spacing(2),
    minHeight: "100vh",
    overflow:'hidden'
    },
    wrapper: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: "center",
    },
    addButton: {
        padding:10
    }
}))
export default useStyles