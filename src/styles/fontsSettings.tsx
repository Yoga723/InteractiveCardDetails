import localFont from "next/font/local";

export const spaceG_500 = localFont({
  src: [
    {
      path: "../../public/fonts/SpaceGrotesk-Light.ttf",
      weight: "500",
    },
  ],
  variable: "--font-space-500",
});
