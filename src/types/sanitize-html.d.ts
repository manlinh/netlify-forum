// Minimal type declarations for sanitize-html
declare module "sanitize-html" {
  export interface SanitizeHtmlOptions {
    allowedTags?: string[] | false;
    allowedAttributes?: Record<string, string[]>;
  }
  export default function sanitizeHtml(
    dirty: string,
    options?: SanitizeHtmlOptions
  ): string;
}
