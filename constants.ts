import { useGLTF } from "@react-three/drei";
import { Timestamp } from "firebase/firestore";

export type ProductType = {
  id: string;
  src: string;
  name: string;
  scale?: number;
  price: number;
  imgPath: string;
  createdAt?: Date | Timestamp;
};
