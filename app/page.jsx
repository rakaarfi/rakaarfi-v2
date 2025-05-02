"use client";
import React, { useState } from 'react';

import About from "@/components/About";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import HomeSection from "@/components/Home";
import LoadingWrapper from "@/components/LoadingWrapper"; // Remove LoadingWrapper
import LazyLoadWrapper from "@/components/LazyLoadWrapper"; // Import LazyLoadWrapper
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {

	const [activeEndpoint, setActiveEndpoint] = useState("#home");
	const [forceLoadSections, setForceLoadSections] = useState(new Set()); // State for force-loaded sections

	// Handler for navbar clicks
	const handleNavbarClick = (sectionId) => {
		setActiveEndpoint(`#${sectionId}`); // Update active endpoint
		setForceLoadSections(prev => new Set(prev).add(sectionId)); // Add section to force load set

		// Defer scrollIntoView to allow state update and render
		setTimeout(() => {
			const targetElement = document.getElementById(sectionId);
			if (targetElement) {
				targetElement.scrollIntoView({ behavior: 'smooth' });
			}
		}, 0); // Minimal delay
	};

	return (
		// Remove LoadingWrapper, use Fragment
		<LoadingWrapper>
			<nav>
				{/* Pass the new handler and active state to Navbar */}
				<Navbar activeEndpoint={activeEndpoint} onLinkClick={handleNavbarClick} />
			</nav>
			<div>
				<div id="home" className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
					{/* Home section doesn't need lazy loading */}
					<HomeSection activeEndpoint={activeEndpoint} setActiveEndpoint={setActiveEndpoint} />
				</div>
				{/* Wrap sections with LazyLoadWrapper and pass forceLoad prop */}
				<LazyLoadWrapper forceLoad={forceLoadSections.has('about')}>
					<div id="about" className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
						<About />
					</div>
				</LazyLoadWrapper>
				<LazyLoadWrapper forceLoad={forceLoadSections.has('projects')}>
					<div id="projects" className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
						<Projects />
					</div>
				</LazyLoadWrapper>
				<LazyLoadWrapper forceLoad={forceLoadSections.has('blog')}>
					<div id='blog' className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
						<Blog />
					</div>
				</LazyLoadWrapper>
				<LazyLoadWrapper forceLoad={forceLoadSections.has('contacts')}>
					<div id='contacts' className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
						<Contacts />
					</div>
				</LazyLoadWrapper>
			</div>
		</LoadingWrapper>
	);
}
