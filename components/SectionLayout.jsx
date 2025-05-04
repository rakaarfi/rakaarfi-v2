// components/SectionLayout.jsx
import Image from 'next/image';
import { Quicksand, Playwrite_US_Trad } from 'next/font/google';

// Inisialisasi font
const quicksand = Quicksand({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
});

const playwrite = Playwrite_US_Trad({
    weight: "400",
    subsets: ["latin"],
    display: "auto",
});

export default function SectionLayout({
    title,
    subtitle,
    paragraphs = [],
    imageSrc,
    imageAlt,
    imagePosition = 'right',
    imagePriority = false,
    children,
    className = '',
}) {
    // Tentukan urutan berdasarkan posisi gambar
    const textOrderClass = imagePosition === 'right' ? 'md:order-1' : 'md:order-2';
    const imageOrderClass = imagePosition === 'right' ? 'md:order-2' : 'md:order-1';

    return (
        // Div terluar: ID, tinggi minimal, flex centering, margin/padding dasar
        <div
            className={`min-h-screen flex items-center justify-center py-16 lg:py-24 px-4 sm:px-6 lg:px-8 ${className}`} // Padding standar
        >
            {/* Container Konten: Mengatur layout flex (col di mobile, row di md+), gap */}
            <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full max-w-6xl'> {/* Max width + gap */}

                {/* Area Konten Teks */}
                <div className={`flex flex-col gap-4 md:gap-6 flex-1 ${textOrderClass} text-center md:text-left`}> {/* Order, text align */}
                    {/* Subtitle (jika ada) */}
                    {subtitle && (
                        <h2 className={`${playwrite.className} text-lg lg:text-2xl text-primary`}> {/* Sesuaikan styling subtitle */}
                            {subtitle}
                        </h2>
                    )}

                    {/* Title Utama */}
                    {title && (
                        <h1 className={`${quicksand.className} text-4xl lg:text-6xl font-bold text-foreground`}>
                            {title}
                        </h1>
                    )}

                    {/* Paragraf */}
                    <div className="flex flex-col gap-3 mt-2"> {/* Wrapper paragraf */}
                        {paragraphs.map((p, index) => (
                            <p key={index} className={`${quicksand.className} text-base lg:text-xl text-foreground leading-relaxed`}> {/* Line height */}
                                {p} {/* Bisa string atau JSX */}
                            </p>
                        ))}
                    </div>

                    {/* Slot untuk Children (Tombol/Ikon) */}
                    {/* Wrapper anak agar flex dan rata kiri/tengahnya konsisten */}
                    <div className="flex flex-row flex-wrap gap-3 sm:gap-5 mt-4 justify-center md:justify-start">
                        {children}
                    </div>
                </div>

                {/* Area Gambar */}
                {imageSrc && ( // Hanya render jika ada imageSrc
                    <div className={`relative aspect-[3/4] w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[320px] ${imageOrderClass} order-first md:order-none`}> {/* Order, ukuran */}
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 640px) 70vw, (max-width: 768px) 40vw, 30vw" // Sesuaikan sizes
                            className="object-cover rounded-full shadow-lg" // Style gambar
                            priority={imagePriority} // Gunakan prop priority
                        />
                    </div>
                )}
            </div>
        </div>
    );
}