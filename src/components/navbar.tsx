import Link from 'next/link'
import { Github, Menu, Package } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'
export const Navbar = () => {
  return (
    <nav className="fixed z-50 flex h-24 w-full items-center justify-between bg-white bg-opacity-30 px-4 py-10 backdrop-blur-md md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <Link href="/">
        <Package className="h-12 w-12" />
      </Link>

      <div className="hidden gap-1 md:flex md:gap-2 lg:gap-4">
        <Button variant="ghost" className="text-md font-semibold">
          <Link href="/">Home</Link>
        </Button>
        <Link href="/about">
          <Button variant="ghost" className="text-md font-semibold">
            Sobre
          </Button>
        </Link>
        <Link href="/privacy-policy">
          <Button variant="ghost" className="text-md font-semibold">
            Termos
          </Button>
        </Link>
      </div>

      <Link href="https://github.com/marciofrancalima/file-converter">
        <Button
          variant="default"
          size="lg"
          className="hidden w-fit items-center gap-2 rounded-full bg-green-600 md:flex"
        >
          <span>Github</span>
          <span className="text-xl">
            <Github />
          </span>
        </Button>
      </Link>

      {/* Mobile Nav */}
      <Sheet>
        <SheetTrigger className="block p-3 md:hidden">
          <span className="text-2xl">
            <Menu />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div>
                <Link href="/">
                  <Button
                    variant="link"
                    className="text-md w-full font-semibold"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="link"
                    className="text-md w-full font-semibold"
                  >
                    Sobre
                  </Button>
                </Link>
                <Link href="/privacy-policy">
                  <Button
                    variant="link"
                    className="text-md w-full font-semibold"
                  >
                    Termos
                  </Button>
                </Link>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
