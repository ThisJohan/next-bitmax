"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeOMmofAAAAAJKCNHACNO_zd_M-aRCDsCFTt5uU">
      {children}
    </GoogleReCaptchaProvider>
  );
}
