import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import { lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { CartProvider, UiProvider,AuthProvider } from '../context'

function MyApp({ Component, pageProps }) {
  return(
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
  ) 
  
}

export default MyApp
