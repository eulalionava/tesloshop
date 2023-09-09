import { Box } from "@mui/material"
import Head from "next/head"
import { title } from "process"
import { PropsWithChildren } from "react"

interface Props{
    title:string
}

export const AuthLayout = ({children,title}:PropsWithChildren<Props>)=>{
   return(
       <>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                    { children }
                </Box>
            </main>
       </>
   )
}


