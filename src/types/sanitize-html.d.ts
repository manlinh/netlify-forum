// Minimal type declarations for sanitize-html to satisfy TypeScript
declare module "sanitize-html" {
  export interface SanitizeHtmlOptions {
    allowedTags?: string[] | false;
    allowedAttributes?: Record<string, string[]>;
    // add more fields if you start using them
  }

  export default function sanitizeHtml(
    dirty: string,
    options?: SanitizeHtmlOptions
  ): string;
}
