import { CloudPage } from "@/components/products/CloudPage";
import { productMetadata } from "@/lib/seo";

export const metadata = productMetadata("cloud", "en");

export default function Page() {
  return <CloudPage lang="en" />;
}
