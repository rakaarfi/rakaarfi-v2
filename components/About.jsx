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

export default function About() {
    return (
        <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
            <div className='flex flex-row items-center gap-20 homepage-section'>
                <div className='flex flex-col gap-5'>
                    <p className={`${quicksand.className} lg:text-6xl text-3xl`} style={{ fontWeight: 'bold' }}>About Me</p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`}>
                        I&apos;m an enthusiastic full-stack developer with a great grasp of Python, JavaScript, and data science. Over the years, I&apos;ve honed my skills in building seamless user experiences and data-driven solutions.
                    </p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`} style={{ fontWeight: 'bold' }}>Curious about my journey?</p>
                    <div className="flex flex-row my-2 my-button-section">
                        <Link
                            href='#'
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${playwrite.className} my-button shadow lg:text-xl text-xs rounded-full border`}
                        >
                            Discover My Journey
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start homepage-section-image-about">
                    <Image
                        src="/second-home-photo.jpg"
                        alt="Profile Picture"
                        layout='responsive'
                        width={1000}
                        height={1000}
                        sizes="200vw"
                        className="rounded-full homepage-image"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}