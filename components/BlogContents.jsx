import Link from 'next/link';

const { parse } = require('rss-to-json');
const res = await parse('https://medium.com/feed/@rakaarfi');
const data = JSON.stringify(res.items, null, 3);
const posts = JSON.parse(data);

export default function BlogContents() {
    return (
        <div className='flex flex-col mx-40'>
            <div className="relative lg:h-[50%] lg:w-[50%] md:h-[100%] md:w-[100%] h-[80%] w-[80%]">
                {posts.map((post) => (
                    <div key={post.link} className='relative my-10'>
                        {(() => {
                            const regex = /src="([^"]+)"/;
                            const match = regex.exec(post.content);
                            if (match) {
                                return (

                                    <img
                                        src={match[1]}
                                        alt="Post Image"
                                        layout="fill"
                                        objectfit="cover"
                                        className='rounded-[5%] opacity-65 h-full w-full hover:scale-105 transition-transform duration-200 z-0'
                                    />

                                );
                            }
                        })()}
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0">
                            <Link href={post.link} className='blog-button shadow text-xl bg-gray-500 hover:bg-[#3F2727] hover:text-white font-bold rounded-full border border-[#3F2727]'>
                                {post.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

{/* <div className='flex flex-col mx-40'>
    <div className="relative lg:h-[50%] lg:w-[50%] md:h-[100%] md:w-[100%] h-[80%] w-[80%]">
        {posts.map((post) => (
            <div key={post.link} className="relative">
                {(() => {
                    const regex = /src="([^"]+)"/;
                    const match = regex.exec(post.content);
                    if (match) {
                        return (
                            <img
                                src={match[1]}
                                alt="Post Image"
                                layout="fill"
                                objectFit="cover"
                                className='rounded-[5%] opacity-65 h-full w-full hover:scale-105 transition-transform duration-200'
                            />
                        );
                    }
                })()}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
                    <Link href={post.link} className='text-2xl font-bold text-white hover:text-[#3F2727] bg-black/50 px-4 py-2 rounded'>
                        {post.title}
                    </Link>
                </div>
            </div>
        ))}
    </div>
</div> */}
