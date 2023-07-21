import Image from 'next/image'
import React, {useEffect} from "react"
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Landing from '@/components/Landing'
const inter = Inter({ subsets: ['latin'] })
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase";
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'


export default function Home() {

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid)
        // ...
      } else {
        router.replace('/login')
      }
    });
  },[])

  return (
    <main className={`w-full h-fit min-h-screen bg-slate-100 ${inter.className}`}>
        <Header/>
        <Landing/>
    </main>
  )
}
