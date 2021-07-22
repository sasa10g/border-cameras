// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import '../utils/style.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}