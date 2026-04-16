import type { Job } from "@/lib/mockData";

const statusStyles: Record<Job["status"], string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Processing: "bg-amber-50 text-amber-700",
  Queued: "bg-blue-50 text-blue-700",
  Failed: "bg-red-50 text-red-700",
};

interface Props {
  jobs: Job[];
}

const JobTable = ({ jobs }: Props) => (
  <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-5 py-3 text-left font-medium text-muted-foreground">Cycle</th>
            <th className="px-5 py-3 text-left font-medium text-muted-foreground">ProductCode</th>
            <th className="px-5 py-3 text-left font-medium text-muted-foreground">ProductName</th>
            <th className="px-5 py-3 text-left font-medium text-muted-foreground">OutputPath</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30">
              <td className="px-5 py-3.5">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[job.status]}`}>
                  {job.status}
                </span>
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">{job.cycle}</td>
              <td className="px-5 py-3.5 font-mono text-xs">{job.productCode}</td>
              <td className="px-5 py-3.5 font-medium text-foreground">{job.productName}</td>
              <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{job.outputPath}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default JobTable;
