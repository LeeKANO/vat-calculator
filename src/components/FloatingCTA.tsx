import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingCTA = () => {
    return (
        <a
            href="https://open.kakao.com/o/sQY8T7Hg" // Generic placeholder or actual link if known
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-yellow-400 text-black px-6 py-4 rounded-full shadow-2xl hover:bg-yellow-500 hover:scale-110 transition-all duration-300 group ring-4 ring-yellow-400/20"
        >
            <div className="relative">
                <MessageCircle className="w-6 h-6 animate-bounce" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>
            <span className="font-bold text-lg whitespace-nowrap">상담하기</span>
        </a>
    );
};

export default FloatingCTA;
