"use client"
import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter()
    return(
        <div className="m-4">
            <div className="text-6xl my-6 text-center">
                Protected Content
            </div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => router.back()}>
                Return
            </button>
        </div>
    )
}