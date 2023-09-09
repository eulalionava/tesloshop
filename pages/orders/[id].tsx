import NextLink from 'next/link';
import { Link,Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';


const OrderPage = ()=>{
   return(
       <ShopLayout title="Resumen de la orden" pageDescription="Resumen de orden">
        <Typography variant="h1" component='h1'>Orden</Typography>

        {/* <Chip
            sx={{my:2}}
            label='Pendiente de pago'
            variant='outlined'
            color='error'
            icon={<CreditCardOutlined/>}
        /> */}
        <Chip
            sx={{my:2}}
            label='Orden ya fue pagada'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlined/>}
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen (3 productos)</Typography>
                        <Divider sx={{my:1}}/>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/adress' passHref legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography >Eulalio Nava</Typography>
                        <Typography >2323 lugar</Typography>
                        <Typography >Calle</Typography>
                        <Typography >Puebla</Typography>
                        <Typography >+1 5568958564</Typography>

                        <Divider sx={{my:1}}/>

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <OrderSummary/>

                        <Box sx={{mt:3}}>
                            {/* todo */}
                            <h1>Pagar</h1>
                        </Box>
                        <Chip
                            sx={{my:2}}
                            label='Orden ya fue pagada'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined/>}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
       </ShopLayout>
   )
}


export default OrderPage;