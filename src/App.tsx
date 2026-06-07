/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Twitch, Tv, HandHeart } from 'lucide-react';

export default function App() {
  const [platform, setPlatform] = useState<'kick' | 'twitch'>('kick');
  const [chatPlatform, setChatPlatform] = useState<'twitch' | 'kick'>('twitch');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const hostname = window.location.hostname;

  useEffect(() => {
    // Buscar a foto de perfil da Twitch (API sem autenticação Decapi)
    fetch('https://decapi.me/twitch/avatar/iagohale')
      .then((res) => res.text())
      .then((data) => {
        if (data && data.startsWith('http')) {
          setAvatarUrl(data.trim());
        }
      })
      .catch((err) => console.error('Erro ao buscar foto de perfil:', err));
  }, []);

  const playerSrc = platform === 'kick' 
    ? 'https://player.kick.com/iagohale' 
    : `https://player.twitch.tv/?channel=iagohale&parent=${hostname}`;

  const chatSrc = chatPlatform === 'twitch'
    ? `https://www.twitch.tv/embed/iagohale/chat?parent=${hostname}&theme=dark&darkpopout=true`
    : `https://kick.com/popout/iagohale/chat`;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-950 text-white font-sans overflow-hidden">
      {/* Modern Sleek black Header with Integrated Controls (No Overlays) */}
      <header 
        className="relative border-b border-gray-800/80 bg-black h-20 md:h-24 flex items-center px-4 md:px-6 shrink-0" 
      >
        <div className="relative z-10 flex w-full items-center justify-between gap-4">
          {/* Left portion: Twitch Avatar + Logo */}
          <div className="flex w-1/4 min-w-[100px] md:min-w-[120px] items-center justify-start gap-2">
            {avatarUrl && (
              <img 
                src={avatarUrl} 
                alt="iagohale avatar" 
                className="h-8 w-8 md:h-12 md:w-12 rounded-full border-2 border-red-600 shadow-[0_0_12px_rgba(220,38,38,0.4)] object-cover shrink-0 select-none" 
                referrerPolicy="no-referrer"
              />
            )}
            <img 
              src="logo.webp" 
              alt="iagohale logo" 
              className="h-8 md:h-14 w-auto object-contain select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" 
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Centered portion: Integrated Player and Chat switch selectors (No overlays!) */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4">
            {/* Player Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="hidden md:inline text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Player:</span>
              <div className="flex bg-gray-900 border border-gray-800 p-0.5 rounded-lg gap-1">
                <button 
                  onClick={() => setPlatform('kick')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                    platform === 'kick' 
                      ? 'bg-[#10b981] text-white shadow-md shadow-[#10b981]/25' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Tv className="w-3 h-3 shrink-0 text-white" />
                  <span>Kick</span>
                </button>
                <button 
                  onClick={() => setPlatform('twitch')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                    platform === 'twitch' 
                      ? 'bg-[#9146FF] text-white shadow-md shadow-[#9146FF]/35' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Twitch className="w-3 h-3 shrink-0 text-white" />
                  <span>Twitch</span>
                </button>
              </div>
            </div>

            {/* Chat Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="hidden md:inline text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Chat:</span>
              <div className="flex bg-gray-900 border border-gray-800 p-0.5 rounded-lg gap-1">
                <button 
                  onClick={() => setChatPlatform('kick')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                    chatPlatform === 'kick' 
                      ? 'bg-[#10b981] text-white shadow-md shadow-[#10b981]/25' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Tv className="w-3 h-3 shrink-0 text-white" />
                  <span>Kick</span>
                </button>
                <button 
                  onClick={() => setChatPlatform('twitch')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                    chatPlatform === 'twitch' 
                      ? 'bg-[#9146FF] text-white shadow-md shadow-[#9146FF]/35' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Twitch className="w-3 h-3 shrink-0 text-white" />
                  <span>Twitch</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right portion: Donate PIX Button */}
          <div className="flex w-1/4 min-w-[70px] md:min-w-[120px] justify-end items-center gap-2">
            <a 
              href="https://www.streamar.com.br/iagohale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2.5 rounded-lg text-[10px] md:text-sm font-bold border border-[#1D9A8D] bg-transparent hover:bg-[#1D9A8D]/10 text-[#1D9A8D] transition-all duration-150 shadow-md shadow-[#1D9A8D]/5 cursor-pointer select-none shrink-0 opacity-80 hover:opacity-100"
            >
              <HandHeart className="w-4 md:w-5 h-4 md:h-5 text-[#1D9A8D]" />
              <span className="hidden sm:inline text-[#1D9A8D]">Donate PIX</span>
              <span className="sm:hidden text-[#1D9A8D] font-black">PIX</span>
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
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Stream Player"
          />
        </div>
        
        {/* Twitch Chat Panel */}
        <aside className="w-full lg:w-80 xl:w-96 h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l border-gray-800/80 bg-gray-950">
          <iframe 
            src={chatSrc}
            className="w-full h-full border-0"
            title="Twitch Chat"
          />
        </aside>
      </main>
    </div>
  );
}
