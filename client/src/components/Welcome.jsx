import { AiFillPlayCircle } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from "./";
import { shortenAddress } from "../utils/shortenAddress";
import { HiClipboardCopy } from "react-icons/hi";
import { SiBitcoin } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios'
import phoneView from '../assets/phone-view.png'


const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-gray-800";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-gray-200 border-none text-sm white-glassmorphism"
  />
);

export default function Welcome() {
  const {
    connectWallet,
    connectedAccount,
    formData,
    sendTransaction,
    handleChange,
  } = useContext(TransactionContext);

  const [copyTooltip, setCopyTooltip] = useState(false);
  const [ coins, setCoins ] = useState(null)
  const [ loadingCoins, setLoadingCoins ] = useState(false);
  const [ calcState, setCalcState] = useState(0)

  
  useEffect(()=>{
    setLoadingCoins(true)
    const fetchMyAPI = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=false')
        const data = response.data
        console.log(data)
        setCoins(data)
        
        setLoadingCoins(false)
  
        
      } catch (error) {
        console.log(error)
        setLoadingCoins(false)
      }
        
    }
    fetchMyAPI()

    
    

  },[])

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(connectedAccount);

    setCopyTooltip(true);
    setTimeout(() => {
      setCopyTooltip(false);
    }, [1000]);
  };

    const calcInput = (e) => {
      setCalcState(e.target.value)


    }
 
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex mf:flex-row  flex-col items-start justify-between md:p-14 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          
          <motion.ul
          initial={{ opacity: 0, x: 100 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            staggerChildren: 0.5,
           
            default: { duration: 1 },
          }}
          
          
          >
           
            <motion.li variants={{hidden: {opacity: 0}, show: {opacity: 1}}}>
          <h1 className="text-3xl font-bold sm:text-5xl custom-text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          </motion.li >
          <motion.li variants={{hidden: {opacity: 0}, show: {opacity: 1}}}>
          <p className="text-left mt-5 sm:w-[450px] 2xl:w-11/12 text-white font-light text-base">
            EthSend is a cryptocurrency platform that securely connects user transactions through the use of Web 3.0 blockchain technology.
            
          </p>

          
          </motion.li >
          <motion.li variants={{hidden: {opacity: 0}, show: {opacity: 1}}}>

          {!connectedAccount && (
            <div
              type="button"
              onClick={connectWallet}
              className="gradient-bg-button flex flex-row justify-center items-center my-5 p-3 bg-gradient-to-r from-purple-500 via-teal-500 to-purple-500 rounded-md cursor-pointer shadow hover:shadow-teal-200"
            >
              <p className="text-gray-200 text-base font-bold">
                Connect Wallet
              </p>
            </div>
          )}
          </motion.li >
          </motion.ul>
          <motion.div
            initial={{ x: "-300px", opacity: 0 }}
            transition={{ delay: 1, default: { duration: 1 } }}
            animate={{ x: 0, opacity: 1 }}
            className="white-glassmorphism flex flex-col w-full mt-10 p-6"
          >
            {coins === null && <Loader/>}
            
          
         
  
           {coins !== null &&
           <>
            <div className={` w-full text-center text-white `}>
           Current Exchange Rate
            </div>
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <div className={`flex items-center justify-between text-white `}>
              <SiEthereum className="m-1" /> 
              <p>{coins[1].name}</p>
              <p>{coins[1].symbol.toUpperCase()}</p>
              <p>${coins[1].current_price.toLocaleString()}</p>
             
              <p
              className={coins[1].price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}
              >{coins[1].price_change_percentage_24h > 0 ? '+' : ''}{Math.round(coins[1].price_change_percentage_24h * 100) / 100}%</p>
            </div>
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <div className='relative'>
              <div className='text-white'>
                <div className='text-center'>Calculator</div>
                <input
          type="number"
          name="price"
          id="price"
          className="outline-none appearance-none bg-transparent backdrop-blur block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="USD"
         onChange={calcInput}/>
              <div>
              {(calcState / coins[1].current_price).toFixed(8) > 0 && (calcState / coins[1].current_price).toFixed(8) || 0} Ethereum (ETH)
              
              </div>
              </div>
            </div>

            </>
}
         
             
           
          </motion.div>
         
        </div>
        
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          {connectedAccount && (<motion.div
          initial={{ x: "300px", opacity: 0 }}
          transition={{ delay: 1, default: { duration: 1 } }}
          animate={{ x: 0, opacity: 1 }}
           className="p-4 white-glassmorphism">
             
            <p className='text-white text-center'>Account</p>
            <div className="h-[1px] w-full bg-gray-400 my-2" />
              
              <div 
              onClick={copyToClipboard}
              className="flex align-center items-center justify-center rounded p-1 cursor-pointer hover:bg-gray-600">
                <div
                 
                  className="blue-glassmorphism text-white   rounded p-1 max-w-fit"
                >
                  <HiClipboardCopy />
                </div>
                <p className="ml-2 text-white font-light text-sm">
                  {shortenAddress(connectedAccount)}
                </p>
                <AnimatePresence>
                {copyTooltip && (
                  
                  <motion.div
                  key='1'
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute bottom-[-10px] left-12 bg-black text-white rounded p-2 text-xs">
                    Copied!
                  </motion.div>
                 
                )}
                 </AnimatePresence>
              </div>
           
          </motion.div>
          )}
          {connectedAccount && (<motion.div
          initial={{ x: "-300px", opacity: 0 }}
          transition={{ delay: 1, default: { duration: 1 } }}
          animate={{ x: 0, opacity: 1 }}
           className="mt-5 p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (GIF)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {false ? (
              <Loader />
            ) : (
              <div
                type="button"
                onClick={handleSubmit}
                className="text-white flex justify-center w-full mt-2 border-[1px] p-2 border-[#3d4f7c] bg-teal-600 hover:bg-teal-800 rounded cursor-pointer"
              >
                Send Now
              </div>
            )}
          </motion.div>
          )}
          {!connectedAccount && (
            <motion.div
            initial={{ x: "-300px", opacity: 0 }}
            transition={{ delay: 1, default: { duration: 1 } }}
            animate={{ x: 0, opacity: 1 }}
            className='flex phone-image p-5 w-full justify-end items-center '
             >
               <img className='h-auto w-64 phone-shadow' src={phoneView}/>
              
               </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
