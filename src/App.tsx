/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Twitch, Tv, Heart } from 'lucide-react';

export default function App() {
  const [platform, setPlatform] = useState<'kick' | 'twitch'>('kick');
  const hostname = window.location.hostname;

  const playerSrc = platform === 'kick' 
    ? 'https://player.kick.com/iagohale' 
    : `https://player.twitch.tv/?channel=iagohale&parent=${hostname}`;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-950 text-white font-sans overflow-hidden">
      {/* Prettier Header with Custom Background Image */}
      <header 
        className="relative border-b border-gray-800/80 bg-cover bg-center overflow-hidden h-20 md:h-24 flex items-center px-4 md:px-6 shrink-0" 
        style={{ backgroundImage: "url('/Fundo.webp')" }}
      >
        {/* Dark overlay for rich contrast and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90 backdrop-blur-[1px]" />
        
        <div className="relative z-10 flex w-full items-center justify-between gap-4">
          {/* Left portion: Logo (replacing text) */}
          <div className="flex w-1/4 min-w-[80px] sm:min-w-[120px] justify-start">
            <img 
              src="/logo.webp" 
              alt="iagohale logo" 
              className="h-10 md:h-14 w-auto object-contain select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" 
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Centered portion: Player platform selector buttons */}
          <div className="flex-1 flex justify-center">
            <div className="flex bg-gray-900/90 border border-gray-800/80 p-1 md:p-1.5 rounded-xl gap-1.5 md:gap-2 shadow-inner">
              <button 
                onClick={() => setPlatform('kick')}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer select-none ${
                  platform === 'kick' 
                    ? 'bg-[#53fc18] text-black shadow-lg shadow-[#53fc18]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Tv className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                <span>Kick</span>
              </button>
              <button 
                onClick={() => setPlatform('twitch')}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer select-none ${
                  platform === 'twitch' 
                    ? 'bg-[#9146FF] text-white shadow-lg shadow-[#9146FF]/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Twitch className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                <span>Twitch</span>
              </button>
            </div>
          </div>
          
          {/* Right portion: Donate PIX Button */}
          <div className="flex w-1/4 min-w-[80px] sm:min-w-[120px] justify-end">
            <a 
              href="https://www.streamar.com.br/iagohale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold bg-[#32BCAD] hover:bg-[#2da99c] text-black transition-colors duration-150 shadow-md shadow-[#32BCAD]/10 cursor-pointer select-none"
            >
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 fill-black/10" />
              <span className="hidden sm:inline">Donate PIX</span>
              <span className="sm:hidden">PIX</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex flex-col lg:flex-row flex-grow w-full overflow-hidden">
        {/* Stream Player Panel */}
        <div className="flex-grow h-1/2 lg:h-full relative bg-black">
          <iframe 
            src={playerSrc}
            className="w-full h-full border-0"
            allowFullScreen
            title="Stream Player"
          />
        </div>
        
        {/* Twitch Chat Panel */}
        <aside className="w-full lg:w-80 xl:w-96 h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l border-gray-800/80 bg-gray-950">
          <iframe 
            src={`https://www.twitch.tv/embed/iagohale/chat?parent=${hostname}`}
            className="w-full h-full border-0"
            title="Twitch Chat"
          />
        </aside>
      </main>
    </div>
  );
}
