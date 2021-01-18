import React from 'react';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';


function index({
  isOpen,
  message,
  setIsOpen,
  type
}) {
    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
          return false;
        }
        setIsOpen({value: false,message:'',type:''});
    }
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isOpen}
            onClose={handleCloseSnakeBar}
            autoHideDuration={6000}
          >
            <MuiAlert
              onClose={handleCloseSnakeBar}
              variant='filled'
              style={{backgroundColor: `${type}`}}
            >
              {message}
            </MuiAlert>
          </Snackbar>
    )
}

export default index
