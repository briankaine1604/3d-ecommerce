"use client";
import {
  Environment,
  Gltf,
  MeshPortalMaterial,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Container, Content, Fullscreen, Text } from "@react-three/uikit";

import { getFileById } from "@/actions/getFilebyId";
import { Button } from "@/components/button";
import { Defaults } from "@/components/theme";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/constants";
import { addItemToCart } from "@/store/cartStore";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Info from "@/components/Info";

const Details = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getFileById(id);
        if ("error" in details) {
          toast.error("Failed to fetch product details");
        } else {
          setProductDetails(details);
          useGLTF.preload(details.src);
        }
      } catch (error) {
        toast.error("An error occurred while fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className=" w-full h-full">
        <Skeleton className=" w-1/2 max-h-[300px] mx-auto" />
      </div>
    );
  }

  if (!productDetails) {
    return <div className=" text-xl font-semibold">Product not found</div>;
  }

  return (
    <div className=" grid md:grid-cols-2">
      <div className="border px-5">
        <Canvas
          flat
          gl={{ localClippingEnabled: true }}
          style={{ height: "80dvh", touchAction: "none" }}
          className=""
        >
          <Defaults>
            <ambientLight />
            <Environment preset="sunset" />
            <OrbitControls />
            <Fullscreen>
              <Container
                width={"100%"}
                height={"100%"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Content width={"100%"} height={"100%"}>
                  <mesh>
                    <planeGeometry />
                    <MeshPortalMaterial>
                      <Environment preset="sunset" />
                      <Gltf
                        position-y={-0.5}
                        src={productDetails.src}
                        scale={productDetails.scale}
                      />
                      <PerspectiveCamera makeDefault position={[-3, 0, 4]} />
                      <OrbitControls />
                    </MeshPortalMaterial>
                  </mesh>
                </Content>
              </Container>
            </Fullscreen>
          </Defaults>
        </Canvas>
      </div>
      <div>
        <Info data={productDetails} />
      </div>
    </div>
  );
};

export default Details;
