"use client";

import Image from "next/image";
import { Quicksand, Playwrite_US_Trad } from 'next/font/google';
import Link from "next/link";
import React, { useState } from "react";

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

export default function HomeSection({ activeEndpoint, setActiveEndpoint }) {

    return (
        <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
            <div className='flex flex-row items-center gap-20 homepage-section'>
                <div className='flex flex-col gap-5'>
                    <h1 className={`${playwrite.className} lg:text-4xl text-base`}>rakaarfi</h1>
                    <p className={`${quicksand.className} lg:text-6xl text-3xl`} style={{ fontWeight: 'bold' }}>Full-Stack Developer</p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`}>
                        I&apos;m passionate about building innovative web applications. With expertise in Python, JavaScript, and data science, I create impactful solutions that solve real-world problems. Always eager to explore new technologies and improve my craft.
                    </p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`} style={{ fontWeight: 'bold' }}>Let&apos;s discuss your project today!</p>
                    <div className="flex flex-row gap-5 my-2">
                        <Link
                            href="#contacts"
                            className={`${playwrite.className} contact-me-button shadow lg:text-xl text-xs rounded-full border`}
                            onClick={() => setActiveEndpoint(`#contacts`)}
                        >
                            Contact Me
                        </Link>
                        <Link
                            href="#projects"
                            className={`${playwrite.className} my-button shadow lg:text-xl text-xs rounded-full border`}
                            onClick={() => setActiveEndpoint('#projects')}
                        >
                            View Portfolio
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start homepage-section-image">
                    <Image
                        src="/home-photo.jpg"
                        alt="Profile Picture"
                        layout="responsive"
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