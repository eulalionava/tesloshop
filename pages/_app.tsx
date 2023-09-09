import { CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import { lightTheme } from '../themes'

function MyApp({ Component, pageProps }) {
  return(
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
  ) 
  
}

export default MyApp
