"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Pencil, Plus, Save, Trash2, Box, Info } from "lucide-react";
import { mockProducts, type Product } from "@/lib/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// เพิ่ม Card component เพื่อจัดระเบียบ UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface WfdRow {
  moduleType: string;
  moduleName: string;
  fileName: string;
  engineName: string;
  isSplit: boolean;
  profileName: string;
  fileEncoding: string;
}

const profileOptions = ["Default", "High Performance", "Secure"];
const encodingOptions = ["None", "UTF-8", "ASCII", "Base64"];

export default function EditProductPage() {
  const params = useParams();
  const company = params?.company as string;

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [wfdRows, setWfdRows] = useState<WfdRow[]>([]);

  const companyProducts = useMemo(
    () => mockProducts.filter((p) => p.companySlug.toLowerCase() === company?.toLowerCase()),
    [company]
  );

  const selectedProduct: Product | null = useMemo(
    () => companyProducts.find((p) => p.id === selectedProductId) ?? null,
    [companyProducts, selectedProductId]
  );

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    // จำลองการโหลดข้อมูล WFD ของ product นั้นๆ
    setWfdRows([
      { moduleType: "Input", moduleName: "Reader", fileName: "data.csv", engineName: "V1", isSplit: false, profileName: "Default", fileEncoding: "UTF-8" }
    ]); 
  };

  const updateRow = (index: number, field: keyof WfdRow, value: string | boolean) => {
    setWfdRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const addRow = () => setWfdRows((prev) => [...prev, { moduleType: "", moduleName: "", fileName: "", engineName: "", isSplit: false, profileName: "Default", fileEncoding: "None" }]);
  const removeRow = (index: number) => setWfdRows((prev) => prev.filter((_, i) => i !== index));

  const backPath = company ? `/client/${company}` : "/client";

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link href={backPath} className="group flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors w-fit">
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Company
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Product</h1>
            <p className="text-slate-500 mt-1">Configure Workflow Definitions (WFD) for your products.</p>
          </div>
        </div>

        {/* STEP 1: Selection Card - แยกก้อนนี้ออกมาไม่ให้ทับกับส่วนอื่น */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Box className="h-5 w-5 text-primary" />
              Product Selection
            </CardTitle>
            <CardDescription>Select a product to start editing its parameters.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="max-w-md">
              <Select onValueChange={handleSelectProduct} value={selectedProductId ?? undefined}>
                <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:ring-primary/20 transition-all">
                  <SelectValue placeholder="Select a product from this company" />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-white shadow-xl border-slate-200">
                  {companyProducts.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="py-3 cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{p.productCode}</span>
                        <span className="text-xs text-slate-500">{p.productName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>

        </Card>

        {/* STEP 2: Main Editor Section */}
        {!selectedProduct ? (
          <div className="flex flex-col items-center justify-center py-24 rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 animate-in fade-in zoom-in duration-300">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
              <Pencil className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-semibold">No Product Selected</h3>
            <p className="text-slate-500 text-sm mt-1">Choose a product above to manage its settings.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Table Card */}
            <Card className="border-none shadow-lg ring-1 ring-slate-200 overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">{selectedProduct.productName}</CardTitle>
                  <CardDescription className="font-mono text-[10px] uppercase tracking-wider">{selectedProduct.productCode}</CardDescription>
                </div>
                <div className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter flex items-center gap-1">
                  <Info className="h-3 w-3" /> WFD Editor Mode
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto overflow-y-visible"> {/* ปรับให้ dropdown ในตารางไม่ถูกตัด */}
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/30 hover:bg-slate-50/30 border-none">
                        <TableHead className="text-[11px] font-bold uppercase text-slate-400 py-4">Module Type</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase text-slate-400">Module Name</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase text-slate-400">File Name</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase text-slate-400">Engine</TableHead>
                        <TableHead className="text-center text-[11px] font-bold uppercase text-slate-400">Split</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase text-slate-400">Profile</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase text-slate-400">Encoding</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wfdRows.map((row, i) => (
                        <TableRow key={i} className="hover:bg-slate-50/50 border-slate-100 group transition-all">
                          <TableCell className="py-3">
                            <Input value={row.moduleType} onChange={(e) => updateRow(i, "moduleType", e.target.value)} className="h-9 text-sm rounded-lg border-slate-200 focus:bg-white transition-all" />
                          </TableCell>
                          <TableCell>
                            <Input value={row.moduleName} onChange={(e) => updateRow(i, "moduleName", e.target.value)} className="h-9 text-sm rounded-lg border-slate-200 focus:bg-white" />
                          </TableCell>
                          <TableCell>
                            <Input value={row.fileName} onChange={(e) => updateRow(i, "fileName", e.target.value)} className="h-9 text-sm rounded-lg border-slate-200 focus:bg-white" />
                          </TableCell>
                          <TableCell>
                            <Input value={row.engineName} onChange={(e) => updateRow(i, "engineName", e.target.value)} className="h-9 text-sm rounded-lg border-slate-200 focus:bg-white" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox checked={row.isSplit} onCheckedChange={(v) => updateRow(i, "isSplit", !!v)} className="rounded-md border-slate-300 data-[state=checked]:bg-primary" />
                          </TableCell>
                          <TableCell>
                            <Select value={row.profileName} onValueChange={(v) => updateRow(i, "profileName", v)}>
                              <SelectTrigger className="h-9 text-xs rounded-lg bg-white border-slate-200"><SelectValue /></SelectTrigger>
                              <SelectContent className="rounded-xl shadow-xl border-slate-200">
                                {profileOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select value={row.fileEncoding} onValueChange={(v) => updateRow(i, "fileEncoding", v)}>
                              <SelectTrigger className="h-9 text-xs rounded-lg bg-white border-slate-200"><SelectValue /></SelectTrigger>
                              <SelectContent className="rounded-xl shadow-xl border-slate-200">
                                {encodingOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => removeRow(i)} className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Final Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button variant="outline" onClick={addRow} className="rounded-xl px-6 border-slate-200 hover:bg-white hover:text-primary hover:border-primary/50 transition-all shadow-sm">
                <Plus className="mr-2 h-4 w-4" /> Add New Row
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={() => setSelectedProductId(null)} className="rounded-xl text-slate-500">Cancel</Button>
                <Button className="rounded-xl px-10 bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-200 active:scale-95 transition-all">
                  <Save className="mr-2 h-4 w-4" /> Save Configuration
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}