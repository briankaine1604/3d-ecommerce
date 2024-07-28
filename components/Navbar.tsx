import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Home, LogIn, Settings, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Container } from "./container";
import { Button } from "./ui/button";

type Props = {};

export function Navbar({}: Props) {
  return (
    <nav className="h-14 w-full bg-white fixed border-b z-50">
      <Container className="flex items-center justify-between ">
        <Button variant={"ghost"} className=" rounded-full">
          <Link href={"/"}>
            <Home className="text-blue-500 size-5" />
          </Link>
        </Button>
        <div className="flex gap-x-5">
          <Button variant={"ghost"} className=" rounded-full">
            <Link href={"/settings"}>
              <Settings className="text-blue-500 size-5" />
            </Link>
          </Button>
          <div className="flex items-center">
            <SignedOut>
              <SignInButton>
                <Button variant={"ghost"} className=" rounded-full">
                  <LogIn className="text-blue-500 size-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <Button variant={"ghost"} className=" rounded-full">
            <Link href={"/cart"}>
              <ShoppingCart className="text-blue-500 size-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </nav>
  );
}
