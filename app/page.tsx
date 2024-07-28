// pages/index.tsx
"use client";
import { getAllFiles } from "@/actions/getAllFiles";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/constants";
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
          <h1 className="text-4xl font-bold tracking-tight relative">
            Discover High-Quality 3D Models at{" "}
            <div className="mt-5 relative h-[100px] ">
              <div className="text text-blue-500 ">3D Haven</div>
            </div>
          </h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to 3D Haven, your ultimate destination for premium 3D
            models. Perfect for game development, virtual reality, 3D printing,
            and more.
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
                className="w-[270px] h-[200px] relative mx-auto shadow-sm bg-white rounded-md hover:cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <Image
                  src={product.imgPath}
                  alt="Image"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onClick={() => router.push(`/details/${product.id}`)}
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </Container>
      <Footer />
    </main>
  );
}
