import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className=" min-h-screen grid lg:grid-cols-2 grid-cols-1">
      <div className=" h-full justify-center items-center lg:flex flex-col px-4">
        <div className=" text-center space-y-4 pt-16">
          <h1 className=" text-3xl font-bold text-[#2E2A47]">Welcome back!</h1>
          <p className=" text-[#7E8CA0]">
            Login or create account to get back to your dashboard!
          </p>
        </div>
        <div className=" flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className=" animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className=" h-full bg-blue-500 hidden lg:flex items-center justify-center">
        <div className="text">3D Storefront</div>
      </div>
    </div>
  );
}
