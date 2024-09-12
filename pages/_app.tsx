import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import { lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { CartProvider, UiProvider,AuthProvider } from '../context'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
  return(
    <SessionProvider>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>

            <UiProvider>
                <ThemeProvider theme={ lightTheme }>
                  <CssBaseline/>
                  <Component {...pageProps} />
                </ThemeProvider>
            </UiProvider>
            
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  ) 
  
}

export default MyApp
