// components/LoadingWrapper.jsx
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

export default function LoadingWrapper({ isLoading, children }) {

    if (isLoading) {
        // --- UI Skeleton Dimulai ---
        return (
            // Container utama untuk menengahkan skeleton (mirip layout page.jsx)
            // Kita tidak menengahkan secara vertikal penuh agar mirip halaman asli
            <div className="relative flex min-h-screen">
                {/* 1. Skeleton Sidebar */}
                {/* Sesuaikan h-[] dan w-[] agar mirip ukuran sidebar asli Anda */}
                <Skeleton className="fixed top-1/2 transform -translate-y-1/2 left-0 h-[350px] w-[70px] lg:w-[90px] rounded-r-3xl" />

                {/* 2. Skeleton Konten Utama (mirip HomeSection) */}
                {/* Gunakan padding/margin mirip page.jsx */}
                <div className="flex-grow flex items-center justify-center lg:mx-40 mx-[9rem] lg:my-0 my-24 pl-[80px] lg:pl-[100px]"> {/* Tambahkan padding kiri untuk memberi ruang bagi skeleton sidebar */}
                    <div className='flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full animate-pulse'> {/* Tambahkan animate-pulse */}
                        {/* Skeleton Area Teks & Tombol */}
                        <div className='flex flex-col gap-5 flex-1 order-2 md:order-1'>
                            <Skeleton className="h-6 w-1/4 rounded" /> {/* Judul kecil */}
                            <Skeleton className="h-10 w-3/4 rounded" /> {/* Judul besar */}
                            <Skeleton className="h-4 w-full rounded" /> {/* Paragraf 1 */}
                            <Skeleton className="h-4 w-5/6 rounded" /> {/* Paragraf 2 */}
                            <Skeleton className="h-4 w-1/2 rounded" /> {/* Teks tebal */}
                            {/* Skeleton Tombol */}
                            <div className="flex flex-row gap-5 my-2">
                                <Skeleton className="h-10 w-32 rounded-full" /> {/* Tombol 1 */}
                                <Skeleton className="h-10 w-32 rounded-full" /> {/* Tombol 2 */}
                            </div>
                        </div>
                        {/* Skeleton Gambar */}
                        <div className="relative aspect-[1/1] w-full max-w-[200px] md:max-w-[300px] lg:max-w-[320px] order-1 md:order-2"> {/* Sesuaikan ukuran max-w-* */}
                            <Skeleton className="h-full w-full rounded-full" /> {/* Gambar bulat */}
                        </div>
                    </div>
                </div>
            </div>
        );
        // --- UI Skeleton Selesai ---
    }

    // Render children jika loading selesai
    return <>{children}</>;
}