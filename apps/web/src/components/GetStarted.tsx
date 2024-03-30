import React from 'react'
import styles from '../app/style'
import { arrowUp } from '../app/assets'
import Image from 'next/image'

export default function GetStarted() {
  return (
    <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-dimWhite p-[2px] cursor-pointer`}>
      <div className={`${styles.flexCenter} flex-col w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className='font-poppins font-medium text-[18px] leading-[23.4px] text-white'>
            <span className='text-gradient'>Get</span>
          </p>
          <Image src={arrowUp} alt='arrow-up' className='w-[23px] h-[23px] object-contain text-white' />
        </div>

        <p className='font-poppins font-medium text-[18px] leading-[23.4px] text-white'>
          <span className='text-gradient'>Started</span>
        </p>
      </div>
    </div>
  )
}