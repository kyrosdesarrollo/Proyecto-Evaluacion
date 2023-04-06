	import React , { useMemo } from 'react'
  import { useDispatch, useSelector } from 'react-redux';
  import { Link as RouterLink } from 'react-router-dom';
	import { Alert, Grid, TextField, Typography, Button, Link, Box }  from '@mui/material'
  import { Google } from '@mui/icons-material'
  import { AuthLayout } from '../layout/AuthLayout';
  import { useForm } from '../../hooks';
  import {  starLoginWithEmailPassword, startGoogleSignIn } from '../../store/auth';
  

  import Logo from '../../assets/image/Logo.png'


	const formData = 
    {
      email: '',
      password: ''
    }
  

	export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth);
  const dispatch = useDispatch(); 

    const { email, password, onInputChange }  = useForm( formData);

    const isAuthenticating = useMemo( () => status === 'checking', [status]);


    const onSubmit = (event) => {
      event.preventDefault();
      dispatch (starLoginWithEmailPassword({ email, password }));
    }

    const onGoogleSignIn = () =>{
      // console.log('onGoogleSignIn');
      dispatch ( startGoogleSignIn() );
    }


	  return (
	    <>
      
      <AuthLayout   >
      <Typography variant="h4" sx={{ textAlign: 'center' }}>Inicio de Sesión</Typography>

      
      <Box sx={{ display: 'flex' ,justifyContent: 'center', alignItems: 'center'}} >
          <Box>
                <img  src={Logo} sx={"Center"}/>
          </Box>
      </Box>
              <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
	                 <Grid container>
                          <Grid item 
                                xs={12} sx= {{ mt:2 }}>
                              <TextField
                                label= "Correo"
                                type="email"
                                placeholder="Ingresar correo "
                                fullWidth
                                name= "email"
                                value={email}
                                onChange = {onInputChange}
                                />
                          </Grid>
	
                          <Grid item 
                                xs={12} sx= {{ mt:2 }}>
                            <TextField
                                label= "Contraseña"
                                type="password"
                                placeholder="Ingresar contraseña"
                                fullWidth
                                name="password"
                                value={password}
                                onChange={onInputChange}
                                />
                          </Grid>

                      <Grid container
                       display = { !!errorMessage ? '': 'none' }
                       sx= {{ mt:2 }}>
                          <Grid
                             item
                             xs={ 12 }
                             >
                            <Alert severity='error'> El nombre de usuario o contraseña es incorrecto </Alert>
                          </Grid>

                      </Grid>
                      <Grid container spacing= { 2 } sx= {{ mb:2 , mt: 2}}>

                                <Grid item xs={12} sm={ 6 } >
                                    <Button 
                                        disabled = { isAuthenticating }
                                        type = "submit"
                                        variant='contained' 
                                        fullWidth
                                        >
                                      Login
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={ 6 } >
                                    <Button 
                                        disabled = { isAuthenticating }
                                        onClick= { onGoogleSignIn }
                                        variant='contained' 
                                        fullWidth>
                                    <Google />
                                      <Typography sx={{ml:1}} >Google</Typography>
                                    </Button>
                                </Grid>
                          
                      </Grid>


                   {/* <Grid container direction='row' justifyContent='end'>
                     <Link  component= { RouterLink }  color='inherit' to = "/auth/register">
                          Crear una cuenta
                     </Link>
                   </Grid> */}

	
	                 </Grid>
	              </form>
	
       </AuthLayout>
	    </>
	  
	  )
}
