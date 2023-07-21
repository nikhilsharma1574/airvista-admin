import { useEffect } from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { signOut } from 'firebase/auth';
import { auth } from "../firebase"
import { useRouter } from 'next/navigation'

const Header = () => {

    // const navigate = useNavigate();
    const [header, setHeader] = useState("w-full sticky top-0 flex bg-slate-100 z-50 justify-between items-center p-4 md:px-16")
    const router = useRouter()
    const listenScrollEvent = () => {
        window.scrollY > 10
            ? setHeader("w-full sticky transition-all border-b duration-300 bg-white top-0 flex bg-slate-100 z-50 justify-between items-center p-4 md:px-16")
            : setHeader("w-full sticky transition-all duration-300 top-0 flex bg-slate-100 z-50 justify-between items-center p-4 md:px-16")
    }
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent)
    })

    const handleSignOut = () =>{
        signOut(auth)
        .then(() => {
            router.replace('/login')
        })
        .catch((error) => {
                console.log(error);
        });
        }
    return (
        <div className={header}>
            <Link href="/"><Image src={"/assets/nav_logo.png"} height={100} width={100} alt="nav_image"/></Link>
            <div className="lg:flex items-center gap-8 hidden">
            </div>
            <div className="flex items-center gap-4">
                <button onClick={handleSignOut} className="py-2 px-4 text-sm bg-red-500 hover:bg-red-600 transition-all duration-300 rounded cursor-pointer text-white font-medium">Logout</button>
            </div>
        </div>
    )
}

export default Header