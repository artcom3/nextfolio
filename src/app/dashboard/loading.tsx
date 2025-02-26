import { Loader } from "lucide-react";

export default function Loading() {
  
  return (
    <div className="flex flex-row items-center">
      <Loader className="animate-spin h-5 w-5 mr-2 text-gray-600"/><p>Loading Data...</p>
    </div>
  )
}