"use client";
import { addFile } from "@/actions/addFile";
import { addOrUpdateFileById } from "@/actions/updateFile";
import { Container } from "@/components/container";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { formSchema } from "../../schema";

type Props = {
  initialData?: any;
};

type ProductFormValues = z.infer<typeof formSchema>;

export function Productform({ initialData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          name: "",
          src: "",
          imgPath: "",
          scale: 1,
          price: 0,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    startTransition(() => {
      const fileId = Array.isArray(params.fileId)
        ? params.fileId[0]
        : params.fileId;
      if (initialData) {
        addOrUpdateFileById(fileId, data)
          .then((res) => {
            if (res.error) {
              toast.error(res.error);
              setIsLoading(false);
            }
            if (res.success) {
              toast.success("Product updated successfully!");
              setIsLoading(false);
              router.push("/settings");
              router.refresh();
            }
          })
          .catch(() => {
            setIsLoading(false);
            toast.error("Something went wrong");
          });
      } else {
        addFile(data)
          .then((res) => {
            if (res.error) {
              toast.error(res.error);
            }
            if (res.success) {
              toast.success("Product added successfully!");
              setIsLoading(false);
              router.push("/settings");
              router.refresh();
            }
          })
          .catch(() => {
            setIsLoading(false);
            toast.error("Something went wrong");
          });
      }
    });
  };

  return (
    <div className=" bg-gray-50/80 w-full min-h-screen">
      <Container className="p-5">
        <h2 className=" text-2xl font-semibold mb-5">Product Form</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Product Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Price" type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scale</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Scale" type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="src"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3D Model</FormLabel>
                    <FormControl>
                      <FileUpload
                        setUploading={setIsLoading}
                        onUpload={(url) => field.onChange(url)}
                        value={field.value ? [field.value] : []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imgPath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        setUploading={setIsLoading}
                        onUpload={(url) => field.onChange(url)}
                        value={field.value ? [field.value] : []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className=" mt-10 max-w-sm w-full"
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </Form>
      </Container>
    </div>
  );
}
