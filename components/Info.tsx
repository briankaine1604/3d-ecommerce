"use client";

import { ShoppingCart } from "lucide-react";
import React from "react";

import { Button } from "./ui/button";
import { addItemToCart } from "@/store/cartStore";
import { formatter } from "@/lib/utils";
import { ProductType } from "@/constants";
import { toast } from "react-toastify";

interface InfoProps {
  data: ProductType;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg ">
      <h1 className="text-4xl font-extrabold text-gray-900">{data.name}</h1>
      <div className="flex flex-col gap-y-6 mt-4">
        <div className="flex flex-col">
          <div className="text-3xl text-gray-900">
            {formatter.format(data.price)}
          </div>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
          <p className="text-justify mt-2 text-gray-700">{data.description}</p>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex items-center gap-x-4">
          <h3 className="text-lg font-semibold text-gray-900">Color:</h3>
          <div className="text-lg text-gray-700">{data.color}</div>
        </div>
      </div>
      <div className="flex items-center mt-10 gap-x-3">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addItemToCart({
              id: data.id,
              quantity: 1,
            });
            toast(`Added ${data.name} to Cart`);
          }}
          className="px-6 py-3 rounded-3xl text-white flex items-center gap-x-2 shadow-sm hover:cursor-pointer hover:shadow-lg transition-all duration-300"
        >
          <span>Add to Cart</span>
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Info;
