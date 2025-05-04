// components/About.jsx
import { Playwrite_US_Trad } from 'next/font/google';
import { Button } from "./ui/button";
import SectionLayout from './SectionLayout';

const playwrite = Playwrite_US_Trad({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export default function About() {
    const paragraphs = [
        "I'm an enthusiastic full-stack developer with a great grasp of Python, JavaScript, and data science. Over the years, I've honed my skills in building seamless user experiences and data-driven solutions.",
        <strong key="cta">Curious about my journey?</strong>
    ];

    return (
        <SectionLayout
            id="about"
            title="About Me"
            paragraphs={paragraphs}
            imageSrc="/second-home-photo.jpg" // Gambar berbeda
            imageAlt="A second picture representing the about section"
            imagePosition="left" // Gambar di kiri
        >
            {/* Tombol sebagai children */}
            <Button
                variant="outline"
                size="lg"
                className={`${playwrite.className} shadow text-xs lg:text-xl rounded-full`}
                onClick={(e) => {
                    e.preventDefault();
                    alert("Journey page coming soon!");
                }}
            >
                Discover My Journey
            </Button>
        </SectionLayout>
    );
}