import { AppProps } from 'next/app'
import 'css/global.css'
import UserProvider from 'context/user'

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
)

export default App
