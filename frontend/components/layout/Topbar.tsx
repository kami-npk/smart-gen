"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Users, Search, LogIn, Zap, X } from "lucide-react";
import { mockCompanies, mockProducts } from "@/lib/mockData";

const Topbar = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = query.toLowerCase();

  const companyResults = q
    ? mockCompanies.filter(c => c.name.toLowerCase().includes(q))
    : [];

  const productResults = q
    ? mockProducts.filter(
        p =>
          p.productName.toLowerCase().includes(q) ||
          p.productCode.toLowerCase().includes(q)
      )
    : [];

  return (
  <header className="px-32 sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
    <div className="flex h-16 max-w-8xl mx-auto items-center gap-4 px-6">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
        <Zap className="h-5 w-5 text-blue-600" />
        <span className="hidden sm:inline">Smart GEN</span>
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-1">
        <Link href="/" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Home className="h-4 w-4" /> <span className="hidden sm:inline">Job Queue</span>
        </Link>
        <Link href="/client" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Users className="h-4 w-4" /> <span className="hidden sm:inline">Clients</span>
        </Link>
      </nav>

      {/* Search Input Area */}
      <div ref={ref} className="relative ml-auto flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search companies or products..."
          value={query}
          onChange={e => { setQuery(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
        {query && (
          <button onClick={() => { setQuery(""); setShowResults(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Search Results Dropdown */}
        {showResults && q && (companyResults.length > 0 || productResults.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100">
            
            {/* Companies Section */}
            {companyResults.length > 0 && (
              <div className="mb-2">
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Companies</p>
                {companyResults.map(c => (
                  <button key={c.id} onClick={() => { router.push(`/client/${c.slug}`); setQuery(""); setShowResults(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Users className="h-4 w-4 text-gray-400" /> {c.name}
                  </button>
                ))}
              </div>
            )}

            {/* Products Section */}
            {productResults.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Products</p>
                {productResults.map(p => {
                  const company = mockCompanies.find(c => c.slug === p.companySlug);
                  return (
                    <button key={p.id} onClick={() => { router.push(`/client/${p.companySlug}/${p.productCode}`); setQuery(""); setShowResults(false); }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className=" text-black-400">{p.productName}</span>
                      <span className="text-xs text-gray-400">{company?.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Button */}
      <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-95">
        <LogIn className="h-4 w-4" /> Login
      </button>
    </div>
  </header>
);
}

export default Topbar;