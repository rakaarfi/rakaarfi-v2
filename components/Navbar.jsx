import Link from 'next/link';
import { BiSolidHome } from "react-icons/bi";
import { GoPersonFill } from "react-icons/go";
import { IoDocuments } from "react-icons/io5";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";


const navbar_logo = [
    {
        "name": "home",
        "logo": BiSolidHome,
    },
    {
        "name": "about",
        "logo": GoPersonFill,
    },
    {
        "name": "projects",
        "logo": IoDocuments,
    },
    {
        "name": "blog",
        "logo": IoDocumentText,
    },
    {
        "name": "contacts",
        "logo": IoChatboxEllipses,
    },
]

const LogoComponent = ({ logo: Icon, isActive }) => (
    <Icon className={`mb-0 lg:mb-2 text-xl lg:text-3xl ${isActive ?
        "text-white dark:text-[#3F2727]"
        : "text-gray-500 dark:text-[#F9EAE1]"
        }`} />
);

export const Navbar = ({ activeEndpoint, setActiveEndpoint }) => {

    return (
        <nav className="dark:bg-[#806C60] bg-[#3F2727] text-slate-100 p-3 lg:p-6 md:justify-between md:items-center z-[9999] fixed top-1/2 transform -translate-y-1/2 left-0 h-auto rounded-e-3xl">
            <div className="container mx-auto justify-between items-center" id="navbarNav">
                <div className="flex flex-col">
                    {navbar_logo.map((item) => {
                        let linkClass = "hover:text-[#000000] my-5 lg:my-10 items-center";
                        let isActive = false;

                        // If-else untuk menentukan status aktif
                        if (activeEndpoint === `#${item.name}`) {
                            linkClass += " text-white border-b-2 border-white dark:border-[#3F2727]";
                            isActive = true;
                        }

                        return (
                            <Link
                                key={item.name}
                                href={`#${item.name}`}
                                onClick={() => setActiveEndpoint(`#${item.name}`)}
                                className={linkClass}
                            >
                                <LogoComponent
                                    logo={item.logo}
                                    isActive={isActive}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav >
    );
};