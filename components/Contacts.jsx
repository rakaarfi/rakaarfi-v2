"use client";

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { FaUpwork } from "react-icons/fa6";

import Image from "next/image";
import { Quicksand, Playwrite_US_Trad } from 'next/font/google';
import React, { useState } from 'react';

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

const social_media = [
    {
        "name": "Linkedin",
        "href": "https://www.linkedin.com/in/rakaarfi/",
        "img": FaLinkedin,
        "linkClass": "mr-6 hover:text-blue-500 lg:text-5xl text-xl contact-button"
    },
    {
        "name": "Upwork",
        "href": "https://www.upwork.com/freelancers/~01a9ea19535ae43423",
        "img": FaUpwork,
        "linkClass": "mr-6 hover:text-[#73bb44] lg:text-5xl text-xl contact-button"
    },
    {
        "name": "Instagram",
        "href": "https://instagram.com/rakaarfi",
        "img": FaInstagram,
        "linkClass": "mr-6 hover:text-[#E1306C] lg:text-5xl text-xl contact-button"
    },
    {
        "name": "X",
        "href": "https://x.com/rakaarfi",
        "img": FaSquareXTwitter,
        "linkClass": "mr-6 hover:text-gray-600 lg:text-5xl text-xl contact-button"
    },
    {
        "name": "Github",
        "href": "https://github.com/rakaarfi",
        "img": FaGithub,
        "linkClass": "mr-6 hover:text-gray-600 lg:text-5xl text-xl contact-button"
    },
    {
        "name": "Medium",
        "href": "https://medium.com/@rakaarfi",
        "img": FaMedium,
        "linkClass": "mr-6 hover:text-gray-600 lg:text-5xl text-xl contact-button"
    },
]

const LogoComponent = ({ img: Icon }) => (
    <Icon className="text-transition-all hover:scale-110 duration-150" />
);

export default function Contacts() {

    return (
        <div className="justify-center items-center h-screen flex lg:mx-0 -mx-20">
            <div className='flex flex-row items-center gap-20 homepage-section'>
                <div className='flex flex-col gap-5'>
                    <p className={`${quicksand.className} lg:text-6xl text-3xl`} style={{ fontWeight: 'bold' }}>Let&apos;s Connect</p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`}>
                        Interested in collaborating on a project or simply want to connect? I&apos;m always open to new opportunities and create meaningful collaborations.
                    </p>
                    <p className={`${quicksand.className} lg:text-xl text-sm`} style={{ fontWeight: 'bold' }}>Let&apos;s build something remarkable together!</p>
                    <div className="flex flex-row my-2">
                        {social_media.map((info, i) => (
                            <button
                                key={i}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${info.linkClass}`}
                                style={{
                                    transition: 'transform 0.2s ease-in-out'
                                }}
                                onClick={() => window.open(info.href)}
                            >
                                <LogoComponent
                                    img={info.img}
                                />
                                <span className="sr-only">{info.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start homepage-section-image">
                    <Image
                        src="/home-photo.jpg"
                        alt="Profile Picture"
                        layout='responsive'
                        width={1000}
                        height={1000}
                        sizes="150vw"
                        className="rounded-full homepage-image"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}