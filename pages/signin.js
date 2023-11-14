import { useRouter } from "next/router";
import { useEffect, useState } from "react"


const signIn = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const router=useRouter();
  
    useEffect(()=>{
      fetch("/api/user").then(res => res.json()).then((data)=>{
        if(data.status === "success") window.location.href = "/dashbord";
      })
    },[])

const signInHandler =async()=>{
    const res=await fetch("/api/auth/signin" ,{
        method : "POST",
        body : JSON.stringify({email , password}),
        headers : {"Content-Type" : "application/json"}
    })
    const data = await res.json();
    if(data.status === "success") router.push("/dashbord")
    console.log(data)
}


  return (
    <div>
      <h4>Login Form</h4>
      <input placeholder='Email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={signInHandler}>Login</button>
    </div>
  )
}

export default signIn
