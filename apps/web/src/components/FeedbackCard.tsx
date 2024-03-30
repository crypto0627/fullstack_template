/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
interface feedbackTypes {
    id: string
    content: string
    name: string
    title: string
    img: any
}

export default function FeedbackCard (props: feedbackTypes) {
  return (
    <div className='flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card'>

    <div className='flex flex-row'>
    <div className='rounded-full overflow-hidden'>
        <Image
            src={props.img}
            alt={props.name}
            width={60} 
            height={60} 
            objectFit='cover'
        />
    </div>
      <div className='flex flex-col ml-4'>
        <h4 className='font-poppins font-semibold text-[20px] leading-[32px] text-white'>
          {props.name}
        </h4>
        <p className='font-poppins font-normal text-[16px] leading-[24px] text-white'>
          {props.title}
        </p>
      </div>
    </div>
  </div>
  )
}