import NextLink from 'next/link';

import { Box, Button, Grid, TextField, Typography,Link, Chip } from "@mui/material"
import { AuthLayout } from "../../components/layouts"
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { useContext, useState } from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';

type FormData = {
    name:string,
    email:string,
    password:string
}


const RegisterPage = ()=>{
    const router = useRouter();
    const { registerUser } = useContext(AuthContext);
    const { register,handleSubmit,watch,formState: { errors } } = useForm<FormData>();
    const [showError,setShowError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const onRegisterForm = async({name,email,password}:FormData)=>{
        setShowError(false);

        const { hasError,message} = await registerUser(name,email,password);

        if(hasError){
            setShowError(true);
            setErrorMessage(message!)
            setTimeout(()=>setShowError(false),3000);
            return
        }

        router.replace('/')
    }

    return(
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{width:350,padding:'10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{mb:2}}>
                            <Typography variant="h1" component='h1'>Crear Cuenta</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color='error'
                                icon={<ErrorOutline/>}
                                className='fadeIn'
                                sx={{display:showError?'flex':'none'}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                label="Nombre" 
                                variant="filled" 
                                fullWidth
                                {...register('name',{
                                    required:'Este campo es requerido',
                                    minLength:{value:3,message:'Minimo 3 caracteres'}
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                type='email'
                                label="Correo" 
                                variant="filled" 
                                fullWidth
                                {...register('email',{
                                    required:'Este campo es requerido',
                                    validate:validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Contraseña" 
                                type="password" 
                                variant="filled" 
                                fullWidth
                                {...register('password',{
                                    required:'Este campo es requerido',
                                    minLength:{value:6,message:'Minimo 6 caracteres'}
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type='submit' color="secondary" className="circular-btn" size="large" fullWidth>
                                Crear Cuenta
                            </Button>
                        </Grid>
                        
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={router.query.p ?`/auth/login?p=${router.query.p}`:'/auth/login'}
                                passHref legacyBehavior
                            >
                                <Link underline='always'>
                                    ¿Ya tengo una cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;
