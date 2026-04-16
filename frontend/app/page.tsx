// app/page.tsx

import JobTable from "@/components/table/JobTable";
import { mockJobs } from "@/lib/mockData";
import { Activity } from "lucide-react";

// GET /api/jobs
// const { data: jobs } = await fetchJobs();

export default function Page() {
  return (
    <div className="animate-fade-in w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Activity className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">
            Job Queue
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Monitor document generation jobs across all clients.
        </p>
      </div>

      <JobTable jobs={mockJobs} />
    </div>
  );
}