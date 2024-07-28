import Link from "next/link";
import React from "react";
import { Home, Settings, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Container } from "./container";

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
