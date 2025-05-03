// "use client";

// import Image from "next/image";
// import { Quicksand, Playwrite_US_Trad } from 'next/font/google';
// import Link from "next/link";
// import React from "react";
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

// export default function HomeSection({ setActiveEndpoint }) {

//     return (
//         <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
//             <div className='flex flex-row items-center gap-20 homepage-section'>
//                 <div className='flex flex-col gap-5'>
//                     <h1 className={`${playwrite.className} lg:text-4xl text-base`}>rakaarfi</h1>
//                     <p className={`${quicksand.className} lg:text-6xl text-3xl`} style={{ fontWeight: 'bold' }}>Full-Stack Developer</p>
//                     <p className={`${quicksand.className} lg:text-xl text-sm`}>
//                         I&apos;m passionate about building innovative web applications. With expertise in Python, JavaScript, and data science, I create impactful solutions that solve real-world problems. Always eager to explore new technologies and improve my craft.
//                     </p>
//                     <p className={`${quicksand.className} lg:text-xl text-sm`} style={{ fontWeight: 'bold' }}>Let&apos;s discuss your project today!</p>

//                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 my-2">
//                         {/* Contact Me Button */}
//                         <Button
//                             asChild
//                             // No variant needed if using direct bg/text colors below
//                             // Use size="lg" for default padding, or specify manually like px-8 py-2
//                             size="lg" // Corresponds to h-10 px-8
//                             className={`${playwrite.className} shadow text-xs lg:text-xl rounded-[0.8rem] py-[22px]
//                                        bg-[#3F2727] text-[#F9EAE1] border border-[#F9EAE1] hover:bg-[#F9EAE1] hover:text-[#3F2727] hover:border-[#3F2727]
//                                        dark:bg-[#806C60] dark:text-[#F9EAE1] dark:border-[#806C60] dark:hover:bg-[#261717] dark:hover:text-[#F9EAE1] dark:hover:border-[#806C60]
//                                        transition-colors duration-200 ease-in-out`} // Add transition
//                         >
//                             <Link href="#contacts" onClick={() => setActiveEndpoint("#contacts")}>
//                                 Contact Me
//                             </Link>
//                             {/* TODO belum mengarah ke #contacts*/}
//                         </Button>

//                         {/* View Portfolio Button */}
//                         <Button
//                             asChild
//                             variant="outline" // Start with outline variant
//                             size="lg" // Corresponds to h-10 px-8
//                             className={`${playwrite.className} shadow text-xs lg:text-xl rounded-[0.8rem] py-[22px]
//                                        border-[#3F2727] text-[#3F2727] bg-transparent hover:bg-[#3F2727] hover:text-[#F9EAE1]
//                                        dark:border-[#806C60] dark:text-[#F9EAE1] dark:hover:bg-[#806C60] dark:hover:text-[#F9EAE1] // Assuming dark hover text should contrast
//                                        transition-colors duration-200 ease-in-out focus-visible:ring-offset-0 focus-visible:ring-0`} // Add transition & remove default outline ring if desired
//                         >
//                             <Link href="#projects" onClick={() => setActiveEndpoint("#projects")}>
//                                 View Portfolio
//                             </Link>
//                             {/* TODO belum mengarah ke #projects*/}
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="relative aspect-[3/4] w-full max-w-[300px] lg:max-w-[320px] homepage-section-image">
//                     <Image
//                         src="/home-photo.jpg"
//                         alt="Profile Picture"
//                         fill
//                         sizes="(max-width: 768px) 90vw, 40vw"
//                         className="homepage-image object-cover rounded-full"
//                         priority
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

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