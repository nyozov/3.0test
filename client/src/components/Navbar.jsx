import { useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { DiClojureAlt } from 'react-icons/di'
import { motion } from 'framer-motion'

const NavbarItem = ({title, classProps}) => {
  return (
    <li className ={`mx-4 cursor-pointer ${classProps}`}>
      {title}
      </li>
  )

}


export default function Navbar() {
  const [toggleMenu, setToggleMenu ] = useState(false)
  const [navState, setNavState] = useState('fixed')

  const changeBackground = () => {
  
    if (window.scrollY > 80){
     setNavState('fixed  backdrop-blur')
  } else {
    setNavState('absolute')
  }
}

window.addEventListener('scroll', changeBackground)

  
  
  return ( 
    <motion.div
    initial={{ opacity: 0, x: 100 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            
           
            default: { duration: 1 },
          }}>
    <nav className={`z-20 bg-transparent ${navState} w-full z-1 flex md:justify-center justify-between items-center p-4`}>
      <div className="logo md:flex-[0.5] text-xl flex-initial justify-center items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-teal-500 to-purple-500">
 
        E<span className='text-gray-300'>th</span>S<span className='text-gray-300'>end</span>
      </div>
    <ul className='text-gray-300 text-shadow  md:flex hidden list-none flex-row justify-between items-center flex-initial'>
      {["Market", "Exchange", "Tutorials"].map((item, index)=>(
        <NavbarItem key={item + index} title={item} />
      ))}
      <li className='shadow  text-gray-300 hover:cursor-pointer rounded py-1 px-4 bg-teal-600 hover:bg-teal-800'>
        Login
      </li>
    </ul>
    <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-gray-300 md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="cursor-pointer text-gray-300 md:hidden" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-gray-300 animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose className='cursor-pointer' onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavbarItem key={item + index} title={item} classProps="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
    </motion.div>
  )
}
