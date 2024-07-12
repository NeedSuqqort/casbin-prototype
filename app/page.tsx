"use client"
import { useRouter } from "next/navigation"

export default function Page(){
  const router = useRouter()
  return(
    <div className="align-center m-4">
      <div className="text-6xl text-center my-6">
        Hello World
      </div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
      onClick={() => router.push("/protected/content")}>
        Visit Protected Content
      </button>
    </div>
  )
}