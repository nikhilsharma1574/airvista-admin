// import React from 'react'
// import Arrow from "/arrow.svg";
// import Rocket from "/rocket.svg";
// import Star from "/star.svg";
// import Target from "/target.svg";
// import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    
    // const navigate = useNavigate();

    return (
        <main className='w-full h-screen flex justify-center items-center'>
            <div className='hidden w-1/2 h-full bg-white text-black lg:flex lg:flex-col lg:px-16 justify-center'>
                <div className="relative">
                    {/* <img className="w-20 absolute -bottom-24 right-0" src={Rocket} alt={"Arrow"}/> */}
                    {/* <img className="w-20 absolute md:-top-60 md:left-32" src={Star} alt={"Rocket"}/> */}
                    {/* <img className="w-20 absolute md:-top-24 rotate-180 md:right-20" src={Arrow} alt={"Star"}/> */}
                    {/* <img className="w-20 absolute md:-bottom-44 md:left-10" src={Target} alt={"Target"}/> */}
                    <h1 className='text-4xl font-semibold'>Welcome to{" "} 
                        <span className=" h-fit w-fit bg-[url('/underline.svg')] bg-bottom bg-no-repeat">
                        Streamline<span className="text-blue-500">Recruit</span>
                        </span>! Your Ultimate Online Recruitment Solution</h1>
                    <p className='text-slate-500 text-justify mt-4 text-base'>Are you tired of sifting through countless resumes, conducting endless interviews, and struggling to find the perfect candidate for your organization? Look no further! StreamlineRecruit is here to revolutionize your hiring process and empower your HR team with an efficient online recruitment solution.</p>
                </div>
            </div>
            <div className='lg:w-1/2 p-4'>
                <div className='mx-auto flex flex-col gap-8 lg:w-1/2'>
                    <div>
                        <div className="flex gap-4 items-center">
                        <div className="hover:scale-110 transition-all duration-300 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <h1 className='text-2xl font-medium'>Reset Password</h1>
                        </div>
                    <p className='text-sm text-slate-500'>Enter your email associated with to your account.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <h1 className=''>Email</h1>
                            <input className='w-full p-4 text-slate-500 outline-none border border-slate-400 rounded' placeholder='example@gmail.com'/>
                        </div>
                        <div>
                            <button className="w-full p-4 text-sm bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded cursor-pointer text-white font-medium">Send mail</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResetPassword