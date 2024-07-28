import { getAllFiles } from "@/actions/getAllFiles";
import { Container } from "@/components/container";
import { ProductType } from "@/constants";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const Settings = async () => {
  const products = await getAllFiles();

  const formattedProducts: ProductColumn[] = products.map(
    (item: ProductType) => {
      let createdAtFormatted = "Date not available";
      if (item.createdAt instanceof Date) {
        createdAtFormatted = format(item.createdAt, "MMMM do, yyyy");
      } else if (item.createdAt && "seconds" in item.createdAt) {
        createdAtFormatted = format(
          new Date(item.createdAt.seconds * 1000),
          "MMMM do, yyyy"
        );
      }

      return {
        id: item.id,
        name: item.name,
        imgPath: item.imgPath,
        price: formatter.format(item.price),
        createdAt: createdAtFormatted,
      };
    }
  );

  return (
    <div className="bg-gray-50/80 w-full min-h-screen p-5">
      <Container>
        <div>
          <ProductClient data={formattedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default Settings;
