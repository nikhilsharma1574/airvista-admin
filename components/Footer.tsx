import Image from "next/image"
import Link from "next/link"
const Footer = () => {
    return (
        <div id="contact" className="w-full h-full bg-slate-200 p-4 md:px-16 md:pt-16 lg:">
            <div className="lg:flex w-full justify-between">
                <div className="mb-8 flex flex-col gap-4">
            <Link href="/"><Image src="/assets/3.png" height={100} width={100} alt="nav_image"/></Link>
                    <p className="text-slate-500 text-sm">SRM University , Ramapuram campus ,chennai (600089) ,India</p>
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <p className="text-slate-500 text-sm hover:text-slate-800 transition-all duration-300 cursor-pointer">+91 9407677251</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748b" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <p className="text-slate-500 text-sm hover:text-slate-800 transition-all duration-300 cursor-pointer">nikhilsharma1574.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 mt-2 border-t border-slate-300">
                <p className="text-xs text-slate-500">&copy; Copyright 2023 Nikhil Sharma</p>
            </div>
        </div>
    )
}

export default Footer
