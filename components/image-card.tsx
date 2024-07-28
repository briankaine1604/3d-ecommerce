import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { ProductType } from "@/constants";

type Props = Pick<ProductType, "imgPath"> & {
  width: number;
  height: number;
  onClick?: () => void;
};

export function ImageCard({ onClick, imgPath, width, height }: Props) {
  return (
    <Card>
      <CardContent>
        <Image
          src={imgPath}
          width={width}
          height={height}
          onClick={onClick}
          alt="Image"
        />
      </CardContent>
    </Card>
  );
}
