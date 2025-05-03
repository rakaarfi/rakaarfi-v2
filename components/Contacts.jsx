// "use client";

// import { FaGithub } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaSquareXTwitter } from "react-icons/fa6";
// import { FaMedium } from "react-icons/fa6";
// import { FaUpwork } from "react-icons/fa6";

// import Image from "next/image";
// import { Quicksand, Playwrite_US_Trad } from 'next/font/google';
// import React from 'react';

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

// const social_media = [
//     {
//         "name": "Linkedin",
//         "href": "https://www.linkedin.com/in/rakaarfi/",
//         "img": FaLinkedin,
//         "linkClass": "mr-6 hover:text-blue-500 lg:text-5xl text-xl contact-button"
//     },
//     {
//         "name": "Upwork",
//         "href": "https://www.upwork.com/freelancers/~01a9ea19535ae43423",
//         "img": FaUpwork,
//         "linkClass": "mr-6 hover:text-[#73bb44] lg:text-5xl text-xl contact-button"
//     },
//     {
//         "name": "Instagram",
//         "href": "https://instagram.com/rakaarfi",
//         "img": FaInstagram,
//         "linkClass": "mr-6 hover:text-[#E1306C] lg:text-5xl text-xl contact-button"
//     },
//     {
//         "name": "X",
//         "href": "https://x.com/rakaarfi",
//         "img": FaSquareXTwitter,
//         "linkClass": "mr-6 hover:text-gray-600 lg:text-5xl text-xl contact-button"
//     },
//     {
//         "name": "Github",
//         "href": "https://github.com/rakaarfi",
//         "img": FaGithub,
//         "linkClass": "mr-6 hover:text-gray-600 lg:text-5xl text-xl contact-button"
//     },
//     {
//         "name": "Medium",
//         "href": "https://medium.com/@rakaarfi",
//         "img": FaMedium,
//         "linkClass": "mr-6 hover:text-gray-600 lg:text-5xl text-xl contact-button"
//     },
// ]

// const LogoComponent = ({ img: Icon }) => (
//     <Icon className="text-transition-all hover:scale-110 duration-150" />
// );

// export default function Contacts() {

//     return (
//         <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
//             <div className='flex flex-row items-center gap-20 homepage-section'>
//                 <div className='flex flex-col gap-5'>
//                     <p className={`${quicksand.className} lg:text-6xl text-3xl font-bold`} >Let&apos;s Connect</p>
//                     <p className={`${quicksand.className} lg:text-xl text-sm`}>
//                         Interested in collaborating on a project or simply want to connect? I&apos;m always open to new opportunities and create meaningful collaborations.
//                     </p>
//                     <p className={`${quicksand.className} lg:text-xl text-sm font-bold`}>Let&apos;s build something remarkable together!</p>
//                     <div className="flex flex-row my-2 flex-wrap gap-7 justify-center md:justify-start">
//                         {social_media.map((info, i) => (
//                             <button
//                                 key={i}
//                                 title={info.name}
//                                 className={`rounded-full lg:text-5xl text-xl
//                                     ${info.name === 'Linkedin' ? 'hover:text-blue-500' : ''}
//                                     ${info.name === 'Upwork' ? 'hover:text-[#73bb44]' : ''}
//                                     ${info.name === 'Instagram' ? 'hover:text-[#E1306C]' : ''}
//                                     ${(info.name === 'X' || info.name === 'Github' || info.name === 'Medium') ? 'hover:text-gray-800 dark:hover:text-gray-600' : ''}
//                                     transition-colors duration-0 ease-in-out transform hover:scale-110`}
//                                 onClick={() => window.open(info.href, '_blank', 'noopener,noreferrer')}
//                             >
//                                 <LogoComponent
//                                     img={info.img}
//                                 />
//                                 <span className="sr-only">{info.name}</span>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="relative aspect-[3/4] w-full max-w-[300px] lg:max-w-[320px] homepage-section-image">
//                     <Image
//                         src="/home-photo.jpg"
//                         alt="A picture representing the contacts section"
//                         fill
//                         sizes="(max-width: 768px) 90vw, 40vw"
//                         className="homepage-image object-cover rounded-full"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/Contacts.jsx
// Hapus import Image, Quicksand
import React from 'react';
import { Button } from "./ui/button";
import SectionLayout from './SectionLayout'; // Import SectionLayout
import { FaGithub, FaLinkedin, FaInstagram, FaSquareXTwitter, FaMedium, FaUpwork } from "react-icons/fa6"; // Import icons

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
                    <info.icon className="h-9 w-9 lg:h-10 lg:w-10" /> {/* Sesuaikan ukuran ikon jika perlu */}
                </button>
            ))}
        </SectionLayout>
    );
}