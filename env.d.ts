/// <reference types="astro/client" />

declare module "virtual:pwa-assets/head" {
  export const pwaAssetsHead: {
    themeColor?: { content: string };
    links: Record<string, string>[];
  };
}

declare module "virtual:pwa-register" {
  export function registerSW(options?: {
    immediate?: boolean;
    onRegisteredSW?: (swUrl: string) => void;
    onOfflineReady?: () => void;
  }): void;
}

declare module "virtual:pwa-info" {
  export const pwaInfo: {
    webManifest: {
      linkTag: string;
    };
  };
}
