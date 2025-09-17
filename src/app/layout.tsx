import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from 'next/headers';
import { LayoutWrapper } from "@/components/layout-wrapper";
import { ErrorBoundary } from "@/components/error-boundary";
import { RoleDebug } from "@/components/role-debug";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  
  console.log("RootLayout rendered with role from headers:", role, "validated role:", validatedRole);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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