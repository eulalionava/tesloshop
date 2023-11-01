import { useRouter } from "next/router";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { initialData } from "../../database/products";


import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { IProduct } from "../../interfaces";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { nextTick } from "process";
import { NextServer } from "next/dist/server/next";
import { dbProducts } from "../../database";
import Product from '../../models/Product';

const product = initialData.products[0];

interface Props{
    product:IProduct
}

const SlugPage:NextPage<Props> = ({product})=>{
   

   return(
       <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <ProductSlideshow
                        images={product.images}
                    />    
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant="h1" component='h1'>{product.title}</Typography>
                        <Typography variant="subtitle1" component='h2'>{`$${product.title}`}</Typography>

                        <Box sx={{my:2}}>
                            <Typography variant="subtitle2">Cantidad</Typography>
                            <ItemCounter/>
                            <SizeSelector 
                                selectedSize={product.sizes[0]} 
                                sizes={product.sizes}
                            />
                        </Box>
                        {
                            (product.inStock > 0) ? (
                                <Button color="secondary" className="circular-btn">
                                    Agregar al carrito
                                </Button>
                            ):(
                                <Chip label='No hay disponibles' color="error" variant="outlined"/>
                            )
                        }


                        <Box sx={{mt:3}}>
                            <Typography variant="subtitle2">Descripción</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
       </ShopLayout>
   )
}

// export const getServerSideProps:GetServerSideProps=async({params})=>{

//     const {slug =''} = params as {slug:string}

//     const product = await dbProducts.getProductBySlug(slug);

//     if( !product){
//         return {
//             redirect:{
//                 destination:'/',
//                 permanent:false
//             }
//         }
//     }

//    return {
//        props:{
//         product
//        }
//    }
// }

export const getStaticPaths:GetStaticPaths=async(ctx)=>{
   const productSlugs = await dbProducts.getAllProductSlugs();

   return{
       paths:productSlugs.map(({slug})=>({
        params:{
            slug
        }
       })),
       fallback:'blocking'
    }
}

export const getStaticProps:GetStaticProps = async({params})=>{
    const {slug =''} = params as {slug:string}

    const product = await dbProducts.getProductBySlug(slug);

    if( !product){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

   return {
       props:{
           product
       },
       revalidate:60*60*24
   }
}




export default SlugPage;