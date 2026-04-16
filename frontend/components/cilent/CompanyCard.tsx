"use client";

import { useRouter } from "next/navigation";
import type { Company } from "@/lib/mockData";

interface Props {
  company: Company;
}

const CompanyCard = ({ company }: Props) => {
  const router = useRouter();

  const initials = company.name
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2);

  return (
  <button
    onClick={() => router.push(`/client/${company.slug}`)}
    className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all 
               hover:bg-secondary/100 hover:shadow-md hover:-translate-y-1"
  >
    {/* ส่วนของไอคอน/โลโก้ */}
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-transform group-hover:scale-110">
      {company.logoUrl ? (
        <img src={company.logoUrl} alt={company.name} className="h-10 w-10 rounded-lg object-contain" />
      ) : (
        <span className="text-xl font-bold">{initials}</span>
      )}
    </div>

    {/* ชื่อบริษัท */}
    <span className="text-sm font-medium text-foreground">{company.name}</span>
  </button>
);
}

export default CompanyCard;