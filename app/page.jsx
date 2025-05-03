"use client";
import React, { useState, useEffect } from 'react';

import About from "@/components/About";
import Blog from "@/components/Blog";
import Contacts from "@/components/Contacts";
import HomeSection from "@/components/Home";
import LoadingWrapper from "@/components/LoadingWrapper";
import LazyLoadWrapper from "@/components/LazyLoadWrapper";
import { Sidebar } from "@/components/Sidebar";
import Projects from "@/components/Projects";

export default function Home() {

	const [activeEndpoint, setActiveEndpoint] = useState("#home");
	const [forceLoadSections, setForceLoadSections] = useState(new Set());
	const [scrollToSectionId, setScrollToSectionId] = useState(null);
	const [loading, setLoading] = useState(true); // <-- State loading diangkat ke sini

	// Timer untuk simulasi loading (pindahkan dari LoadingWrapper)
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500); // Sesuaikan durasi jika perlu

		return () => clearTimeout(timer);
	}, []); // Jalankan sekali saat mount


	// --- LOGIKA UNTUK SCROLL SPY (AKTIFKAN KEMBALI) ---
	useEffect(() => {
		// Hanya jalankan setup jika loading sudah selesai
		if (!loading) {
			console.log("ScrollSpy: Loading finished, attaching observer...");
			// Target ID ada di div#home atau div di dalam LazyLoadWrapper
			const sectionIds = ['home', 'about', 'projects', 'blog', 'contacts'];
			// Ambil elemen yang MUNGKIN sudah ada saat ini
			const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el !== null);

			// Penting: sections[] mungkin tidak lengkap saat awal, tapi observer tetap dibuat
			if (sections.length === 0) {
				// Seharusnya minimal #home ditemukan
				console.warn("ScrollSpy: Critical - #home section not found after loading.");
				return;
			}

			const observerOptions = {
				root: null,
				rootMargin: "-30% 0px -50% 0px", // Zona aktif tengah viewport
				threshold: 0 // Trigger saat masuk/keluar zona
			};

			const observerCallback = (entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const wrapperId = entry.target.id; // e.g., 'about-wrapper' or 'home'
						// Ekstrak ID asli (hapus '-wrapper' jika ada)
						const sectionId = wrapperId.endsWith('-wrapper')
							? wrapperId.replace('-wrapper', '')
							: wrapperId; // 'home' tetap 'home'
						const newActiveEndpoint = `#${sectionId}`;

						setActiveEndpoint(currentActiveEndpoint => {
							if (currentActiveEndpoint !== newActiveEndpoint) {
								console.log(`ScrollSpy: Wrapper ${wrapperId} intersecting. Setting active endpoint to ${newActiveEndpoint}`);
								return newActiveEndpoint;
							}
							return currentActiveEndpoint;
						});
					}
				});
			};

			// Buat observer
			const observer = new IntersectionObserver(observerCallback, observerOptions);

			// Observasi elemen yang ditemukan SAAT INI
			// Jika elemen lain muncul nanti (karena lazy load), observer TIDAK akan tahu
			// Ini MASALAHNYA! Kita perlu mengobservasi elemen yang akan muncul.

			// ---- PENDEKATAN YANG LEBIH BAIK: Observasi Placeholder ----
			// Alih-alih menargetkan div#about dll, kita bisa menargetkan
			// div terluar dari LazyLoadWrapper (jika kita beri ID unik)
			// ATAU kita bisa mengobservasi SEMUA elemen section saat mereka muncul.

			// ---- MARI KITA GUNAKAN PENDEKATAN AWAL (Point 7) ----
			// Yaitu menargetkan div pembungkus LazyLoadWrapper / div#home
			// Ini memerlukan ID pada LazyLoadWrapper

			// -- KEMBALIKAN ID KE LazyLoadWrapper --
			console.log("ScrollSpy: Reverting to observing wrapper elements...");
			const wrapperSectionIds = ['home', 'about-wrapper', 'projects-wrapper', 'blog-wrapper', 'contacts-wrapper'];
			const wrapperSections = wrapperSectionIds.map(id => document.getElementById(id)).filter(el => el !== null);

			if (wrapperSections.length === 0) {
				console.warn("ScrollSpy: Critical - Cannot find any wrapper sections (#home, #id-wrapper).");
				return;
			}
			if (wrapperSections.length !== wrapperSectionIds.length) {
				console.warn("ScrollSpy: Mismatch - Could not find all section wrappers.", wrapperSections.map(s => s.id), wrapperSectionIds);
				// Lanjutkan dengan yang ditemukan
			}

			wrapperSections.forEach(section => observer.observe(section));
			console.log("ScrollSpy: Observer attached to wrapper sections:", wrapperSections.map(s => s.id));


			// Cleanup function
			return () => {
				console.log("ScrollSpy: Disconnecting observer.");
				observer.disconnect();
			};

		} else {
			console.log("ScrollSpy: Waiting for loading to finish...");
		}
		// Jalankan effect ini setiap kali 'loading' berubah
	}, [loading]); // Dependensi loading sudah benar


	// --- Logika untuk handle klik sidebar dan scroll ---
	const handleSidebarClick = (sectionId) => {
		const newActiveEndpoint = `#${sectionId}`;
		console.log(`Click: Setting active endpoint to ${newActiveEndpoint}`);
		setActiveEndpoint(newActiveEndpoint);
		setForceLoadSections(prev => new Set(prev).add(sectionId));
		// Target scroll sekarang adalah elemen wrapper dengan ID tersebut
		setScrollToSectionId(sectionId);
	};

	useEffect(() => {
		if (scrollToSectionId) {
			const rafId = requestAnimationFrame(() => {
				// Mencari elemen wrapper dengan ID yang sesuai
				const targetElement = document.getElementById(scrollToSectionId);
				if (targetElement) {
					console.log(`ScrollEffect: Found target element for ${scrollToSectionId}, scrolling...`); // Log sukses
					targetElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start' // Scroll ke bagian atas wrapper
					});
				} else {
					// Jika elemen konten belum ada (karena lazy load), scroll ke wrapper-nya
					const wrapperId = scrollToSectionId === 'home' ? 'home' : `${scrollToSectionId}-wrapper`;
					const wrapperElement = document.getElementById(wrapperId);
					if (wrapperElement) {
						console.log(`ScrollEffect: Content ${scrollToSectionId} not found, scrolling to wrapper ${wrapperId}...`);
						wrapperElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
					} else {
						console.warn(`ScrollEffect: Neither content (${scrollToSectionId}) nor wrapper (${wrapperId}) found.`);
					}
				}
				setScrollToSectionId(null);
			});
			return () => cancelAnimationFrame(rafId);
		}
	}, [scrollToSectionId]);

	// --- Render Komponen ---
	// 	return (
	// 		<LoadingWrapper isLoading={loading}>
	// 			<nav>
	// 				<Sidebar activeEndpoint={activeEndpoint} onLinkClick={handleSidebarClick} />
	// 			</nav>
	// 			<div>
	// 				{/* Home section tidak dibungkus LazyLoad, jadi ID tetap di sini */}
	// 				<div id="home" className="lg:mx-40 mx-[9rem] lg:my-0 my-24">
	// 					<HomeSection activeEndpoint={activeEndpoint} setActiveEndpoint={setActiveEndpoint} />
	// 				</div>

	// 				{/* Berikan 'id' ke LazyLoadWrapper, hapus dari div dalam */}
	// 				<LazyLoadWrapper id="about" forceLoad={forceLoadSections.has('about')} minHeight="100vh">
	// 					<div className="lg:mx-40 mx-[9rem] lg:my-0 my-24"> {/* ID dihapus dari sini */}
	// 						<About />
	// 					</div>
	// 				</LazyLoadWrapper>
	// 				<LazyLoadWrapper id="projects" forceLoad={forceLoadSections.has('projects')} minHeight="100vh">
	// 					<div className="lg:mx-40 mx-[9rem] lg:my-0 my-24"> {/* ID dihapus dari sini */}
	// 						<Projects />
	// 					</div>
	// 				</LazyLoadWrapper>
	// 				<LazyLoadWrapper id="blog" forceLoad={forceLoadSections.has('blog')} minHeight="100vh">
	// 					<div className="lg:mx-40 mx-[9rem] lg:my-0 my-24"> {/* ID dihapus dari sini */}
	// 						<Blog />
	// 					</div>
	// 				</LazyLoadWrapper>
	// 				<LazyLoadWrapper id="contacts" forceLoad={forceLoadSections.has('contacts')} minHeight="100vh">
	// 					<div className="lg:mx-40 mx-[9rem] lg:my-0 my-24"> {/* ID dihapus dari sini */}
	// 						<Contacts />
	// 					</div>
	// 				</LazyLoadWrapper>
	// 			</div>
	// 		</LoadingWrapper>
	// 	);
	// }

	// --- Handler BARU untuk klik tombol internal ---
	const handleInternalLinkClick = (sectionId) => {
		const newActiveEndpoint = `#${sectionId}`;
		console.log(`InternalLinkClick: Setting active endpoint to ${newActiveEndpoint}`);
		// 1. Update highlight sidebar secara langsung (opsional, scroll spy akan menyusul)
		setActiveEndpoint(newActiveEndpoint);
		// 2. Pastikan section di-force load jika belum
		setForceLoadSections(prev => new Set(prev).add(sectionId));
		// 3. Memicu useEffect scroll secara langsung
		setScrollToSectionId(sectionId);
	};

	// --- Render Komponen ---
	return (
		<LoadingWrapper isLoading={loading}>
			<nav>
				<Sidebar activeEndpoint={activeEndpoint} onLinkClick={handleSidebarClick} />
			</nav>
			<div>
				{/* ID 'home' di sini, diobservasi langsung */}
				<div id="home" className="snap-section">
					<HomeSection onInternalLinkClick={handleInternalLinkClick} />
				</div>

				{/* Berikan ID unik ke LazyLoadWrapper (misal: 'id-wrapper') */}
				<LazyLoadWrapper id="about-wrapper" className="snap-section" forceLoad={forceLoadSections.has('about')} minHeight="100vh">
					<div id="about"> {/* ID konten tetap di sini untuk scroll */}
						<About />
					</div>
				</LazyLoadWrapper>
				<LazyLoadWrapper id="projects-wrapper" className="snap-section" forceLoad={forceLoadSections.has('projects')} minHeight="100vh">
					<div id="projects">
						<Projects />
					</div>
				</LazyLoadWrapper>
				<LazyLoadWrapper id="blog-wrapper" className="snap-section" forceLoad={forceLoadSections.has('blog')} minHeight="100vh">
					<div id='blog'>
						<Blog />
					</div>
				</LazyLoadWrapper>
				<LazyLoadWrapper id="contacts-wrapper" className="snap-section" forceLoad={forceLoadSections.has('contacts')} minHeight="100vh">
					<div id='contacts'>
						<Contacts />
					</div>
				</LazyLoadWrapper>
			</div>
		</LoadingWrapper>
	);
}