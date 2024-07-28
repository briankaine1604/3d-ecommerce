import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  src: z.string().min(1),
  imgPath: z.string().min(1),
  scale: z.coerce.number().min(0),
  price: z.coerce.number().min(1),
  color: z.string().optional(),
  description: z.string().optional(),
});
