"use client";
import { useCallback, useEffect, useState } from "react";

import { getAllFiles } from "@/actions/getAllFiles";
import { CartCard } from "@/components/cart-card";
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/constants";
import { formatter } from "@/lib/utils";
import { getCartItems } from "@/store/cartStore";

type Item = ProductType & {
  quantity: number;
};

const Cart = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [products, setProducts] = useState<{ [key: string]: ProductType }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList: ProductType[] = await getAllFiles();

      const productsMap = productsList.reduce(
        (acc, product) => {
          const { createdAt, ...rest } = product;
          acc[product.id] = rest;
          return acc;
        },
        {} as { [key: string]: ProductType }
      );

      setProducts(productsMap);
    };

    fetchProducts();
  }, []);

  const fetchCartItems = useCallback(() => {
    const cartItems = getCartItems();
    setItems(
      cartItems.map((item) => {
        const product = products[item.id];

        return {
          ...product,
          quantity: item.quantity,
        };
      })
    );
  }, [products]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  if (items.length === 0) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <span className=" text-xl font-semibold">Add Items to Cart</span>
      </div>
    );
  }

  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <div className="bg-gray-50/80 w-full min-h-screen">
      <Container className="py-10 mb-10">
        <h1 className="text-2xl font-semibold">Shopping cart</h1>
        <Card className=" p-5 my-5">
          <div className="grid grid-cols-4 items-center md:text-lg font-medium  md:font-semibold text-sm ">
            <div className=""></div>
            <div className="  ">Name</div>
            <div className="">Price</div>
            <div className="">Quantity</div>
          </div>
          <div className="px-10">
            <Separator className=" my-3" />
          </div>
          {items.map((item) => (
            <CartCard
              key={item.id}
              id={item.id}
              imgPath={item.imgPath}
              price={item.price}
              name={item.name}
              quantity={item.quantity}
              refetch={fetchCartItems}
            />
          ))}

          <div className="mt-5 flex justify-end w-full gap-x-3 items-center">
            <div className="font-bold text-xl">Total Price</div>
            <div className=" font-bold text-gray-700 text-xl">
              {formatter.format(totalPrice)}
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Cart;
