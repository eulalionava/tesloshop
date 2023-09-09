import { FC, useMemo, useState } from "react"
import NextLink from 'next/link';

import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { IProduct } from "../../interfaces"
import Link from "next/link";

interface Props{
    product:IProduct;
}

export const ProductCard:FC<Props> = ({product})=>{
    const [isHovered,setISHovered] = useState(false);

    const productImage = useMemo(()=>{
        return isHovered
            ? `products/${product.images[1]}`
            : `products/${product.images[0]}`

    },[isHovered,product.images]);

    return(
        <Grid item xs={6} sm={4} 
            onMouseEnter={ ()=>setISHovered(true) }
            onMouseLeave={ ()=> setISHovered(false) }
        >
            <Card>
                <NextLink href='/product/slug' passHref prefetch={false} legacyBehavior>
                    <CardActionArea>
                        <CardMedia
                            component='img'
                            className="fadeIn"
                            image={productImage}
                            alt={product.title}
                        >
                        </CardMedia>
                    </CardActionArea>
                </NextLink>
            </Card>

            <Box sx={{mt:1}} className='fadeIn'>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`$${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}
