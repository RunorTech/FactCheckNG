import React from 'react'
import { Footer } from '../ui/Footer';
import { Header } from '../ui/Header';

 const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      {children}
      <Footer/>
      </div>
  )
}
export default HomeLayout;