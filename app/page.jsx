"use client";
import React, { useState, useEffect } from 'react';

import About from "@/components/About";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import HomeSection from "@/components/Home";
import LoadingWrapper from "@/components/LoadingWrapper";
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";
import Image from "next/image";

export default function Home() {

	const [activeEndpoint, setActiveEndpoint] = useState("#home");

	return (
		<LoadingWrapper>
			<nav>
                <Navbar activeEndpoint={activeEndpoint} setActiveEndpoint={setActiveEndpoint} />
            </nav>
			<div>
				<div id="home" className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
					<HomeSection activeEndpoint={activeEndpoint} setActiveEndpoint={setActiveEndpoint} />
				</div>
				<div id="about" className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
					<About />
				</div>
				<div id="projects" className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
					<Projects />
				</div>
				<div id='blog' className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
					<Blog />
				</div>
				<div id='contacts' className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
					<Contacts />
				</div>
				{/* <div>
					<BlogContents />
				</div> */}
				{/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
					<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ml-48 p-4">
						<ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
							<li className="mb-2">
								Get started by editing{" "}
								<code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
									app/page.js
								</code>
								.
							</li>
							<li>Save and see your changes instantly.</li>
						</ol>

						<div className="flex gap-4 items-center flex-col sm:flex-row">
							<a
								className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
								href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
								target="_blank"
								rel="noopener noreferrer"
							>
								Read our docs
							</a>
						</div>
					</main>
					<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
						<a
							className="flex items-center gap-2 hover:underline hover:underline-offset-4"
							href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								aria-hidden
								src="/file.svg"
								alt="File icon"
								width={16}
								height={16}
							/>
							Learn
						</a>
						<a
							className="flex items-center gap-2 hover:underline hover:underline-offset-4"
							href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								aria-hidden
								src="/window.svg"
								alt="Window icon"
								width={16}
								height={16}
							/>
							Examples
						</a>
						<a
							className="flex items-center gap-2 hover:underline hover:underline-offset-4"
							href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								aria-hidden
								src="/globe.svg"
								alt="Globe icon"
								width={16}
								height={16}
							/>
							Go to nextjs.org →
						</a>
					</footer>
				</div> */}
			</div>
		</LoadingWrapper>
	);
}
