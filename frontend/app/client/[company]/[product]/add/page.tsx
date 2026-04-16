"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
// เพิ่มการ import mockCompanies เข้ามาเพื่อให้โค้ดไม่ error
import { preprocessOptions, mockCompanies } from "@/lib/mockData"; 
import { ChevronLeft, Sparkles, Check } from "lucide-react";

export default function Page() {
  // 1. จัดการ State ของ Form ทั้งหมด
  const [form, setForm] = useState({
    productCode: "",
    productName: "",
    workflowName: "",
    preprocess: preprocessOptions[0],
    dataName: "",
    dataType: "",
    postLicense: "",
    postName: "",
    archiveViewer: false,
    etax: false,
    returnMail: false,
    hidden: false,
    inputOption: false,
    information: "",
  });

  // 2. ดึงค่า Params และข้อมูลบริษัท
  const params = useParams();
  const company = params?.company as string; 
  
  const companyData = mockCompanies.find(
    (c) => c.slug.toLowerCase() === company?.toLowerCase()
  );
  const set = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));


  const inputClass =
    "h-9 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all";
  const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";

  return (
    <div className="animate-fade-in flex min-h-[90vh] w-full flex-col items-center justify-center pb-10">
      <div className="w-full max-w-3xl px-4">
        
        {/*BACK BUTTON */}
        <Link
          href={`/client/${company}`} 
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> 
          {/* ถ้าเจอข้อมูลบริษัทให้โชว์ชื่อ ถ้าไม่เจอให้โชว์คำว่า Back */}
          {companyData ? companyData.name : "Back"}
        </Link>

        {/* ส่วนหัวของหน้า */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Add Product</h1>
          <p className="text-sm text-muted-foreground">
            Create a new document product for this client.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Product Code</label>
              <input
                className={inputClass}
                value={form.productCode}
                onChange={(e) => set("productCode", e.target.value)}
                placeholder="e.g. INV-009"
              />
            </div>
            <div>
              <label className={labelClass}>Product Name</label>
              <input
                className={inputClass}
                value={form.productName}
                onChange={(e) => set("productName", e.target.value)}
                placeholder="e.g. Monthly Invoice"
              />
            </div>
            <div>
              <label className={labelClass}>Workflow Name</label>
              <input
                className={inputClass}
                value={form.workflowName}
                onChange={(e) => set("workflowName", e.target.value)}
                placeholder="Standard Workflow"
              />
            </div>
            <div>
              <label className={labelClass}>Preprocess</label>
              <select
                className={inputClass}
                value={form.preprocess}
                onChange={(e) => set("preprocess", e.target.value)}
              >
                {preprocessOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Data Name</label>
              <input
                className={inputClass}
                value={form.dataName}
                onChange={(e) => set("dataName", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Data Type</label>
              <input
                className={inputClass}
                value={form.dataType}
                onChange={(e) => set("dataType", e.target.value)}
                placeholder="CSV, XML, JSON..."
              />
            </div>
            <div>
              <label className={labelClass}>Post License</label>
              <input
                className={inputClass}
                value={form.postLicense}
                onChange={(e) => set("postLicense", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Post Name</label>
              <input
                className={inputClass}
                value={form.postName}
                onChange={(e) => set("postName", e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <p className={labelClass}>Options</p>
            <div className="flex flex-wrap gap-3 mt-1">
              {(
                [
                  "archiveViewer",
                  "etax",
                  "returnMail",
                  "hidden",
                  "inputOption",
                ] as const
              ).map((key) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm transition-all hover:bg-secondary has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <input
                    type="checkbox"
                    className="sr-only" // ซ่อน checkbox มาตรฐาน
                    checked={form[key]}
                    onChange={(e) => set(key, e.target.checked)}
                  />
                  {/* Custom Checkbox UI */}
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                      form[key]
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {form[key] && <Check className="h-3 w-3" />}
                  </div>
                  <span className="text-foreground">
                    {key
                      .replace(/([A-Z])/g, " $1") // แปลง camelCase เป็นช่องว่าง
                      .replace(/^./, (s) => s.toUpperCase())} {/* ตัวแรกเป็นตัวใหญ่ */}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ช่องกรอกข้อมูลเพิ่มเติม */}
          <div className="mt-6">
            <label className={labelClass}>Information</label>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              value={form.information}
              onChange={(e) => set("information", e.target.value)}
              placeholder="Additional details..."
            />
          </div>

          {/* ปุ่มยืนยันการสร้างสินค้าใหม่ */}
          <div className="mt-8 flex gap-3 justify-end">
            <button className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary active:scale-95">
              <Sparkles className="h-4 w-4 text-primary" /> AutoGen
            </button>
            <button className="rounded-xl bg-primary px-8 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/10">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}