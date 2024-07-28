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
    <>
      <Canvas
        flat
        gl={{ localClippingEnabled: true }}
        style={{ height: "100dvh", touchAction: "none" }}
        className=" w-full border"
      >
        <Defaults>
          <ambientLight />
          <Environment preset="sunset" />
          <OrbitControls />
          <Fullscreen>
            <Container width={"100%"} height={"100%"} flexDirection={"column"}>
              <Container
                width={"100%"}
                height={"100%"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={20}
              >
                <Content
                  width={"100%"}
                  height={"70%"}
                  borderWidth={1}
                  marginTop={10}
                >
                  <mesh>
                    <planeGeometry />
                    <MeshPortalMaterial>
                      <Environment preset="sunset" />
                      <Gltf
                        position-y={-0.3}
                        src={productDetails.src}
                        scale={productDetails.scale}
                      />
                      <PerspectiveCamera makeDefault position={[0, 1, 4]} />
                      <OrbitControls />
                    </MeshPortalMaterial>
                  </mesh>
                </Content>
                <Container
                  width={"100%"}
                  height={"30%"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Container>
                    <Text marginRight={10}>Name</Text>
                    <Text fontWeight={"bold"}>{productDetails.name}</Text>
                  </Container>
                  <Container>
                    <Text marginRight={10}>Price</Text>
                    <Text fontWeight={"bold"}>
                      $ {productDetails.price.toFixed(2)}
                    </Text>
                  </Container>
                  <Button
                    backgroundColor={"hotpink"}
                    onClick={(e) => {
                      e.stopPropagation();
                      addItemToCart({
                        id: productDetails.id,
                        quantity: 1,
                      });
                      toast(`Added ${productDetails.name} to Cart`);
                    }}
                  >
                    <Text>Add to Cart</Text>
                  </Button>
                </Container>
              </Container>
            </Container>
          </Fullscreen>
        </Defaults>
      </Canvas>
    </>
  );
};

export default Details;
