// ==========================================
// MOCK DATA — Replace with real API calls
// ==========================================

export interface Job {
  id: string;
  status: "Completed" | "Processing" | "Queued" | "Failed";
  cycle: string;
  productCode: string;
  productName: string;
  outputPath: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
}

export interface Product {
  id: string;
  companySlug: string;
  productCode: string;
  productName: string;
  workflowName: string;
  preprocess: string;
  dataName: string;
  dataType: string;
  postLicense: string;
  postName: string;
  archiveViewer: boolean;
  etax: boolean;
  returnMail: boolean;
  hidden: boolean;
  inputOption: boolean;
  information: string;
}

export const mockJobs: Job[] = [
  { id: "1", status: "Completed", cycle: "2026-04-09", productCode: "INV-001", productName: "Monthly Invoice", outputPath: "/output/invoices/apr2026" },
  { id: "2", status: "Processing", cycle: "2026-04-09", productCode: "STM-002", productName: "Account Statement", outputPath: "/output/statements/apr2026" },
  { id: "3", status: "Queued", cycle: "2026-04-08", productCode: "RPT-003", productName: "Annual Report", outputPath: "/output/reports/2026" },
  { id: "4", status: "Failed", cycle: "2026-04-08", productCode: "NTF-004", productName: "Tax Notification", outputPath: "/output/tax/apr2026" },
  { id: "5", status: "Completed", cycle: "2026-04-07", productCode: "POL-005", productName: "Policy Document", outputPath: "/output/policies/apr2026" },
  { id: "6", status: "Completed", cycle: "2026-04-07", productCode: "CNT-006", productName: "Contract Agreement", outputPath: "/output/contracts/apr2026" },
  { id: "7", status: "Queued", cycle: "2026-04-06", productCode: "CRT-007", productName: "Certificate", outputPath: "/output/certs/apr2026" },
  { id: "8", status: "Processing", cycle: "2026-04-06", productCode: "LTR-008", productName: "Welcome Letter", outputPath: "/output/letters/apr2026" },
];

export const mockCompanies: Company[] = [
  { id: "1", name: "Acme Corporation", slug: "acme", logoUrl: "" },
  { id: "2", name: "GlobalBank Inc.", slug: "globalbank", logoUrl: "" },
  { id: "3", name: "TechVault Solutions", slug: "techvault", logoUrl: "" },
  { id: "4", name: "MediCare Plus", slug: "medicare", logoUrl: "" },
  { id: "5", name: "InsureAll Group", slug: "insureall", logoUrl: "" },
  { id: "6", name: "EduPrime Systems", slug: "eduprime", logoUrl: "" },
];

export const mockProducts: Product[] = [
  { id: "1", companySlug: "acme", productCode: "INV-001", productName: "Monthly Invoice", workflowName: "InvoiceFlow", preprocess: "PDF Merge", dataName: "invoice_data", dataType: "CSV", postLicense: "Standard", postName: "EmailPost", archiveViewer: true, etax: false, returnMail: false, hidden: false, inputOption: true, information: "Generates monthly invoices for all Acme clients." },
  { id: "2", companySlug: "acme", productCode: "STM-002", productName: "Account Statement", workflowName: "StatementFlow", preprocess: "Data Transform", dataName: "statement_data", dataType: "XML", postLicense: "Premium", postName: "PrintPost", archiveViewer: true, etax: true, returnMail: true, hidden: false, inputOption: false, information: "Quarterly account statements with e-tax integration." },
  { id: "9", companySlug: "acme", productCode: "RCV-009", productName: "Receipt Voucher", workflowName: "ReceiptFlow", preprocess: "None", dataName: "receipt_data", dataType: "CSV", postLicense: "Standard", postName: "EmailPost", archiveViewer: false, etax: true, returnMail: false, hidden: false, inputOption: true, information: "Digital receipt vouchers for payments." },
  { id: "10", companySlug: "acme", productCode: "DNT-010", productName: "Donation Certificate", workflowName: "DonationFlow", preprocess: "PDF Merge", dataName: "donation_data", dataType: "JSON", postLicense: "Premium", postName: "PrintPost", archiveViewer: true, etax: false, returnMail: true, hidden: false, inputOption: false, information: "Annual donation tax certificates." },
  { id: "3", companySlug: "globalbank", productCode: "RPT-003", productName: "Annual Report", workflowName: "ReportFlow", preprocess: "None", dataName: "report_data", dataType: "JSON", postLicense: "Standard", postName: "ArchivePost", archiveViewer: false, etax: false, returnMail: false, hidden: false, inputOption: true, information: "Annual financial reports." },
  { id: "4", companySlug: "globalbank", productCode: "NTF-004", productName: "Tax Notification", workflowName: "TaxFlow", preprocess: "PDF Merge", dataName: "tax_data", dataType: "CSV", postLicense: "Premium", postName: "EmailPost", archiveViewer: true, etax: true, returnMail: false, hidden: false, inputOption: false, information: "Tax notification documents for customers." },
  { id: "11", companySlug: "globalbank", productCode: "LON-011", productName: "Loan Statement", workflowName: "LoanFlow", preprocess: "Data Transform", dataName: "loan_data", dataType: "XML", postLicense: "Standard", postName: "PrintPost", archiveViewer: true, etax: false, returnMail: true, hidden: false, inputOption: true, information: "Monthly loan repayment statements." },
  { id: "5", companySlug: "techvault", productCode: "POL-005", productName: "Policy Document", workflowName: "PolicyFlow", preprocess: "Data Transform", dataName: "policy_data", dataType: "XML", postLicense: "Standard", postName: "PrintPost", archiveViewer: false, etax: false, returnMail: true, hidden: false, inputOption: true, information: "Insurance policy documents." },
  { id: "12", companySlug: "techvault", productCode: "CLM-012", productName: "Claim Report", workflowName: "ClaimFlow", preprocess: "OCR Scan", dataName: "claim_data", dataType: "JSON", postLicense: "Premium", postName: "ArchivePost", archiveViewer: true, etax: false, returnMail: false, hidden: false, inputOption: false, information: "Insurance claim processing reports." },
  { id: "6", companySlug: "medicare", productCode: "CNT-006", productName: "Contract Agreement", workflowName: "ContractFlow", preprocess: "None", dataName: "contract_data", dataType: "JSON", postLicense: "Standard", postName: "EmailPost", archiveViewer: true, etax: false, returnMail: false, hidden: false, inputOption: false, information: "Healthcare service contracts." },
  { id: "13", companySlug: "medicare", productCode: "PRE-013", productName: "Prescription Summary", workflowName: "PrescriptionFlow", preprocess: "Template Parse", dataName: "prescription_data", dataType: "XML", postLicense: "Standard", postName: "PrintPost", archiveViewer: false, etax: false, returnMail: true, hidden: false, inputOption: true, information: "Patient prescription summary documents." },
  { id: "7", companySlug: "insureall", productCode: "CRT-007", productName: "Certificate", workflowName: "CertFlow", preprocess: "PDF Merge", dataName: "cert_data", dataType: "CSV", postLicense: "Premium", postName: "ArchivePost", archiveViewer: false, etax: false, returnMail: false, hidden: true, inputOption: true, information: "Insurance certificates." },
  { id: "14", companySlug: "insureall", productCode: "RNW-014", productName: "Renewal Notice", workflowName: "RenewalFlow", preprocess: "Data Transform", dataName: "renewal_data", dataType: "CSV", postLicense: "Standard", postName: "EmailPost", archiveViewer: true, etax: false, returnMail: false, hidden: false, inputOption: false, information: "Policy renewal notification letters." },
  { id: "8", companySlug: "eduprime", productCode: "LTR-008", productName: "Welcome Letter", workflowName: "LetterFlow", preprocess: "Data Transform", dataName: "letter_data", dataType: "XML", postLicense: "Standard", postName: "PrintPost", archiveViewer: false, etax: false, returnMail: true, hidden: false, inputOption: false, information: "Student welcome letters." },
  { id: "15", companySlug: "eduprime", productCode: "TRS-015", productName: "Transcript", workflowName: "TranscriptFlow", preprocess: "None", dataName: "transcript_data", dataType: "JSON", postLicense: "Premium", postName: "ArchivePost", archiveViewer: true, etax: false, returnMail: false, hidden: false, inputOption: true, information: "Official academic transcripts." },
  { id: "16", companySlug: "eduprime", productCode: "DPL-016", productName: "Diploma Certificate", workflowName: "DiplomaFlow", preprocess: "PDF Merge", dataName: "diploma_data", dataType: "CSV", postLicense: "Premium", postName: "PrintPost", archiveViewer: true, etax: false, returnMail: true, hidden: false, inputOption: false, information: "Graduation diploma certificates." },
];

export const preprocessOptions = ["None", "PDF Merge", "Data Transform", "OCR Scan", "Template Parse"];