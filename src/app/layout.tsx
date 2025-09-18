import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from 'next/headers';
import { LayoutWrapper } from "@/components/layout-wrapper";
import { ErrorBoundary } from "@/components/error-boundary";
import { RoleDebug } from "@/components/role-debug";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verigense Education Platform",
  description: "Verigense Education Platform - Advanced Learning Solutions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const role = headersList.get('x-user-role') || 'student';
  
  // Validate role to ensure it's one of the expected values
  let validatedRole: 'student' | 'teacher' | 'admin' = 'student';
  if (role === 'teacher' || role === 'admin' || role === 'student') {
    validatedRole = role as 'student' | 'teacher' | 'admin';
  }
  
  // Role validation completed
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <LayoutWrapper role={validatedRole}>
              {children}
              <RoleDebug role={validatedRole} />
            </LayoutWrapper>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}