import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codex - Prompt com IA",
  description: "Crie, refine e exporte prompts poderosos com nosso guia passo a passo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}