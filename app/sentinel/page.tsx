import { SentinelPage } from "@/components/products/SentinelPage";
import { productMetadata } from "@/lib/seo";

export const metadata = productMetadata("sentinel", "id");

export default function Page() {
  return <SentinelPage lang="id" />;
}
