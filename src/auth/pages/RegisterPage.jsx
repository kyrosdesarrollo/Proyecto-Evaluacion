import React , { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert,Grid, TextField, Button }  from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formData = 
  {
    email: '',
    password: '',
    displayName: ''
   } ;

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 3, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setformSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData, formValidations );
 
  const onSubmit =(event)=>{
    event.preventDefault();
    setformSubmitted(true);
    
    if(!isFormValid) return;
    dispatch( startCreatingUserWithEmailPassword(formState) );

  }

  return (
    <>
    <AuthLayout title = 'Registro de cuenta'>
            <form onSubmit = { onSubmit } className='animate__animated animate__fadeIn animate__faster'>
                 <Grid container>
                         <Grid item 
                              xs={12} sx= {{ mt:2 }}>
                            <TextField
                              label= "Nombre Completo"
                              type="text"
                              placeholder="Ingresar Nombre Completo "
                              fullWidth
                              name="displayName"
                              value= { displayName }
                              onChange= { onInputChange }
                              error= { !!displayNameValid && formSubmitted }
                              helperText= { displayNameValid }
                              />
                        </Grid>

                        <Grid item 
                              xs={12} sx= {{ mt:2 }}>
                            <TextField
                              label= "Correo"
                              type="email"
                              placeholder="Ingresar correo "
                              fullWidth
                              name="email"
                              value= { email }
                              onChange= { onInputChange }
                              error= { !!emailValid && formSubmitted }
                              helperText= { emailValid }
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
                              value= { password }
                              onChange= { onInputChange }
                              error= { !!passwordValid && formSubmitted }
                              helperText= { passwordValid }
                             
                              />
                        </Grid>
                        {/* <Grid item 
                              xs={12} sx= {{ mt:2 }}>
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={options}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="Perfil" />}
                             
                            />
                      </Grid> */}
                    <Grid container spacing= { 2 } sx= {{ mb:2 , mt: 2}}>
                            <Grid item xs={12}  
                                  display = { !!errorMessage ? '': 'none' } >
                                          <Alert severity='error'> { errorMessage }</Alert>                             
                            </Grid>
                              <Grid item xs={12}  >
                                  <Button 
                                      
                                      disabled= { isCheckingAuthentication }
                                      type = "submit"
                                      variant='contained' 
                                      fullWidth>
                                    Crear usuario
                                  </Button>
                              </Grid>

                             
                        
                    </Grid>


                 {/* <Grid container direction='row' justifyContent='end'>
                   <Typography sx={{ mr:1 }}> ¿Ya tienes una cuenta?</Typography>
                   <Link  component= { RouterLink }  color='inherit' to = "/auth/login">
                       Ingresar
                   </Link>
                 </Grid> */}


                 </Grid>
              </form>
     </AuthLayout>
    
    </>
  
  )
}
