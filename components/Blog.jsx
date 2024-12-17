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

export default function Blog() {
    return (
        <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
            <div className='flex flex-row items-center gap-20 homepage-section'>
                <div className='flex flex-col gap-8'>
                    <p className={`${quicksand.className} lg:text-6xl text-3xl`} style={{ fontWeight: 'bold' }}>The Dev&apos;s Notebook</p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`}>Join me as I document my journey as a developer, sharing insights, tutorials, and lessons learned along the way. From tackling coding challenges to exploring the latest tech trends, there&apos;s always something exciting to discover.</p>
                    <div className="flex flex-row my-2 my-button-section">
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${playwrite.className} my-button shadow lg:text-xl text-xs rounded-full border`}
                        >
                            Explore My Notebook
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