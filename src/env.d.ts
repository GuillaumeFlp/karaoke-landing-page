/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly CATALOGUE_API_URL: string;
  readonly BACKEND_API_URL: string;
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
