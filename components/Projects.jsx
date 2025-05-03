// import Image from "next/image";
// import { Quicksand, Playwrite_US_Trad } from 'next/font/google';
// import { Button } from "./ui/button";

// const quicksand = Quicksand({
//     weight: "400",
//     subsets: ["latin"],
//     display: "auto",
// });

// const playwrite = Playwrite_US_Trad({
//     weight: "400",
//     subsets: ["latin"],
//     display: "auto",
// });

// export default function Projects() {
//     return (
//         <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
//             <div className='flex flex-row items-center gap-20 homepage-section'>
//                 <div className='flex flex-col gap-8'>
//                     <p className={`${quicksand.className} lg:text-6xl text-3xl`} style={{ fontWeight: 'bold' }}>My Projects</p>
//                     <p className={`${quicksand.className} lg:text-xl text-sm`}>Take a look at the projects I&apos;ve worked on, where I apply the latest technologies to create solutions that solve real problems. From web apps to data-driven insights, each project reflects my passion and expertise.</p>

//                     <div className="flex flex-row my-2 justify-center md:justify-start"> {/* Use flex utils for alignment */}
//                         <Button
//                             variant="outline" // Base variant
//                             size="lg"
//                             className={`${playwrite.className} shadow text-xs lg:text-xl rounded-[0.8rem] py-[22px]
//                                        border-[#3F2727] text-[#3F2727] bg-transparent hover:bg-[#3F2727] hover:text-[#F9EAE1]
//                                        dark:border-[#806C60] dark:text-[#F9EAE1] dark:hover:bg-[#806C60] dark:hover:text-[#F9EAE1]
//                                        transition-colors duration-200 ease-in-out focus-visible:ring-offset-0 focus-visible:ring-0`}
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 alert("Solutions page coming soon!");
//                             }}
//                         >
//                             See the Solutions I've Built
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="relative aspect-[3/4] w-full max-w-[300px] lg:max-w-[320px] homepage-section-image">
//                     <Image
//                         src="/home-photo.jpg"
//                         alt="A picture representing the projects section"
//                         fill
//                         sizes="(max-width: 768px) 90vw, 40vw"
//                         className="homepage-image object-cover rounded-full"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/Projects.jsx
// Hapus import Image, Quicksand
import { Playwrite_US_Trad } from 'next/font/google';
// import Link from "next/link"; // Tidak perlu
import { Button } from "./ui/button";
import SectionLayout from './SectionLayout'; // Import SectionLayout

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
            imageSrc="/home-photo.jpg" // Sesuaikan gambar jika perlu
            imageAlt="A picture representing the projects section"
            imagePosition="right" // Gambar di kanan
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