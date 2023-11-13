import { useState } from "react"


const signup = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("")
const signUpHandler =async()=>{
    const res=await fetch("/auth/signup" ,{
        method : "POST",
        body : JSON.stringify({email , password}),
        headers : {"Content-Type" : "application/json"}
    })
    const data = await res.json();
    console.log(data)
}
  return (
    <div>
      <h4>Registerition Form</h4>
      <input placeholder='Email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={signUpHandler}>Sing Up</button>
    </div>
  )
}

export default signup
