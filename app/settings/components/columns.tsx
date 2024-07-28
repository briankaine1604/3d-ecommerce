"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  imgPath: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imgPath",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Image
            src={row.getValue("imgPath")}
            alt="Product Image"
            className="object-cover"
            width={60}
            height={60}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />, // row.original is from tanstack for accessing original object
  },
];
