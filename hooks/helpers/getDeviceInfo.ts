/* eslint-disable @typescript-eslint/no-explicit-any */
export function getDeviceInfo() {
  const canvas = document.createElement("canvas");

  let gpu = "unknown";

  try {
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;

    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
      }
    }
  } catch {
    // ignore
  }

  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,
    deviceMemory: (navigator as any).deviceMemory ?? null, // in GB
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    windowResolution: `${window.innerWidth}x${window.innerHeight}`,
    gpu,
    connection: (navigator as any).connection?.effectiveType ?? null,
  };
}
