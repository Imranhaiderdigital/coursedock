/**
 * Video Helper Utilities
 * Abstracts the video URL resolution so we can swap providers
 * (e.g. Google Drive, Bunny Stream, Vimeo, Cloudflare R2) in the future.
 */

export type VideoProviderType = "google-drive" | "vimeo" | "bunny" | "cloudflare-r2" | "unknown";

/**
 * Detects the provider type based on the URL structure
 */
export function detectVideoProvider(url: string): VideoProviderType {
  if (!url) return "unknown";
  
  if (url.includes("drive.google.com")) {
    return "google-drive";
  }
  if (url.includes("vimeo.com")) {
    return "vimeo";
  }
  if (url.includes("bunny")) {
    return "bunny";
  }
  if (url.includes("cloudflare") || url.includes("r2")) {
    return "cloudflare-r2";
  }
  
  return "unknown";
}

/**
 * Resolves a raw URL into an embeddable format suited for iframes
 */
export function resolveEmbedUrl(url: string): string {
  if (!url) return "";
  
  const provider = detectVideoProvider(url);
  
  switch (provider) {
    case "google-drive":
      // Reformat link to /preview if it contains /view or /edit
      if (url.includes("/view")) {
        return url.replace(/\/view.*/, "/preview");
      }
      if (url.includes("/edit")) {
        return url.replace(/\/edit.*/, "/preview");
      }
      if (!url.endsWith("/preview")) {
        // Append preview if not there
        return url.replace(/\/$/, "") + "/preview";
      }
      return url;
      
    case "vimeo":
      // Extract vimeo ID and return vimeo player link
      const vimeoId = url.split("/").pop()?.split("?")[0];
      return `https://player.vimeo.com/video/${vimeoId}`;
      
    default:
      return url;
  }
}
