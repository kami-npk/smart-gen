"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockProducts, mockCompanies } from "@/lib/mockData";
import { ChevronLeft, Upload, FolderOpen, FileOutput } from "lucide-react";

// แก้ไข Type เพื่อให้ React ยอมรับ attribute พิเศษ
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

export default function Page() {
  const params = useParams();
  const company = params?.company as string;
  const product = params?.product as string;

  const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const companyData = useMemo(() => 
    mockCompanies.find((c) => c.slug.toLowerCase() === company?.toLowerCase()),
    [company]
  );

  const productData = useMemo(() => 
    mockProducts.find((p) =>
      p.companySlug.toLowerCase() === company?.toLowerCase() &&
      p.productCode.toLowerCase() === product?.toLowerCase()
    ),
    [company, product]
  );

  // --- Logic การคำนวณ Path (จุดสำคัญที่แก้ไข) ---
  const paths = useMemo(() => {
    if (!selectedFolderName) return { input: "", output: "", log: "" };

    const baseRoot = "C:\\Venus\\Data\\Financials";
    const timeStamp = new Date().toISOString().replace(/[-:T]/g, '.').slice(0, -1);
    
    // 1. Input Path: คือ Folder ที่เราเลือก
    const inputPath = `${baseRoot}\\${selectedFolderName}`;
    
    // 2. Output Path: ถอยหลัง 1 Folder (cd ..) แล้วเข้า /Output
    // จาก "C:\Venus\Data\Financials\MyFolder" กลายเป็น "C:\Venus\Data\Financials\Output"
    const outputPath = `${baseRoot}\\Output\\%h03.%e`;
    
    return {
      input: inputPath,
      output: outputPath,
      log: `C:\\Venus\\ReportCenter\\ReportCenter_${timeStamp}.txt`
    };
  }, [selectedFolderName]);

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // ดึงชื่อ Root Folder ที่ผู้ใช้เลือกจาก Path เต็มของไฟล์แรก
      const relativePath = files[0].webkitRelativePath;
      const folderName = relativePath.split("/")[0];
      setSelectedFolderName(folderName);
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert("Generate Document Completed!");
    }, 2000);
  };

  if (!companyData || !productData) return null;

  return (
    <div className="w-full animate-fade-in pb-10">
      <Link href={`/client/${company}`} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> {companyData.name}
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{productData.productName}</h1>
        <p className="mt-1 text-base text-muted-foreground">{productData.productCode} · {productData.workflowName}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* คาร์ดเลือก Folder */}
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all hover:shadow-md">
          <div className="mb-6 flex items-center gap-3 text-foreground">
            <Upload className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Import Input Folder</h2>
          </div>

          <label className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border p-12 transition-all hover:border-primary/30 hover:bg-primary/5">
            <div className="rounded-full bg-secondary p-4 group-hover:scale-110 transition-transform">
              <FolderOpen className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-foreground mb-1">
                {selectedFolderName ? `Folder: ${selectedFolderName}` : "Select Directory"}
              </span>
              <span className="text-xs text-muted-foreground italic">Click to browse your local folder</span>
            </div>
            {/* INPUT นี้สำคัญมากสำหรับการเลือก Folder */}
            <input
              type="file"
              className="hidden"
              webkitdirectory=""
              directory=""
              onChange={handleFolderChange}
            />
          </label>
        </div>

        {/* ส่วนแสดง Path */}
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all hover:shadow-md">
          <div className="mb-6 flex items-center gap-3 text-foreground">
            <FileOutput className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Paths</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Input Directory</label>
              <input
                readOnly
                value={paths.input}
                placeholder="Folder Path will appear here"
                className="h-12 w-full rounded-xl border border-border bg-secondary px-4 text-xs font-mono text-foreground focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output Path (cd ..)</label>
              <input
                readOnly
                value={paths.output}
                placeholder="Auto-calculated (Parent + Output)"
                className="h-12 w-full rounded-xl border border-border bg-secondary px-4 text-xs font-mono text-foreground focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Log Path</label>
              <input
                readOnly
                value={paths.log}
                className="h-12 w-full rounded-xl border border-border bg-secondary px-4 text-[10px] font-mono text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          disabled={!selectedFolderName || generating}
          onClick={handleGenerate}
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Document"}
        </button>
      </div>
    </div>
  );
}