"use client";

import { useRouter } from "next/navigation";
import { FileText, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/mockData";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/client/${product.companySlug}/${product.productCode}`)}
      className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-5 shadow-card transition-all hover:shadow-elevated hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <FileText className="h-5 w-5" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-foreground">{product.productName}</p>
          <p className="text-xs text-muted-foreground">
            {product.productCode} · {product.workflowName}
          </p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
};

export default ProductCard;