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

// export default function About() {
//     return (
//         <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
//             <div className='flex flex-row items-center gap-20 homepage-section'>
//                 <div className='flex flex-col gap-5'>
//                     <p className={`${quicksand.className} lg:text-6xl text-3xl font-bold`}>About Me</p>
//                     <p className={`${quicksand.className} lg:text-xl text-sm`}>
//                         I&apos;m an enthusiastic full-stack developer with a great grasp of Python, JavaScript, and data science. Over the years, I&apos;ve honed my skills in building seamless user experiences and data-driven solutions.
//                     </p>
//                     <p className={`${quicksand.className} lg:text-xl text-sm font-bold`} >Curious about my journey?</p>

//                     <div className="flex flex-row my-2 justify-center md:justify-start"> {/* Use flex utils for alignment */}
//                         <Button
//                             variant="outline" // Base variant
//                             size="lg"
//                             className={`${playwrite.className} shadow text-xs lg:text-xl rounded-[0.8rem] py-[22px]
//                                        border-[#3F2727] text-[#3F2727] bg-transparent hover:bg-[#3F2727] hover:text-[#F9EAE1]
//                                        dark:border-[#806C60] dark:text-[#F9EAE1] dark:hover:bg-[#806C60] dark:hover:text-[#261717]
//                                        transition-colors duration-200 ease-in-out focus-visible:ring-offset-0 focus-visible:ring-0`}
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 alert("Journey page coming soon!");
//                             }}
//                         >
//                             Discover My Journey
//                         </Button>
//                     </div>

//                 </div>
//                 <div className="relative aspect-[3/4] w-full max-w-[300px] lg:max-w-[320px] homepage-section-image-about">
//                     <Image
//                         src="/second-home-photo.jpg"
//                         alt="A second picture representing the about section"
//                         fill
//                         sizes="(max-width: 768px) 90vw, 40vw"
//                         className="homepage-image object-cover rounded-full"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/About.jsx
// Hapus import Image, Quicksand
import { Playwrite_US_Trad } from 'next/font/google';
// import Link from "next/link"; // Tidak perlu jika button tidak link
import { Button } from "./ui/button";
import SectionLayout from './SectionLayout'; // Import SectionLayout

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