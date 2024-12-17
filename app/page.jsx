"use client";
import React, { useState } from 'react';

import About from "@/components/About";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import HomeSection from "@/components/Home";
import LoadingWrapper from "@/components/LoadingWrapper";
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";

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
			</div>
		</LoadingWrapper>
	);
}
