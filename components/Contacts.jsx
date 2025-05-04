// components/Contacts.jsx
import React from 'react';
import { Button } from "./ui/button";
import SectionLayout from './SectionLayout';
import { FaGithub, FaLinkedin, FaInstagram, FaSquareXTwitter, FaMedium, FaUpwork } from "react-icons/fa6";

// Definisikan social media di luar komponen jika tidak berubah
const social_media = [
    { name: "Linkedin", href: "https://www.linkedin.com/in/rakaarfi/", icon: FaLinkedin, hoverClass: "hover:text-blue-500" },
    { name: "Upwork", href: "https://www.upwork.com/freelancers/~01a9ea19535ae43423", icon: FaUpwork, hoverClass: "hover:text-[#73bb44]" },
    { name: "Instagram", href: "https://instagram.com/rakaarfi", icon: FaInstagram, hoverClass: "hover:text-[#E1306C]" },
    { name: "X", href: "https://x.com/rakaarfi", icon: FaSquareXTwitter, hoverClass: "hover:text-gray-800 dark:hover:text-gray-600" },
    { name: "Github", href: "https://github.com/rakaarfi", icon: FaGithub, hoverClass: "hover:text-gray-800 dark:hover:text-gray-600" },
    { name: "Medium", href: "https://medium.com/@rakaarfi", icon: FaMedium, hoverClass: "hover:text-gray-800 dark:hover:text-gray-600" },
];

export default function Contacts() {
    const paragraphs = [
        "Interested in collaborating on a project or simply want to connect? I'm always open to new opportunities and create meaningful collaborations.",
        <strong key="cta">Let's build something remarkable together!</strong>
    ];

    return (
        <SectionLayout
            id="contacts"
            title="Let's Connect"
            paragraphs={paragraphs}
            imageSrc="/home-photo.jpg" // Sesuaikan gambar jika perlu
            imageAlt="A picture representing the contacts section"
            imagePosition="left" // Gambar di kiri
        >
            {/* Ikon sosial media sebagai children */}
            {social_media.map((info) => (
                <button
                    key={info.name}
                    // variant="ghost"
                    // size="icon"
                    className={`rounded-full lg:text-5xl text-xl ${info.hoverClass} transition-colors duration-150 ease-in-out transform hover:scale-110`}
                    title={info.name}
                    onClick={() => window.open(info.href, '_blank', 'noopener,noreferrer')}
                    aria-label={info.name}
                >
                    <info.icon className="h-9 w-9 lg:h-10 lg:w-10" />
                </button>
            ))}
        </SectionLayout>
    );
}