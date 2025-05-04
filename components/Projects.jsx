// components/Projects.jsx
import { Playwrite_US_Trad } from 'next/font/google';
import { Button } from "./ui/button";
import SectionLayout from './SectionLayout';

const playwrite = Playwrite_US_Trad({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export default function Projects() {
    const paragraphs = [
        "Take a look at the projects I've worked on, where I apply the latest technologies to create solutions that solve real problems. From web apps to data-driven insights, each project reflects my passion and expertise."
    ];

    return (
        <SectionLayout
            id="projects"
            title="My Projects"
            paragraphs={paragraphs}
            imageSrc="/home-photo.jpg"
            imageAlt="A picture representing the projects section"
            imagePosition="right"
        >
            {/* Tombol sebagai children */}
            <Button
                variant="outline"
                size="lg"
                className={`${playwrite.className} shadow text-xs lg:text-xl rounded-full`}
                onClick={(e) => {
                    e.preventDefault();
                    alert("Solutions page coming soon!");
                }}
            >
                See the Solutions I've Built
            </Button>
        </SectionLayout>
    );
}