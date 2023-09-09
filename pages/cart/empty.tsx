import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import Link from "next/link";

const EmptyPage = ()=>{
   return(
       <ShopLayout title='Carrito vació' pageDescription='No hay artículos en el carrito de compras'>
            <Box 
                display='flex' 
                sx={{flexDirection:{xs:'column',sm:'row'}}}  
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)'
            >
                <RemoveShoppingCartOutlined sx={{fontSize:100}}/>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Su carrito está vació</Typography>
                    <NextLink href='/' passHref legacyBehavior>
                            Regresar
                    </NextLink>
                </Box>
            </Box>
       </ShopLayout>
   )
}


export default EmptyPage;