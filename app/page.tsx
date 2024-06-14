'use client';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import useSolanaTx from '@/hooks/useSolanaTx';
const Page = () => {
  const { initSolTransfer } = useSolanaTx();

  const handleInitSolTransfer = async () => {
    try {
      await initSolTransfer();
    } catch (error) {
      console.error;
    }
  };
  return (
    <main className="flex flex-col px-8 py-2">
      <nav className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Simple Solana Transaction Demo
        </h1>
        <WalletMultiButton />
      </nav>

      <button
        className="p-2 bg-gray-400 rounded-md shadow-md drop-shadow-md w-[fit-content]"
        onClick={handleInitSolTransfer}
      >
        <p className=" font-mono font-semibold">Transfer</p>
      </button>
    </main>
  );
};
export default Page;
