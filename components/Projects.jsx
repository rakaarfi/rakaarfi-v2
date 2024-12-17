import Image from "next/image";
import { Quicksand, Playwrite_US_Trad } from 'next/font/google';
import Link from "next/link";

const quicksand = Quicksand({
    weight: "400",
    subsets: ["latin"],
    display: "auto",
});

const playwrite = Playwrite_US_Trad({
    weight: "400",
    subsets: ["latin"],
    display: "auto",
});

export default function Projects() {
    return (
        <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
            <div className='flex flex-row items-center gap-20 homepage-section'>
                <div className='flex flex-col gap-8'>
                    <p className={`${quicksand.className} lg:text-6xl text-3xl`} style={{ fontWeight: 'bold' }}>My Projects</p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`}>Take a look at the projects I&apos;ve worked on, where I apply the latest technologies to create solutions that solve real problems. From web apps to data-driven insights, each project reflects my passion and expertise.</p>
                    <div className="flex flex-row my-2 my-button-section">
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${playwrite.className} my-button shadow lg:text-xl text-xs rounded-full border`}
                        >
                            See the Solutions I&apos;ve Built
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start homepage-section-image">
                    <Image
                        src="/home-photo.jpg"
                        alt="Profile Picture"
                        layout='responsive'
                        width={1000}
                        height={1000}
                        sizes="250vw"
                        className="rounded-full homepage-image"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}