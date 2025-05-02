import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Raka Arfi | Portfolio",
	description:
		"Full-stack web developer, showcasing my skills and projects.",
};

export default function RootLayout({ children }) {
	return (
		// Removed hardcoded className="dark" to allow light mode
		// Add suppressHydrationWarning to html tag
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{/* Wrap children with ThemeProvider */}
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
