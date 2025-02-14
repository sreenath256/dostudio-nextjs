"use client";

import { usePathname, useRouter } from "next/navigation";

const ContactButton = () => {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === "/contact") return null; // Hide button on contact page

    return (
        <div className="fixed bottom-0 z-[999999] left-0 w-full  p-4 flex justify-center ">
            <button
                onClick={() => router.push("/contact")}
                className="bg-primarygreen text-black font-medium py-3 px-6 rounded-[3rem] w-full md:hidden max-w-xs capitalize"
            >
                enquire now
            </button>
            <button
                onClick={() => router.push("/contact")}
                className="bg-primarygreen text-black font-medium py-3 px-6 rounded-[3rem] w-full hidden md:block hover:scale-110 duration-150  max-w-xs capitalize"
            >
                enquire now
            </button>
        </div>
    );
};

export default ContactButton;
