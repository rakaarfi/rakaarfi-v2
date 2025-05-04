// components/Home.jsx
import { Playwrite_US_Trad } from 'next/font/google';
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import SectionLayout from './SectionLayout'; // Import SectionLayout

const playwrite = Playwrite_US_Trad({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

// Terima setActiveEndpoint saja, karena title dll dihandle SectionLayout
export default function HomeSection({ onInternalLinkClick }) {

    const paragraphs = [
        "I'm passionate about building innovative web applications. With expertise in Python, JavaScript, and data science, I create impactful solutions that solve real-world problems. Always eager to explore new technologies and improve my craft.",
        // Gunakan JSX untuk teks bold
        <strong key="cta">Let's discuss your project today!</strong>
    ];

    const handleButtonClick = (e, sectionId) => {
        e.preventDefault(); // MENCEGAH navigasi href standar
        onInternalLinkClick(sectionId); // Panggil handler dari page.jsx
    };

    return (
        <SectionLayout
            // id="home"
            subtitle="rakaarfi" // Gunakan prop subtitle
            title="Full-Stack Developer"
            paragraphs={paragraphs}
            imageSrc="/home-photo.jpg"
            imageAlt="Profile Picture"
            imagePosition="right" // Gambar di kanan (default)
            imagePriority={true} // Gambar pertama, prioritas true
        >
            {/* Tombol sebagai children */}
            <Button
                asChild
                variant="default"
                size="lg"
                className={`${playwrite.className} shadow text-xs lg:text-xl rounded-full`}
            >
                <Link href="#contacts" onClick={(e) => handleButtonClick(e, 'contacts')}>
                    Contact Me
                </Link>
            </Button>
            <Button
                asChild
                variant="outline"
                size="lg"
                className={`${playwrite.className} shadow text-xs lg:text-xl rounded-full`}
            >
                <Link href="#projects" onClick={(e) => handleButtonClick(e, 'projects')}>
                    View Portfolio
                </Link>
            </Button>
        </SectionLayout>
    );
}