import React from "react";
import { ImageCard } from "./image-card";
import { ProductType } from "@/constants";
import { removeItem, updateItemInCart } from "@/store/cartStore";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { formatter } from "@/lib/utils";

type Props = Omit<ProductType, "scale" | "src"> & {
  quantity: number;
  refetch: () => void;
};

enum ACTIONS {
  ADD,
  REMOVE,
}

export function CartCard(props: Props) {
  function handleUpdate(action: ACTIONS) {
    if (action === ACTIONS.ADD) {
      updateItemInCart({ id: props.id, updatedQuantity: props.quantity + 1 });
    } else if (action === ACTIONS.REMOVE) {
      if (props.quantity === 1) {
        const response = confirm(`Remove ${props.name} from Cart?`);
        if (response) {
          removeItem(props.id);
        }
      } else {
        updateItemInCart({ id: props.id, updatedQuantity: props.quantity - 1 });
      }
    }
    props.refetch();
  }
  return (
    <div className="grid grid-cols-4  items-center md:text-lg text-sm">
      <Image width={200} height={200} src={props.imgPath} alt="3d image" />

      <div>{props.name}</div>

      <div> {formatter.format(props.price)}</div>
      <div className="flex gap-x-2 items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            handleUpdate(ACTIONS.REMOVE);
          }}
        >
          <span>-</span>
        </Button>
        <span>{String(props.quantity)}</span>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            handleUpdate(ACTIONS.ADD);
          }}
        >
          <span>+</span>
        </Button>
      </div>
    </div>
  );
}
