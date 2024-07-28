"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ClientProps {
  data: ProductColumn[];
}
export const ProductClient: React.FC<ClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className=" text-xl font-semibold">Product page</h1>

        <Button onClick={() => router.push(`/settings/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new{" "}
        </Button>
      </div>
      <Separator className=" my-3" />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
