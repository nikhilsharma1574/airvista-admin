import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {airports} from "../airports.js"
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,} from "@/components/ui/command"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { useRef } from "react";
import {db} from '../firebase.js';
import { useRouter } from 'next/navigation'
import { collection, doc, getDocs, setDoc, query, onSnapshot,deleteDoc} from "firebase/firestore"; 
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast";

const Landing = () => {
    
    const airlines = [
        {
            title: "Indigo",
            logo: "/assets/indigo.svg",
            iata: "6E",
        },
        {
            title: "Air India",
            logo: "/assets/air_india.svg",
            iata: "AIC",
        },
        {
            title: "Vistara",
            logo: "/assets/vistara.svg",
            iata: "UK",
        },
        {
            title: "Akasa Air",
            logo: "/assets/akasa.svg",
            iata:"QP",

        },
    ];

    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [fromCity, setfromCity] = React.useState("");
    const [toCity, setToCity] = React.useState("");
    const [airlineName, setAirlineName] = React.useState("");
    const [time, setTime] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [flights, setFlights] = React.useState([]);
    const [filteredflights, setFilteredFlights] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("")
    const { toast } = useToast()
    const router = useRouter();

    console.log(filteredflights)

    const getRandomFlightNo = async () => {
        const min = 10000;
        const max = 99999;
        const rand = min + Math.random() * (max - min);
        const selectedIata = airlines.find((airline) => airline.title === airlineName)?.iata

        const flightNo = selectedIata + `${Math.round(rand)}`
    
        const collectionRef = collection(db, "flights");
        const q = await getDocs(collectionRef);
        const ids = q.docs.map((doc) => doc.id);
        if (ids.includes(flightNo)) {
            getRandomFlightNo();
        }
        return flightNo;
    };
    const handleChangeSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);
    }
    
    const handleSearch = () => {
        console.log(searchQuery)
        
        const filterArray = flights.filter(
            // @ts-ignore
            (el) => el.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredFlights(filterArray);

        if (filterArray.length === 0) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No Flights Found!",
            })
        }
    }
    const handleAddFlight = async(e : { preventDefault: () => void; } | undefined) => {
        e?.preventDefault();
        if(!fromCity || !toCity || !airlineName || !time || !price){
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please Fill in all the Fields",
            })
        } else {
            const FlightNo = await getRandomFlightNo();
            const fromAirport = airports.find((airport) => airport.city === fromCity.replace(/\b\w/g, x => x.toUpperCase()))
            const toAirport = airports.find((airport) => airport.city === toCity.replace(/\b\w/g, x => x.toUpperCase()))
            const selectedFlightLogo = airlines.find((airline) => airline.title === airlineName)?.logo
            setDoc(doc(db, "flights", FlightNo), {
                fromCity: fromCity.replace(/\b\w/g, x => x.toUpperCase()),
                toCity: toCity.replace(/\b\w/g, x => x.toUpperCase()),
                airlineName: airlineName,
                flightNumber: FlightNo, 
                time: time, 
                price: price,
                seats: 60,
                fromAirport:fromAirport,
                toAirport:toAirport,
                logo: selectedFlightLogo
            })
        }
        
    }

    const handleDelte = (flightNumber: any) => {
        const docRef = doc(db, "flights", flightNumber);
        deleteDoc(docRef)
        .then(() => {
            toast({
                variant: "destructive",
                title: "Flight Deleted",
                description: "The Flight is Deleted Successfully",
            })
        }).catch((e)=> console.log(e))
    }

    
    const handleViewBooking = (flightNumber: any) => {
        router.push(`${flightNumber}`);
    }
    React.useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "flights")),
            (collectionRef) => {
                let arr:any = [];
                collectionRef.forEach((doc) => {
                    arr.push({ ...doc.data(), id: doc.id });
                });
                setFlights(arr)
            }
        );
    },[]);

    return (
        <div className="h-full">
        <main className="p-4 md:px-16 lg:max-w-6xl lg:mx-auto w-full  flex ">
            <div className="w-full">
                <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
                <Dialog>
                    <DialogTrigger>
                        <Button className="bg-lime-500 hover:bg-lime-600">Add Flights</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Flight Deatails</DialogTitle>
                            <DialogDescription>
                                <div className="w-full h-full grid grid-cols-1 gap-4 mt-4">
                                    {/* airline */}
                                    <Select onValueChange={(val: any) => {setAirlineName(val)}}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Airline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                airlines.map((airline, idx) => (
                                                    <SelectItem key={idx} value={airline.title} > 
                                                        <div className="flex gap-2 items-center">
                                                            <Image src={airline.logo} alt={airline.title} width={44} height={44}/> {airline.title}
                                                        </div>
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    {/* from */}
                                    <Label htmlFor="from_city" className="text-left mb-0">From</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                            >
                                            {fromCity
                                                ? airports.find((airport) => airport.city === fromCity.replace(/\b\w/g, x => x.toUpperCase()))?.city
                                                : "Select City"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command id="from_city">
                                                <CommandInput placeholder="Search City..." className="h-9" />
                                                <CommandEmpty>No city found.</CommandEmpty>
                                                <CommandGroup className="h-56  overflow-y-scroll">
                                                    {airports.map((airport) => (
                                                    <CommandItem
                                                        key={airport.code}
                                                        onSelect={(currentValue) => {
                                                            setfromCity(currentValue === fromCity ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        <p>
                                                            {airport.city}
                                                        </p>
                                                        <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            fromCity === airport.city ? "opacity-100" : "opacity-0"
                                                        )}
                                                        />
                                                    </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {/* to city */}
                                    <Label htmlFor="to_city" className="text-left mb-0">To</Label>
                                    <Popover open={open2} onOpenChange={setOpen2}>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                            >
                                            {toCity
                                                ? airports.find((airport) => airport.city === toCity.replace(/\b\w/g, x => x.toUpperCase()))?.city
                                                : "Select City"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command id="to_city">
                                                <CommandInput placeholder="Search City..." className="h-9" />
                                                <CommandEmpty>No city found.</CommandEmpty>
                                                <CommandGroup >
                                                    <div className="h-56 overflow-y-scroll">
                                                        {airports.map((airport) => (
                                                        <CommandItem
                                                            className={`${airport.city === fromCity.replace(/\b\w/g, x => x.toUpperCase()) ? "hidden" : "block"}`}
                                                            key={airport.code}
                                                            onSelect={(currentValue) => {
                                                                setToCity(currentValue === toCity ? "" : currentValue)
                                                                setOpen2(false)
                                                            }}
                                                        >
                                                            <p>
                                                                {airport.city}
                                                            </p>
                                                            <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                toCity === airport.city ? "opacity-100" : "opacity-0"
                                                            )}
                                                            />
                                                        </CommandItem>
                                                        ))}
                                                    </div>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="time" className={"text-left"}>Time</Label>
                                        <Input onChange={(text: any) => {setTime(text.target.value)}} type="time" id="time" placeholder="Time" />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="price" className={"text-left"}>Price</Label>
                                        <Input onChange={(text: any) => {setPrice(text.target.value)}} type="number" id="price" placeholder="Price" />
                                    </div>
                                    <Button onClick={handleAddFlight} className="bg-lime-500 hover:bg-lime-600">Add</Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className="w-full flex items-center justify-center flex-col gap-2">
                    {
                        flights.length === 0 ?
                        <p className="text-slate-500 text-sm">No Flights Added</p>
                        :
                        <div className="w-full mt-8">
                            <div className="mb-8">
                                <div className="flex w-full max-w-lg items-center space-x-2">
                                    <Input onChange={handleChangeSearch} type="email" placeholder="Enter Flight No " />
                                    <Button onClick={handleSearch} type="submit" className="bg-lime-500 hover:bg-lime-600">Search</Button>
                                </div>
                            </div>
                            {
                                filteredflights.length === 0 || searchQuery.length === 0 ?
                                <>
                                    {
                                        flights.map((flight, idx) => (
                                            <div onClick={handleViewBooking} key={idx} className={`w-full bg-slate-300/40 p-4 grid grid-cols-1 md:grid-cols-6 place-items-center rounded-lg shadow-md mb-4`}>
                                                <div className="flex items-center gap-2 md:col-span-1">
                                                    {/* @ts-ignore */}
                                                    <Image src={flight.logo} alt={flight.airlineName} width={44} height={44}/>
                                                    {/* @ts-ignore */}
                                                    <p className="font-medium text-sm text-slate-500">{flight.flightNumber}</p>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 place-items-center md:col-span-2">
                                                    <div className="">
                                                        {/* @ts-ignore */}
                                                        <h1 className="text-lg font-medium">{flight.fromAirport.city}</h1>
                                                        {/* @ts-ignore */}
                                                        <p className="font-medium text-sm text-slate-500">{flight.fromAirport.code}</p>
                                                    </div>
                                                    <div>
                                                        {/* svg */}
                                                        <Image src={'/assets/flight.svg'} alt={'logo'} width={2} height={2} className="w-40"/>
                                                    </div>
                                                    <div>
                                                        {/* @ts-ignore */}
                                                        <h1 className="text-lg font-medium">{flight.toAirport.city}</h1>
                                                        {/* @ts-ignore */}
                                                        <p className="font-medium text-sm text-slate-500">{flight.toAirport.code}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {/* @ts-ignore */}
                                                    <h1 className="text-lg font-medium">{flight.time}</h1>
                                                </div>
                                                <div>
                                                    {/* @ts-ignore */}
                                                    <Button onClick={() => handleViewBooking(flight.flightNumber)} className="bg-lime-500 hover:bg-lime-600">View Bookings</Button>
                                                </div>
                                                <div>
                                                    {/* @ts-ignore */}
                                                    <Image onClick={() => handleDelte(flight.flightNumber)} src={'/assets/bin.png'} alt={'Delete Flight'} width={22} height={22}/>
                                                </div>
                                            </div>
                                        ))
                                    }                                
                                </>
                                :
                                <>
                                    {
                                        filteredflights.map((flight, idx) => (
                                            <div onClick={handleViewBooking} key={idx} className={`w-full bg-slate-300/40 p-4 grid grid-cols-1 md:grid-cols-6 place-items-center rounded-lg shadow-md mb-4`}>
                                                <div className="flex items-center gap-2 md:col-span-1">
                                                    {/* @ts-ignore */}
                                                    <Image src={flight.logo} alt={flight.airlineName} width={20} height={20}/>
                                                    {/* @ts-ignore */}
                                                    <p className="font-medium text-sm text-slate-500">{flight.flightNumber}</p>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 place-items-center md:col-span-2">
                                                    <div className="">
                                                        {/* @ts-ignore */}
                                                        <h1 className="text-lg font-medium">{flight.fromAirport.city}</h1>
                                                        {/* @ts-ignore */}
                                                        <p className="font-medium text-sm text-slate-500">{flight.fromAirport.code}</p>
                                                    </div>
                                                    <div>
                                                        {/* svg */}
                                                        <Image src={'/assets/flight.svg'} alt={'logo'} width={2} height={2} className="w-40"/>
                                                    </div>
                                                    <div>
                                                        {/* @ts-ignore */}
                                                        <h1 className="text-lg font-medium">{flight.toAirport.city}</h1>
                                                        {/* @ts-ignore */}
                                                        <p className="font-medium text-sm text-slate-500">{flight.toAirport.code}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {/* @ts-ignore */}
                                                    <h1 className="text-lg font-medium">{flight.time}</h1>
                                                </div>
                                                <div>
                                                    {/* @ts-ignore */}
                                                    <Button onClick={() => handleViewBooking(flight.flightNumber)} className="bg-lime-500 hover:bg-lime-600">View Bookings</Button>
                                                </div>
                                                <div>
                                                    {/* @ts-ignore */}
                                                    <Image onClick={() => handleDelte(flight.flightNumber)} src={'/assets/bin.png'} alt={'Delete Flight'} width={22} height={22}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            }
                        </div>
                    }
                </div>
            </div>
        </main>
        </div>
    )
}

export default Landing;