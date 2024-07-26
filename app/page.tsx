"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page(){
  const router = useRouter()
  const [accessGranted, setAccessGranted] = useState(false)
  
  const handleAccess = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/access-control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'oscar', resource: '/protected/content' }),
    });
    const data = await response.json();
    
    if (data.granted) {
      setAccessGranted(true);
      router.push("/protected/content");
    } else {
      alert('Access Denied');
    }
  }
  
  return(
    <div className="align-center m-4">
      <div className="text-6xl text-center my-6">
        Hello World
      </div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
      onClick={handleAccess}>
        Visit Protected Content
      </button>
    </div>
  )
}
