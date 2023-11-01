import NextLink from 'next/link';
import { AppBar, Toolbar, Link, Typography, Box,Button,IconButton,Badge,Input,InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined,ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '../../context';

export const Navbar = ()=>{

    const{ asPath,push } = useRouter();

    const { toggleSideMenu } = useContext(UiContext);

    const [searchTerm,setSearchTerm] = useState('');
    const [isSearchVisible,setIsSearchVisible] = useState(false);

    const onSearchTerm = ()=>{
        if(searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`);
    }

    const navigationTo =(url:string)=>{
        push(url);
        toggleSideMenu();
    }

    return(
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography style={{marginLeft:0.5}}>Shop</Typography>
                    </Link>
                </NextLink>
                <Box flex={1}/>

                <Box 
                    sx={{display: isSearchVisible ? 'none':{xs:'none',sm:'block'} }}
                    className="fadeIn"
                >
                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button color={asPath==='/category/men' ? 'secondary':'info'}>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button color={asPath==='/category/women' ? 'secondary':'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref legacyBehavior>     
                        <Link>
                            <Button color={asPath==='/category/kid' ? 'secondary':'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1}/>

                {/* Pantallas grandes */}

                {
                    isSearchVisible
                        ?(
                            <Input
                                sx={{display:{xs:'none',sm:'flex'} }}
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e)=>setSearchTerm(e.target.value) }
                                onKeyUp={(e)=>e.key==='Enter' ? onSearchTerm():null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ ()=>setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        ):(
                            <IconButton
                                onClick={()=>setIsSearchVisible(true) }
                                className='fadeIn'
                                sx={{display: {xs:'none',sm:'flex'} }}
                            >
                                <SearchOutlined/>
                            </IconButton>
                        )
                }
                

                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{display: {xs:'flex',sm:'none'} }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined/>
                </IconButton>

                <NextLink href='/cart' passHref legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCartOutlined/>
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button
                    onClick={ toggleSideMenu }
                >
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}


