import { getFileById } from "@/actions/getFilebyId";
import { Productform } from "./components/form";

const Page = async ({ params }: { params: { fileId: string } }) => {
  const product = await getFileById(params.fileId);

  if (!product) {
    return <div>No product found.</div>;
  }

  return <Productform initialData={product} />;
};

export default Page;
