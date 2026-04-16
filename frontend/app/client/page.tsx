// app/client/page.tsx

import CompanyCard from "@/components/cilent/CompanyCard";
import { mockCompanies } from "@/lib/mockData";
import { Building2 } from "lucide-react";

// const companyNames = await getCompanyNames();
// const companyLogos = await getCompanyLogos();

export default function Page() {
  return (
    <div className="animate-fade-in w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Building2 className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">
            Clients
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Select a company to manage its document products.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {mockCompanies.map((c) => (
          <CompanyCard key={c.id} company={c} />
        ))}
      </div>
    </div>
  );
}