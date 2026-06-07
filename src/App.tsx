/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Twitch, Tv, Heart, Settings, X } from 'lucide-react';

export default function App() {
  const [platform, setPlatform] = useState<'kick' | 'twitch'>('kick');
  const [chatPlatform, setChatPlatform] = useState<'twitch' | 'kick'>('twitch');
  const [showSettings, setShowSettings] = useState(false);
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
      {/* Modern Sleek black Header */}
      <header 
        className="relative border-b border-gray-800/80 bg-black h-20 md:h-24 flex items-center px-4 md:px-6 shrink-0" 
      >
        <div className="relative z-10 flex w-full items-center justify-between gap-4">
          {/* Left portion: Twitch Avatar + Logo */}
          <div className="flex w-1/4 min-w-[120px] items-center justify-start gap-2.5">
            {avatarUrl && (
              <img 
                src={avatarUrl} 
                alt="iagohale avatar" 
                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-red-600 shadow-[0_0_12px_rgba(220,38,38,0.4)] object-cover shrink-0 select-none" 
                referrerPolicy="no-referrer"
              />
            )}
            <img 
              src="logo.webp" 
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
                    ? 'bg-[#10b981] text-white shadow-lg shadow-[#10b981]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Tv className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 text-white" />
                <span className="text-white">Kick</span>
              </button>
              <button 
                onClick={() => setPlatform('twitch')}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-150 cursor-pointer select-none ${
                  platform === 'twitch' 
                    ? 'bg-[#9146FF] text-white shadow-lg shadow-[#9146FF]/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Twitch className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 text-white" />
                <span className="text-white">Twitch</span>
              </button>
            </div>
          </div>
          
          {/* Right portion: Donate PIX Button and Settings */}
          <div className="flex w-1/4 min-w-[80px] sm:min-w-[120px] justify-end items-center gap-2">
            <a 
               href="https://www.streamar.com.br/iagohale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold bg-[#1D9A8D] hover:bg-[#188075] text-white transition-colors duration-150 shadow-md shadow-[#1D9A8D]/10 cursor-pointer select-none shrink-0"
            >
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-white fill-white" />
              <span className="hidden sm:inline text-white">Donate PIX</span>
              <span className="sm:hidden text-white">PIX</span>
            </a>

            {/* Custom Interactive Settings - Just the gear icon */}
            <div className="shrink-0">
              <button 
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center p-2.5 md:p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white border border-gray-700/80 transition-colors duration-150 cursor-pointer select-none"
                title="Configurações de Chat"
              >
                <Settings className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              </button>
            </div>

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
            src={chatSrc}
            className="w-full h-full border-0"
            title="Twitch Chat"
          />
        </aside>
      </main>

      {/* Premium Centered Modular Settings View - Prevents obscuring Twitch chat iframe */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with elegant blur */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSettings(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-sm scale-100 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl transition-all duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-extrabold text-gray-200 uppercase tracking-wider">
                Configurações da Página
              </h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Content */}
            <div className="space-y-4">
              <div>
                <span className="block text-xs text-gray-400 font-semibold mb-2.5">
                  Alternar Plataforma do Chat
                </span>
                <div className="grid grid-cols-2 gap-2 bg-gray-950 p-1.5 rounded-xl border border-gray-800">
                  <button
                    onClick={() => {
                      setChatPlatform('twitch');
                      setShowSettings(false);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      chatPlatform === 'twitch'
                        ? 'bg-[#9146FF] text-white shadow-md shadow-[#9146FF]/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Twitch className="w-4 h-4 text-white" />
                    <span>Twitch</span>
                  </button>
                  <button
                    onClick={() => {
                      setChatPlatform('kick');
                      setShowSettings(false);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      chatPlatform === 'kick'
                        ? 'bg-[#10b981] text-white shadow-md shadow-[#10b981]/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Tv className="w-4 h-4 text-white" />
                    <span>Kick</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Footer info */}
            <div className="mt-6 pt-4 border-t border-gray-800/60 flex justify-center">
              <span className="text-[10px] font-mono text-gray-500">
                iagohale multi-stream • v1.3.0
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
