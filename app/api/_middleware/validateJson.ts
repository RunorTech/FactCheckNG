// -----------------------------
// FILE: app/api/_middleware/validateJson.ts
// (Optional) Example middleware-like helper — app router currently uses edge handlers; keep as helper
// -----------------------------
export async function parseJson(req: Request) {
try {
return await req.json()
} catch (e) {
throw new Error('Invalid JSON body')
}
}