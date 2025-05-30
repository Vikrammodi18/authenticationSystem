import { useEffect, useState } from "react"

function Login(){
    const [isVerified,setIsVerified] = useState("")
    const[email,setEmail] = useState()
    const [password,setPassword] = useState()
    const fetchedData = async ()=>{
        const url = "http://localhost:3000/api/v1/users/login"

        const response = await fetch(url,{
            method:"POST",
            headers:{"content-type":"application/json"},
            credentials:"include",
            body: JSON.stringify({
                email : email,
                password: password
            })
        })
        const responsedata = await response.json()
        console.log(responsedata)
        if(responsedata.success === true){
            alert ("successfull login")
        }else{
            setIsVerified(responsedata.message)
           
        }
        
    }
    const submitForm = async()=>{
        
        fetchedData()
    }
   

    return(
        <>

        <div className=" w-full h-screen border-2 flex flex-wrap justify-center content-center bg-blue-100">
            
            <div className="w-sm h-70 shadow-xl rounded-xl px-5 py-5 flex flex-wrap justify-center content-center bg-white ">
                
            <div>
            <h1 className="text-center mb-2 text-2xl">Login</h1>
                <div className="inline-block border-2 rounded px-2">
                    <label htmlFor="email">Email:</label>
                    <input className="outline-none px-3 py-2" onChange={(e)=>{setEmail(e.target.value)}} type="text" id='email' name="" placeholder="enter email"/>
                </div>
                   
                <div className="border-2 rounded px-2 my-2">
                    <label htmlFor="password">password:</label>
                    <input className="outline-none px-3 py-2" type="password" onChange={(e)=>{setPassword(e.target.value)}} name="" placeholder="enter password" id="password" />
                </div>
                <p className="text-center text-red-700">{isVerified}</p>
                <button onClick={()=>{submitForm()}} className="border-1 px-1 py-1 rounded-lg">submit</button>
                
            </div>
            </div>
        </div>
        </>
    )
}

export default Login