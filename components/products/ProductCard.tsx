import { FC, useMemo, useState } from "react"
import NextLink from 'next/link';

import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Typography } from "@mui/material"
import { IProduct } from "../../interfaces"
import Link from "next/link";

interface Props{
    product:IProduct;
}

export const ProductCard:FC<Props> = ({product})=>{
    const [isHovered,setISHovered] = useState(false);
    const [isImageLoading,setIsImageLoading] = useState(false);

    const productImage = useMemo(()=>{
        return isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`

    },[isHovered,product.images]);

    return(
        <Grid item xs={6} sm={4} 
            onMouseEnter={ ()=>setISHovered(true) }
            onMouseLeave={ ()=> setISHovered(false) }
        >
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false} legacyBehavior>
                    <CardActionArea>
                        {
                            (product.inStock === 0 ) && (
                                <Chip
                                    color="secondary"
                                    label="No hay disponibles"
                                    sx={{position:'absolute',zIndex:99,top:'10px',left:'10px'}}
                                />
                            )
                        }

                        <CardMedia
                            component='img'
                            className="fadeIn"
                            image={productImage}
                            alt={product.title}
                            onLoad={()=> setIsImageLoading(true) }
                        >
                        </CardMedia>
                    </CardActionArea>
                </NextLink>
            </Card>

            <Box sx={{mt:1,display:isImageLoading ? 'block':'none'}} className='fadeIn'>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`$${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}
