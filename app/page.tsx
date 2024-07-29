// pages/index.tsx
"use client";
import { getAllFiles } from "@/actions/getAllFiles";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/constants";
import { formatter } from "@/lib/utils";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsList: ProductType[] = await getAllFiles();

      const productsWithoutCreatedAt = productsList.map(
        ({ createdAt, ...rest }) => rest
      );

      setProducts(productsWithoutCreatedAt);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <main className=" bg-gray-50/80">
      <Container className="p-5 mb-20">
        <div className="py-20 text-center flex flex-col mx-auto items-center max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight relative">
            Experience Online Shopping Like Never Before at{" "}
            <div className="mt-5 relative h-[100px] ">
              <div className="text text-blue-500">3D Shopfront</div>
            </div>
          </h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to 3D Shopfront, the future of online shopping where
            products come to life through interactive 3D models. Gone are the
            days of static images—our innovative platform allows you to explore
            items from every angle, providing a realistic and immersive shopping
            experience.
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <Skeleton className="w-[270px] h-[200px] rounded-md mx-auto shadow-sm" />
            <Skeleton className="w-[270px] h-[200px] rounded-md mx-auto shadow-sm" />
            <Skeleton className="w-[270px] h-[200px] rounded-md mx-auto shadow-sm" />
            <Skeleton className="w-[270px] h-[200px] rounded-md mx-auto shadow-sm" />
            <Skeleton className="w-[270px] h-[200px] rounded-md mx-auto shadow-sm" />
            <Skeleton className="w-[270px] h-[200px] rounded-md mx-auto shadow-sm" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-fit bg-white rounded-xl shadow-sm hover:cursor-pointer hover:shadow-lg transition-all duration-300 mx-auto group"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <div className="w-[250px] h-[200px] relative overflow-hidden">
                  <Image
                    src={product.imgPath}
                    alt="Image"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="group-hover:scale-90 peer-hover:shadow-lg transition-all duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="text-black/50 text-lg">{product.name}</div>
                  <div className="text-md font-bold">
                    {formatter.format(product.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
      <Footer />
    </main>
  );
}
