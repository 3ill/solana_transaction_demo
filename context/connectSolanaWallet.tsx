'use client';
import { FC, ReactNode, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import * as web3 from '@solana/web3.js';
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
require('@solana/wallet-adapter-react-ui/styles.css');

const SolanaContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = web3.clusterApiUrl('devnet');
  const wallets = useMemo(
    () => [
      new walletAdapterWallets.PhantomWalletAdapter(),

      new walletAdapterWallets.SolflareWalletAdapter({ network: solNetwork }),
    ],
    [solNetwork]
  );
  // const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaContextProvider;
