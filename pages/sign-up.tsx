import React, {useState} from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {auth, db} from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 

const SignUp = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        name:'',
    });
    const { toast } = useToast()


    const handleChange = (prop: string) => (event: { target: { value: any; }; }) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    
    const handleSignUp = async (e: { preventDefault: () => void; } | undefined) => {
        e?.preventDefault()
        if(!values.email || !values.name || !values.password){
            toast({
                variant: "destructive",
                title: "Error",
                description: "Fill up the missing fields",
            })
        }else if(values.password.length < 6){
            toast({
                variant: "destructive",
                title: "Error",
                description: "Password must be greater that 6 characteres",
            })
        }else{
            createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                updateProfile(user, {
                    displayName: values.name,
                    photoURL: "https://github.com/shadcn.png"
                }).then(() => {
                    setDoc(doc(db, "users", user.uid), {
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photo: user.photoURL
                    });
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });
        }
    }

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
                        Streamline<span className="text-[#5cc400]">Recruit</span>
                        </span>! Your Ultimate Online Recruitment Solution</h1>
                    <p className='text-slate-500 text-justify mt-4 text-base'>Are you tired of sifting through countless resumes, conducting endless interviews, and struggling to find the perfect candidate for your organization? Look no further! StreamlineRecruit is here to revolutionize your hiring process and empower your HR team with an efficient online recruitment solution.</p>
                </div>
            </div>
            <div className='lg:w-1/2 p-4'>
                <div className='mx-auto flex flex-col gap-8 lg:w-1/2'>
                    <div>
                    <h1 className='text-2xl font-medium'>Create an Account</h1>
                    <p className='text-sm text-slate-500'>Enter your credentials to create a new account</p>
                    </div>
                    <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <h1 className=''>Name</h1>
                            <input value={values.name} type="text" required onChange={handleChange('name')} className='w-full p-4 text-slate-500 outline-none border border-slate-400 rounded' placeholder='Full Name'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className=''>Email</h1>
                            <input value={values.email} type='email' required onChange={handleChange('email')} className='w-full p-4 text-slate-500 outline-none border border-slate-400 rounded' placeholder='example@gmail.com'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className=''>Password</h1>
                            <input value={values.password} required onChange={handleChange('password')} type='password' className='w-full p-4 text-slate-500 outline-none border border-slate-400 rounded' placeholder='password'/>
                        </div>
                        <div>
                            <button onClick={handleSignUp} className="w-full p-4 text-sm bg-lime-500 hover:bg-lime-600 transition-all duration-300 rounded cursor-pointer text-white font-medium">Sign Up</button>
                        </div>
                        <h1 className='text-center'>Already have an account?<span className='text-lime-500 cursor-pointer hover:underline'> Login</span> </h1>
                    </form>
                </div>
            </div>
            </main>
    )
}

export default SignUp