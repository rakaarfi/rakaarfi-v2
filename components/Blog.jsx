"use client"; // Add this for client-side hooks
import React, { useState } from 'react';
import Image from "next/image";
import { Quicksand, Playwrite_US_Trad } from 'next/font/google';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import SectionLayout from './SectionLayout';

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

const ARTICLES_PER_PAGE = 9;

export default function Blog() {
    const [allArticles, setAllArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMediumArticles = async () => {
        if (allArticles.length > 0) return;

        setIsLoading(true);
        setError(null);
        try {
            const cacheBuster = `_=${new Date().getTime()}`;
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rakaarfi&${cacheBuster}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(data.message || 'Failed to fetch articles from Medium feed.');
            }

            const processedArticles = data.items
                .filter(item => item.title && item.link)
                .map(item => {
                    let imageUrl = item.thumbnail || null;
                    let snippet = '';

                    if (item.description) {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = item.description;

                        if (!imageUrl) {
                            const imgTag = tempDiv.querySelector('img');
                            if (imgTag) imageUrl = imgTag.src;
                        }
                        if (!imageUrl) {
                            const figureImg = tempDiv.querySelector('figure img');
                            if (figureImg) imageUrl = figureImg.src;
                        }

                        tempDiv.querySelectorAll('figure, figcaption, img, style, script').forEach(el => el.remove());
                        snippet = tempDiv.textContent || '';
                        snippet = snippet.replace(/\s+/g, ' ').trim();
                        snippet = snippet.substring(0, 150) + (snippet.length > 150 ? '...' : '');
                    }

                    return {
                        id: item.guid || item.link,
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        imageUrl: imageUrl,
                        snippet: snippet || "No description available.",
                    };
                });

            setAllArticles(processedArticles);

        } catch (err) {
            console.error("Fetching Medium articles failed:", err);
            setError(err.message || 'Failed to load articles.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleExploreClick = () => {
        if (allArticles.length === 0 || error) {
            fetchMediumArticles();
        }
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const articlesToShow = allArticles.slice(startIndex, endIndex);

    // --- Render Logic ---

    const renderModalContent = () => (
        <>
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(ARTICLES_PER_PAGE)].map((_, index) => (
                        // Skeleton uses muted colors by default, should adapt
                        <Card key={index} className="flex flex-col animate-pulse bg-card border-border">
                            <Skeleton className="h-48 w-full rounded-t-lg bg-muted" />
                            <CardHeader>
                                <Skeleton className="h-5 w-3/4 bg-muted" />
                                <Skeleton className="h-3 w-1/2 mt-2 bg-muted" />
                            </CardHeader>
                            <CardContent className="flex-grow space-y-2">
                                <Skeleton className="h-4 w-full bg-muted" />
                                <Skeleton className="h-4 w-full bg-muted" />
                                <Skeleton className="h-4 w-5/6 bg-muted" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-8 w-24 bg-muted" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {error && !isLoading && (
                <div className="text-center py-10">
                    {/* Use destructive color for error text */}
                    <p className="text-destructive font-semibold">Error loading articles:</p>
                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    {/* Button defaults should use theme */}
                    <Button onClick={fetchMediumArticles} variant="outline" size="sm" className="mt-4">
                        Try Again
                    </Button>
                </div>
            )}

            {!isLoading && !error && allArticles.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {articlesToShow.map((article) => (
                            // Card uses bg-card, text-card-foreground by default
                            <Card key={article.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border-border">
                                {article.imageUrl ? (
                                    // <div className="aspect-video w-full overflow-hidden">
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            fill
                                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                            unoptimized={true}
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                    </div>
                                ) : (
                                    // Use muted background for placeholder
                                    <div className="aspect-video w-full bg-muted flex items-center justify-center">
                                        <span className="text-xs text-muted-foreground">No Image</span>
                                    </div>
                                )}
                                {/* CardHeader uses card-foreground by default */}
                                <CardHeader className="pb-2">
                                    {/* Title uses card-foreground (or main foreground) */}
                                    <CardTitle className={`${quicksand.className} text-lg font-semibold leading-tight line-clamp-2 text-card-foreground`}>{article.title}</CardTitle>
                                    {/* Description uses muted-foreground */}
                                    <CardDescription className="text-xs text-muted-foreground pt-1">
                                        {new Date(article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    {/* Snippet uses muted-foreground */}
                                    <p className={`${quicksand.className} text-sm text-muted-foreground line-clamp-3`}>{article.snippet}</p>
                                </CardContent>
                                <CardFooter>
                                    {/* Link variant uses primary color */}
                                    <Button asChild variant="link" className="p-0 h-auto text-sm text-primary hover:text-primary/90">
                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className={`${playwrite.className} flex items-center gap-1 group`}>
                                            View Article
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        // Use border color from theme
                        <div className="flex justify-center items-center gap-4 mt-4 pt-4 border-t border-border">
                            {/* Outline buttons use theme variables */}
                            <Button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1 || isLoading}
                                variant="outline"
                                size="sm"
                            >
                                Previous
                            </Button>
                            {/* Use muted-foreground for page indicator */}
                            <span className="text-sm text-muted-foreground font-medium">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages || isLoading}
                                variant="outline"
                                size="sm"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}

            {!isLoading && !error && allArticles.length === 0 && (
                // Use muted-foreground for empty state message
                <p className="text-center text-muted-foreground py-10">No articles found or the feed might be empty.</p>
            )}
        </>
    );


    //     return (
    //         // Use bg-background and text-foreground for the main container
    //         <div className="min-h-screen flex flex-col justify-center items-center py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
    //             <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 w-full max-w-6xl`}>
    //                 {/* Text Content */}
    //                 <div className='flex flex-col gap-6 lg:gap-8 max-w-xl text-center lg:text-left order-2 lg:order-1'>
    //                     {/* Titles use main foreground */}
    //                     <h1 className={`${quicksand.className} lg:text-6xl text-4xl font-bold text-foreground`}>The Dev's Notebook</h1>
    //                     {/* Secondary text uses muted-foreground */}
    //                     <p className={`${quicksand.className} lg:text-xl text-base `}>
    //                         Join me as I document my journey as a developer, sharing insights, tutorials, and lessons learned along the way. From tackling coding challenges to exploring the latest tech trends, there's always something exciting to discover.
    //                     </p>
    //                     <div className="flex justify-center lg:justify-start mt-4">
    //                         {/* Dialog Trigger Button */}
    //                         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    //                             <DialogTrigger asChild>
    //                                 {/* New Button using Shadcn <Button> (Matches "View Portfolio" style) */}
    //                                 <Button
    //                                     variant="outline" // Base variant
    //                                     size="lg"
    //                                     className={`${playwrite.className} shadow text-xs lg:text-xl rounded-[0.8rem] py-[22px]
    //                                            border-[#3F2727] text-[#3F2727] bg-transparent hover:bg-[#3F2727] hover:text-[#F9EAE1]
    //                                            dark:border-[#806C60] dark:text-[#F9EAE1] dark:hover:bg-[#806C60] dark:hover:text-[#F9EAE1]
    //                                            transition-colors duration-200 ease-in-out focus-visible:ring-offset-0 focus-visible:ring-0`}
    //                                     onClick={handleExploreClick}
    //                                 >
    //                                     Explore My Notebook
    //                                 </Button>
    //                             </DialogTrigger>
    //                             {/* Dialog uses bg-background, border-border by default */}
    //                             <DialogContent className="sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-6xl max-h-[90vh] flex flex-col bg-background border-border">
    //                                 {/* Header uses border-border */}
    //                                 <DialogHeader className="border-b border-border pb-4">
    //                                     {/* Title uses foreground */}
    //                                     <DialogTitle className={`${quicksand.className} text-2xl font-bold text-foreground`}>The Dev's Notebook - Articles</DialogTitle>
    //                                     {/* Description uses muted-foreground */}
    //                                     <DialogDescription className="text-sm text-muted-foreground">
    //                                         My latest posts from Medium. Page {currentPage} of {totalPages > 0 ? totalPages : 1}.
    //                                     </DialogDescription>
    //                                 </DialogHeader>
    //                                 <div className="flex-grow overflow-y-auto p-1 pr-3 -mr-2 mt-4 mb-4 custom-scrollbar">
    //                                     {renderModalContent()}
    //                                 </div>
    //                                 {/* Footer uses border-border */}
    //                                 <DialogFooter className="border-t border-border pt-4">
    //                                     {/* Muted text for article count */}
    //                                     <span className="text-xs text-muted-foreground mr-auto pl-2">
    //                                         {allArticles.length > 0 ? `Showing ${articlesToShow.length} of ${allArticles.length} articles` : ''}
    //                                     </span>
    //                                     {/* Close button uses outline variant (theme colors) */}
    //                                     <DialogClose asChild>
    //                                         <Button type="button" variant="outline">
    //                                             Close
    //                                         </Button>
    //                                     </DialogClose>
    //                                 </DialogFooter>
    //                             </DialogContent>
    //                         </Dialog>
    //                     </div>
    //                 </div>
    //                 {/* Image */}
    //                 <div className="relative aspect-[3/4] w-full max-w-[300px] lg:max-w-[320px] homepage-section-image">
    //                     <Image
    //                         src="/home-photo.jpg"
    //                         alt="A picture representing the blog section"
    //                         fill
    //                         sizes="(max-width: 768px) 90vw, 40vw"
    //                         className="homepage-image object-cover rounded-full"
    //                         priority
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    const paragraphs = [
        "Join me as I document my journey as a developer, sharing insights, tutorials, and lessons learned along the way. From tackling coding challenges to exploring the latest tech trends, there's always something exciting to discover."
    ];

    return (
        // Gunakan SectionLayout
        <SectionLayout
            id="blog" // ID dipindahkan ke div pembungkus di page.jsx
            title="The Dev's Notebook"
            paragraphs={paragraphs}
            imageSrc="/home-photo.jpg" // Atau gambar lain yang relevan
            imageAlt="A picture representing the blog section"
            imagePosition="right" // Sesuaikan posisi gambar
        >
            {/* Tombol DialogTrigger sebagai children */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline" // Atau default, sesuaikan style
                        size="lg"
                        className={`${playwrite.className} shadow text-xs lg:text-xl rounded-full`}
                        onClick={handleExploreClick}
                    >
                        Explore My Notebook
                    </Button>
                </DialogTrigger>
                {/* Dialog Content tetap di sini, di luar children SectionLayout */}
                <DialogContent className="sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-6xl max-h-[90vh] flex flex-col bg-background border-border">
                    <DialogHeader className="border-b border-border pb-4">
                        <DialogTitle className={`${playwrite.className} text-2xl font-bold text-foreground`}>The Dev's Notebook - Articles</DialogTitle> {/* Hapus Quicksand jika tidak perlu */}
                        <DialogDescription className="text-sm text-muted-foreground">
                            My latest posts from Medium. Page {currentPage} of {totalPages > 0 ? totalPages : 1}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto p-1 pr-3 -mr-2 mt-4 mb-4 custom-scrollbar">
                        {renderModalContent()}
                    </div>
                    <DialogFooter className="border-t border-border pt-4">
                        <span className="text-xs text-muted-foreground mr-auto pl-2">
                            {allArticles.length > 0 ? `Showing ${articlesToShow.length} of ${allArticles.length} articles` : ''}
                        </span>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SectionLayout>
    );
}