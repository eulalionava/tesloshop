import NextLink from 'next/link';

import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';


const productsCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props{
    editable?:boolean
}

export const CartList:FC<Props> = ({editable=false})=>{
    const { cart,updatedCartQuatity } = useContext(CartContext);

    const onNewCartQuantityValue = (product:ICartProduct,newQuantityValue:number)=>{
        product.quantity = newQuantityValue;
        updatedCartQuatity(product);
    }

   return(
       <>
        {
            cart.map(product=>(
                <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
                    <Grid item xs={3}>
                        <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                            <CardActionArea>
                                <CardMedia
                                    image={`/products/${product.image}`}
                                    component='img'
                                    sx={{borderRadius:'5px'}}
                                />
                            </CardActionArea>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{product.title}</Typography>
                            <Typography variant='body1'><strong>{product.size}</strong></Typography>
                            {
                                editable
                                    ?(
                                        <ItemCounter 
                                            currentValue={product.quantity}
                                            maxValue={10} 
                                            updatedQuantity={(value)=>onNewCartQuantityValue(product,value) }/>
                                    ) 
                                    : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'productos':'producto'}</Typography> 
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                        {
                            editable && (
                                <Button variant='text' color='secondary'>
                                    Remover
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            ))   
        }
       </>
   )
}
