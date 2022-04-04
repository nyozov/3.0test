import { AiFillPlayCircle} from 'react-icons/ai'
import { useContext } from 'react'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { TransactionContext } from '../context/TransactionContext'
import { Loader } from './'
import { shortenAddress } from '../utils/shortenAddress'
import { HiClipboardCopy } from 'react-icons/hi'
import { useState } from 'react'
import { FaEthereum } from 'react-icons/fa'

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-gray-800";

const Input = ({placeholder, name, type, value, handleChange}) => (
  <input
  placeholder={placeholder}
  type={type}
  step="0.0001"
  value={value}
  onChange={(e)=> handleChange(e, name)}
  className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-gray-800 border-none text-sm white-glassmorphism"
  />
)

export default function Welcome() {

  const { connectWallet, connectedAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);
  const [copyTooltip, setCopyTooltip] = useState(false)

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if(!addressTo || !amount || !keyword || !message) return;

    sendTransaction();

  }

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(connectedAccount);
    
     setCopyTooltip(true)
     setTimeout(()=> {
      setCopyTooltip(false)
    },[2000])
    

  }
  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start flex-col mf:mr-10'>
          <h1 className='text-3xl font-bold sm:text-5xl custom-text-gradient py-1'>
            Send Crypto <br/> across the world
          </h1>
          <p className='text-left mt-5 text-gray-400 font-light md:w-9/12 w-11/12 text-base'>
            Explore the crypto world. Buy and sell currencies with ease.
          </p>
          
          {!connectedAccount && (
          <div 
          type='button'
          onClick={connectWallet}
          className='gradient-bg-button flex flex-row justify-center items-center my-5 p-3 bg-gradient-to-r from-purple-500 via-teal-500 to-purple-500 rounded-md cursor-pointer shadow hover:shadow-teal-200'
          >
            <p className='text-gray-200 text-base font-bold'>Connect Wallet</p>
            </div>
            )}
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>


        </div>
        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
          <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color="#fff"/>

                </div>
                <BsInfoCircle fontSize={17} color='#fff'/>

              </div>
              <div className='flex'>
                <div onClick={copyToClipboard} className='blue-glassmorphism text-gray-800 cursor-pointer hover:bg-gray-600 border-white border rounded p-1 max-w-fit'>
                  <HiClipboardCopy/>
                  </div>
                <p className='ml-2 text-gray-800 font-light text-sm'>
                  {shortenAddress(connectedAccount)}
                  
                  </p>
                  {copyTooltip && <div className='absolute bottom-12 bg-black text-gray-800 rounded p-2 text-xs'
                  >
                    Copied to clipboard</div>}
                  
              </div>

            </div>

          </div>
          <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
            <Input placeholder="Address To" name="addressTo" type='text' handleChange={handleChange}/>
            <Input placeholder="Amount (ETH)" name="amount" type='number' handleChange={handleChange}/>
            <Input placeholder="Keyword (GIF)" name="keyword" type='text' handleChange={handleChange}/>
            <Input placeholder="Enter Message" name="message" type='text' handleChange={handleChange}/>
            <div className="h-[1px] w-full bg-gray-400 my-2"/>
            {false ? (
              <Loader />
            ) : (
              <button 
              type="button"
              onClick={handleSubmit}
              className='text-gray-800 w-full mt-2 border-[1px] p-2 border-[#3d4f7c] bg-blue-500 hover:bg-blue-600 rounded cursor-pointer'
              >
                Send Now

              </button>
            )}
            </div>

        </div>

      </div>

    </div>
  )
}
