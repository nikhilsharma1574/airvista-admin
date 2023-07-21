'use client'
import React,{useState,useEffect} from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {auth} from "../firebase";
import { useRouter } from 'next/router'
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { collection, doc, getDocs, getDoc, setDoc, query, where, onSnapshot, getCountFromServer} from "firebase/firestore"; 
import {db} from '../firebase.js'
import Link from 'next/link';

const FlightNumber = () => {

    const router = useRouter();
    const [flights, setFlights] = useState([]);
    const [count, setCount] = useState(0);
    const [checkCount,setCheckCount] = useState(false);
    const [checkUser,setCheckUser] = useState(false);
    const [userList,setUserList] = useState([]);
    const FlightNumber  = router.query.FlightNumber;
    // @ts-ignore
    const a = parseInt(flights.price)+150+200

    console.log(userList)
    

    // @ts-ignore
    useEffect(() => {
        if(router.isReady){
            if (!FlightNumber) return null;
            const unsub = onSnapshot(
                query(collection(db, "flights"), where("FlightNumber","==", FlightNumber)),
                (collectionRef) => {
                    collectionRef.forEach((doc) => {
                        // @ts-ignore
                        setFlights({ ...doc.data(), id: doc.id });
                    });
                }
                );
        }
    }, [router.isReady])

    // @ts-ignore
    useEffect(() => {
        if(router.isReady){
            const FlightNumber  = router.query.FlightNumber;
            if (!FlightNumber) return null;
            const gg = async () => {
                const coll = collection(db, `flights/${FlightNumber}/bookings`);
                const snapshot = await getCountFromServer(coll);
                setCount(snapshot.data().count);
                if (snapshot.data().count === 60 ){
                    setCheckCount(true)
                }
            }
            gg();

        }
    }, [router.isReady])
    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, `flights/${FlightNumber}/bookings`)),
            (collectionRef) => {
                let arr:any = [];
                collectionRef.forEach((doc) => {
                    arr.push({ ...doc.data(), id: doc.id });
                });
                setUserList(arr)
            }
        );
    },[router.isReady]);
    
    return (
        <div>
            <section className="p-4 py-12 md:px-16 lg:max-w-6xl lg:mx-auto text-left flex-col gap-5 w-full h-full flex justify-center items-center">
                <div className='flex justify-start text-left font-bold'>
                    Flight Details
                </div>
                <div className='flex flex-col rounded-md bg-slate-200 w-full p-4'>
                        <div>
                            {/* @ts-ignore */}
                            Flight <span className='font-medium'>{flights.fromCity}</span> to <span className='font-medium'>{flights.toCity}</span>
                        </div>
                        <hr className="border-black mt-2"></hr>
                        <div className=''></div>
                        <div className='grid lg:grid-cols-5 md:grid-cols-5 sm:grid-col-5 mt-6'>
                            {/* @ts-ignore */}
                            <div className='flex justify-center items-center'><Image src={flights.logo} height={100} width={100} alt='logo'/></div>
                            {/* @ts-ignore */}
                            <div className='flex justify-center items-center'>{flights?.fromAirport?.airport_name}</div>
                            <div className='flex justify-center items-center'><Image src="/assets/flight.svg" height={100} width={100} alt='logo'/></div>
                            {/* @ts-ignore */}
                            <div className='flex justify-center items-center lg:border-r-2  md:border-r-2 h-full border-black'>{flights?.toAirport?.airport_name}</div>
                            <div className='flex flex-col justify-center items-center'>
                            
                            <div className='flex items-center justify-center'>
                                <div>
                                Bookings : {count}
                                </div>
                            </div>
                                <div>
                                Seats left : {60 - count}
                                </div>
                            </div>
                        </div>
                </div>
                <div className='flex flex-col rounded-md bg-slate-200 w-full p-4'>
                        <div>
                            Passenger Details
                        </div>
                        <hr className="border-black mt-2"></hr>
                        <div className=''></div>
                        <div className='grid grid-cols-1 lg:grid-cols- gap-4 mb-16'>
                    {
                        userList.map((user, index) => (
                            <div key={index} className="w-full bg-slate-800/40 p-4 rounded-md hover:bg-slate-800/50 transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-4">
                                <div className='flex items-center gap-4 '>
                                    {/* @ts-ignore */}
                                    <Image className='w-20 rounded-full' width={100} height={100} src={user.photo} alt={user.name}/>
                                    <div className='flex flex-col gap-2 '>
                                        {/* @ts-ignore */}
                                        <h1 className=''>Name : {user.name}</h1>
                                        {/* @ts-ignore */}
                                        <h1 className=''>ID: {user.uid}</h1>
                                        {/* @ts-ignore */}
                                        <h1 className=''>Email: {user.email}</h1>
                                    </div>
                                </div>
                                {/* <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 md:w-1/2 lg:w-2/3'>
                                    <h1>College : <span className='text-slate-400'>{participant.college}</span></h1>
                                    <h1>Dept : <span className='text-slate-400'>{participant.department}</span></h1>
                                    <h1>Reg No : <span className='text-slate-400'>{participant.registerNumber}</span></h1>
                                    <h1>Year : <span className='text-slate-400'>{participant.year}</span></h1>
                                    <h1>Email : <a href={`mailto:${participant.email}`} className='text-slate-400'>{participant.email}</a></h1>
                                    <h1>Phone No : <a href={`tel:+91${participant.contact}`} className='text-slate-400'>{participant.contact}</a></h1>
                                </div> */}
                            </div>
                        ))
                    }
                </div>
                </div>
    
            </section>
        </div>
    )
}

export default FlightNumber