import React from 'react'
import styles from './style'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Business from '@/components/Business'
import Testimonials from '@/components/Testimonials'
import Hero from '@/components/Hero'
export default function App() {
    return (
        <div className='bg-dark-gray w-full overflow-hidden'>
          <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Hero />
            </div>
          </div>
  
          <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Business />
              <Testimonials />
              <CTA />
              <Footer />
            </div>
          </div>
        </div>
    )
  }
