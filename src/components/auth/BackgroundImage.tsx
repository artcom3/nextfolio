
import Image from "next/image"
import { Logo } from "../ui/logo/Logo"

interface Props {
  backgroundImage: string,
  quote?: string,
  quoteAuthor?: string
}

export const BackgroundImage = ({ backgroundImage, quote, quoteAuthor }: Props) => (
  <div className="hidden md:flex md:flex-1 relative">
    <Image
      src={ backgroundImage }
      alt="Fondo de inicio de sesión"
      fill
      sizes="75vw"
      style={{objectFit: "cover"}}
      priority
    />
    <div className="absolute inset-0 bg-black bg-opacity-30 p-8 flex flex-col justify-between text-white">
      <Logo />
      <div className="z-10">
        <blockquote className="text-xl">
          { quote }
        </blockquote>
        <p className="mt-2">{ quoteAuthor }</p>
      </div>
    </div>
  </div>
)