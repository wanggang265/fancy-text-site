import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Sign In | RemovePDFPages",
  description:
    "Sign in to RemovePDFPages to track your Full Editor license, subscription, and top-up credits across sessions.",
  path: "/login",
  type: "website",
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
