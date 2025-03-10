'use client';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { ONCHAINKIT_LINK } from 'src/links';
import OnchainkitSvg from 'src/svg/OnchainkitSvg';
import { useAccount } from 'wagmi';
import ConnectButton from '../components/ConnectButton';
import FrameSDK from '@farcaster/frame-sdk';
import farcasterFrame from '@farcaster/frame-wagmi-connector';
import { PropsWithChildren, useEffect } from 'react';
import { connect } from 'wagmi/actions';
import { useWagmiConfig } from 'src/wagmi';

function FarcasterFrameProvider({ children }: PropsWithChildren) {
  const config = useWagmiConfig()
  
  useEffect(() => {
    const init = async () => {
      const context = await FrameSDK.context

      // Autoconnect if running in a frame.
      if (context?.client.clientFid) {
        connect(config, { connector: farcasterFrame() })
      }

      // Hide splash screen after UI renders.
      setTimeout(() => {
        FrameSDK.actions.ready()
      }, 500)
    }
    init()
  }, [config])

  return <>{children}</>
}

export default function Page() {
  const { address } = useAccount();

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <FarcasterFrameProvider>
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <a
            href={ONCHAINKIT_LINK}
            title="onchainkit"
            target="_blank"
            rel="noreferrer"
          >
            <OnchainkitSvg />
          </a>
          <div className="flex items-center gap-3">
            <ConnectButton />
          </div>
        </div>
      </section>
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        <div className="flex h-[450px] w-[450px] max-w-full items-center justify-center rounded-xl bg-[#030712]">
          <div className="rounded-xl bg-[#F3F4F6] px-4 py-[11px]">
            <p className="font-normal text-indigo-600 text-xl not-italic tracking-[-1.2px]">
              npm install @coinbase/onchainkit
            </p>
          </div>
        </div>
          {address ? (
            <TransactionWrapper address={address} />
          ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Connect to transact"
            />
          )}
      </section>
      <Footer />
      </FarcasterFrameProvider>
    </div>
  );
}
