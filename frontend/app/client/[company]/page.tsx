"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { mockCompanies, mockProducts } from "@/lib/mockData";
import { Plus, Pencil, ChevronLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const { company } = useParams() as {
    company: string;
  };

  const companyData = mockCompanies.find(
    (c) => c.slug.toLowerCase() === company.toLowerCase()
  );

  const products = mockProducts.filter(
    (p) => p.companySlug.toLowerCase() === company.toLowerCase()
  );

  if (!companyData) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Company not found.</p>
        <Link
          href="/client"
          className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" /> Back to clients
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-full">
      <Link
        href="/client"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Clients
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {companyData.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              router.push(`/client/${company}/product/add`)
            }
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>

          <button
            onClick={() =>
              router.push(`/client/${company}/company/edit`)
            }
            className="flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Pencil className="h-4 w-4" /> Edit Company
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex items-center justify-center rounded-2xl border border-dashed py-16">
          <p className="text-muted-foreground">No products yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}