import { SentinelPage } from "@/components/products/SentinelPage";
import { productMetadata } from "@/lib/seo";

export const metadata = productMetadata("sentinel", "en");

export default function Page() {
  return <SentinelPage lang="en" />;
}
