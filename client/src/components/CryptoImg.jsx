import React from 'react'
import cryptoArt from '../assets/cryptoart.png'

export default function CryptoImg() {
  return (
    <div className='w-screen h-56'>
      <img className='w-full h-full object-cover' src={cryptoArt}/>
    </div>
  )
}
