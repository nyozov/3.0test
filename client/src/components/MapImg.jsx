import React from 'react'

export default function () {
  return (
    <div className='w-full relative'>
      <div className='flex justify-evenly'>
      <div className=' w-[100px] md:w-[400px] md:top-[-50px] shadow-lg mt-[-30px]'>
      <img className='object-cover rounded' src="https://www.teahub.io/photos/full/168-1686066_digital-world-map-4k-creative-world-map-concept.jpg"/>
      </div>
      <div className='flex justify-center flex-col mt-2'>
        <h2 className='text-gray-600'>Send crypto all around the world</h2>
        <div 
        className='rounded-full border-2 border-gray-400 cursor-pointer hover:bg-gray-200 text-gray-600 flex items-center justify-center w-1/2'>
          Find Out More
        </div>
      </div>
      </div>
    </div>
  )
}
