import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
const useSolanaTx = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const initSolTransfer = async () => {
    if (!publicKey) throw new WalletNotConnectedError('Wallet not connected');
    console.log(connection);
    console.log(publicKey);
    const recipientPublicKey = new PublicKey(
      'D4xiD2mRMDs5dvQPTgDTvat2RoUY8mqt2gsXi7uw5q5L'
    );

    const balance = await connection.getBalance(publicKey, 'finalized');
    console.log(`Sol Balance ${balance}`);
    const amount = 0.01 * LAMPORTS_PER_SOL;
    try {
      const transferIx = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount,
      });
      const transaction = new Transaction().add(transferIx);
      transaction.feePayer = publicKey;

      console.log(transaction);

      const {
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection);
      console.log(signature);
      await connection.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight,
          signature,
        },
        'finalized'
      );

      console.log('Transaction successfully confirmed');
    } catch (error) {
      console.error(error);
      throw new Error('an error occurred');
    }
  };

  return { initSolTransfer };
};
export default useSolanaTx;
