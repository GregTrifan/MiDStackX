import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import AppHeader from '@/components/appHeader'
import { Box } from '@/components/primitives/box'
import '@rainbow-me/rainbowkit/styles.css';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@/index.css"
import {
    getDefaultWallets,
    darkTheme,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { fireChain } from '@/utils/chainConfigs';


const { chains, provider } = configureChains(
    [{ ...fireChain, iconUrl: "/5ire.png" }, hardhat],
    [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? "" }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'MiDStackX',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})
const theme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            primary: "#0023FF",
            selection: "#ff6bd546"
        }
    }
})
export default function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={darkTheme({
                accentColor: "#0023FF"
            })}>
                <NextUIProvider theme={theme}>
                    <Box css={{ maxWidth: "100%" }}>
                        <AppHeader />
                        <Box css={{ mx: 4 }}>
                            <Component {...pageProps} />
                        </Box>
                    </Box>
                </NextUIProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
