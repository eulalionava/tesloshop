import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react'

import { Box, Button, Grid, TextField, Typography,Link, Chip } from "@mui/material"
import { AuthLayout } from "../../components/layouts"
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

type FormData = {
    email:string,
    password:string
}

const LoginPage = ()=>{
    const router = useRouter();
    const { loginUser } = useContext(AuthContext);
    const {register,handleSubmit,watch,formState: { errors } } = useForm<FormData>()
    const [showError,setShowError] = useState(false);

    const onLoginUser = async({email,password}:FormData)=>{
        
        setShowError(false);
        
        // const isValidLogin = await loginUser(email,password);

        // if(!isValidLogin){
        //     setShowError(true);
        //     setTimeout(()=>setShowError(false),3000);
        //     return;
        // }
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination);

        await signIn('credentials',{email,password});



    }

    return(
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{width:350,padding:'10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{mb:2}}>
                            <Typography variant="h1" component='h1'>Iniciar Sesion</Typography>
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
                                type='email' 
                                label="Correo" 
                                variant="filled" 
                                autoComplete='false' 
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
                                    minLength:{value:6,message:'Mínimo 6 caracteres'}
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                color="secondary" 
                                className="circular-btn" 
                                size="large" 
                                fullWidth
                                type='submit'
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={router.query.p ?`/auth/register?p=${router.query.p}`:'/auth/register'} passHref legacyBehavior>
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                        

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export const getServerSidePros:GetServerSideProps = async({req,query})=>{

    const session = await getSession({req});
    console.log('sesionnnn',{session});

    const { p = '/'} = query;

    if(session){
        return {
            redirect:{
                destination:p.toString(),
                permanent:false
            }
        }
    }

    return {
        props:{

        }
    }
}

export default LoginPage;
