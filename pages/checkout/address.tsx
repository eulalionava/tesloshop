import Cookies from 'js-cookie';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { GetServerSideProps } from "next";
import { countries, jwt } from "../../utils";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '../../context';

type FormData = {
    firsName    :string;
    lastName    :string;
    address     :string;
    address2?   :string;
    zip         :string;
    city        :string;
    contry      :string;
    phone       :string;
}
const getAddressFromCookie = ():FormData=>{
    return {
        firsName : Cookies.get('firsName') || '',
        lastName : Cookies.get('lastName') || '',
        address  : Cookies.get('address') || '',
        address2 : Cookies.get('address2') || '',
        zip      : Cookies.get('zip') || '',
        city     : Cookies.get('city') || '',
        contry   : Cookies.get('contry') || '',
        phone    : Cookies.get('phone') || '',
    }
}

const AdressPage = ()=>{
    const router = useRouter();
    const { updateAddress } = useContext(CartContext);
    
    const {register,handleSubmit,watch,formState: { errors } } = useForm<FormData>({
        defaultValues:getAddressFromCookie()
    });

    const onHaddleRevisarPedido = (data:FormData)=>{
        updateAddress(data);
        router.push('/checkout/summary');
    }

    return(
        <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
                <Typography variant="h1">Dirección</Typography>
                <form onSubmit={handleSubmit(onHaddleRevisarPedido)} noValidate>
                    <Grid container spacing={2} sx={{mt:3}}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Nombre' 
                                variant="filled" 
                                fullWidth
                                {...register('firsName',{
                                    required:'Este campo es requerido'
                                })}
                                error={!!errors.firsName}
                                helperText={errors.firsName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Apeelido' 
                                variant="filled" 
                                fullWidth
                                {...register('lastName',{
                                    required:'Este campo es requerido',
                                })}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Dirección' 
                                variant="filled" 
                                fullWidth
                                {...register('address',{
                                    required:'Este campo es requerido',
                                })}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Dirección 2 (opcional)' 
                                variant="filled" 
                                fullWidth
                                {...register('address2')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Código Postal' 
                                variant="filled" 
                                fullWidth
                                {...register('zip',{
                                    required:'Este campo es requerido',
                                })}
                                error={!!errors.zip}
                                helperText={errors.zip?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Ciudad' 
                                variant="filled" 
                                fullWidth
                                {...register('city',{
                                    required:'Este campo es requerido',
                                })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField
                                    select
                                    variant="filled"
                                    label='País'
                                    defaultValue={ Cookies.get('contry') || countries[0].code}
                                    {...register('contry',{
                                        required:'Este campo es requerido',
                                    })}
                                    error={!!errors.contry}
                                    // helperText={errors.city?.message}
                                >
                                    { countries.map(contry=>(
                                        <MenuItem key={contry.code} value={contry.code}>{contry.name}</MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label='Telefono' 
                                variant="filled" 
                                fullWidth
                                {...register('phone',{
                                    required:'Este campo es requerido',
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{mt:5}} display='flex' justifyContent='center'>
                        <Button type="submit" color="secondary" className="circular-btn" size="large">
                            Revisar pedido
                        </Button>
                    </Box>
                </form>
        </ShopLayout>
    )
}


export const getServerSideProps:GetServerSideProps = async({req})=>{

    const { token = ''} = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken(token);
        isValidToken = true;    
    } catch (error) {
        isValidToken = false;
    }

    if(!isValidToken){
        return {
            redirect:{
                destination:'/auth/login?p=/checkout/address',
                permanent:false
            }
        }
    }

    return {
        props:{

        }
    }
}


export default AdressPage;