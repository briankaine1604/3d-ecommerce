// components/footer.tsx
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16 mt-20">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-8">
          <Link href="#" className="text-gray-400 hover:text-gray-100">
            <Twitter />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-100">
            <Instagram />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-100">
            <Facebook />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-100">
            <Linkedin />
          </Link>
        </div>
        <p>&copy; 2024 3D Haven. All rights reserved.</p>
      </div>
    </footer>
  );
};
