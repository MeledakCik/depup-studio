import { OfficePage } from "@/components/products/OfficePage";
import { productMetadata } from "@/lib/seo";

export const metadata = productMetadata("office", "en");

export default function Page() {
  return <OfficePage lang="en" />;
}
