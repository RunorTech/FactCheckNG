/* eslint-disable @typescript-eslint/no-explicit-any */
export function jsonResponse(data: any, status = 200) {
return new Response(JSON.stringify(data), {
status,
headers: { 'Content-Type': 'application/json' }
})
}


export function errorResponse(message: string, status = 500) {
return jsonResponse({ message: message }, status)
}