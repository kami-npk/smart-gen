// ==========================================
// API FUNCTIONS — Currently using mock data
// Uncomment and configure when backend is ready
// ==========================================

// import axios from 'axios';
// const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ---- JOBS ----

// GET /api/jobs
// export async function fetchJobs() {
//   const response = await axios.get(`${API_BASE}/jobs`);
//   return response.data;
// }

// ---- COMPANIES ----

// GET /api/companies (names only)
// export async function getCompanyNames() {
//   const response = await axios.get(`${API_BASE}/companies/names`);
//   return response.data;
// }

// GET /api/companies/logos
// export async function getCompanyLogos() {
//   const response = await axios.get(`${API_BASE}/companies/logos`);
//   return response.data;
// }

// ---- PRODUCTS ----

// GET /api/products?company={slug}
// export async function getProducts(companySlug: string) {
//   const response = await axios.get(`${API_BASE}/products`, { params: { company: companySlug } });
//   return response.data;
// }

// POST /api/products
// export async function createProduct(product: any) {
//   const response = await axios.post(`${API_BASE}/products`, product);
//   return response.data;
// }

// PUT /api/products/:id
// export async function updateProduct(id: string, product: any) {
//   const response = await axios.put(`${API_BASE}/products/${id}`, product);
//   return response.data;
// }

// ---- FILE UPLOAD / GENERATION ----

// POST /api/generate
// export async function handleFileUpload(file: File, productId: string) {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('productId', productId);
//   const response = await axios.post(`${API_BASE}/generate`, formData);
//   return response.data;
// }