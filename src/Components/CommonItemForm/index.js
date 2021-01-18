import { Button, CircularProgress, CssBaseline, Grid, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import {textFormValidator,numberValidator} from '../../FormValidators/FormValidator'
function Index({
    handleFunction,
    register,
    formData,
    loading,
  collectionName,
    item
}) {
    
    const classes = useStyles()
    return (
        <Grid style={{padding:"20px"}}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography className={classes.heading} color="primary" component="h1" variant="h5">
            Add New {collectionName.slice(0,-1)}
          </Typography>
          <form className={classes.form} onSubmit={handleFunction}>
            <Grid container spacing={2}>
                        {formData.map((detail) => {
                            console.log("name",detail)
                            return <Grid item xs={12} >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type={detail.name === "price"?"number":"text"}
                                    label={`Enter product ${detail.name}*`}
                                    name={detail.name}
                                    defaultValue={detail.value?detail.value:''}
                                    autoComplete="off"
                                    inputRef={register(detail.name === "price"?numberValidator():textFormValidator())}
                                    error={detail.error}
                                    helperText={detail.helperText}
                                />
                                
                            </Grid>
                        })}
                        <Grid item xs={12} >
                        <Typography component="h5" variant="h6">select image</Typography>
                                    <input
                                    accept="image/*"
                                    className={classes.input}
                                    multiple
                                    type="file"
                                    name="image"
                                    ref={register}
                            />
                {item && <List style={{ marginLeft: 0 } }>
                  <ListItem>
                    <Link href={item.imageUrl} target="_blank">{collectionName.slice(0,-1)+' image'}</Link>
                  </ListItem>
                </List>}
                            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
            >
               <CircularProgress color="primary" size="22px" className={classes.loading}  style={loading?{display:"block"}:{display:"none"}}/>
              save
            </Button>
          </form>
        </div>
      </Grid>
    )
}

export default Index
