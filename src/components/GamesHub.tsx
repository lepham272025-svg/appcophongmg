import React, { useState } from 'react';
import { GAMES_CATALOG, GameMetadata } from '../data/gamesData';
import { GameCountingBan } from './games/GameCountingBan';
import { GameLetters } from './games/GameLetters';
import { GameHouseBuilder } from './games/GameHouseBuilder';
import { GameColorMarket } from './games/GameColorMarket';
import { GameEcoVillage } from './games/GameEcoVillage';
import { GameMazeVillage } from './games/GameMazeVillage';
import { soundManager } from '../utils/audio';
import { Play, Sparkles } from 'lucide-react';

interface GamesHubProps {
  initialGameSlug?: string | null;
}

export const GamesHub: React.FC<GamesHubProps> = ({ initialGameSlug = null }) => {
  const [activeGameSlug, setActiveGameSlug] = useState<string | null>(initialGameSlug);

  const handleSelectGame = (slug: string) => {
    soundManager.playClick();
    setActiveGameSlug(slug);
  };

  const handleBackToCatalog = () => {
    soundManager.playClick();
    setActiveGameSlug(null);
  };

  if (activeGameSlug === 'be-dem-hoa-ban') {
    return <GameCountingBan onBack={handleBackToCatalog} />;
  }
  if (activeGameSlug === 'chu-cai-que-em') {
    return <GameLetters onBack={handleBackToCatalog} />;
  }
  if (activeGameSlug === 'xay-ngoi-nha-cua-be') {
    return <GameHouseBuilder onBack={handleBackToCatalog} />;
  }
  if (activeGameSlug === 'cho-phien-sac-mau') {
    return <GameColorMarket onBack={handleBackToCatalog} />;
  }
  if (activeGameSlug === 'be-bao-ve-ban-lang-xanh') {
    return <GameEcoVillage onBack={handleBackToCatalog} />;
  }
  if (activeGameSlug === 'tim-duong-ve-ban') {
    return <GameMazeVillage onBack={handleBackToCatalog} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-3 border border-amber-300">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>6 TRÒ CHƠI HỌC TẬP TƯƠNG TÁC ĐẶC SẮC</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D65C9] tracking-tight mb-3">
          THẾ GIỚI TRÒ CHƠI BẢN LÀNG EM
        </h1>
        <p className="text-base sm:text-lg font-semibold text-slate-600">
          Vừa học vừa chơi cùng Bạn Ban Nhỏ! Mỗi trò chơi giúp bé làm quen với các con số, chữ cái, hình khối và tình yêu bản làng quê hương.
        </p>
      </div>

      {/* Grid of 6 Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES_CATALOG.map((game, index) => (
          <div
            key={game.slug}
            onClick={() => handleSelectGame(game.slug)}
            className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-4 border-[#FFCD53] hover:border-[#FB789E] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-16 h-16 rounded-2xl bg-amber-50 group-hover:bg-pink-50 border-2 border-amber-200 group-hover:border-pink-300 flex items-center justify-center text-3xl shadow-inner transition-colors">
                  {game.icon}
                </span>
                <span className="bg-sky-50 text-sky-700 font-black text-xs px-3 py-1 rounded-full border border-sky-200">
                  Trò chơi số {index + 1}
                </span>
              </div>

              {/* Title & Domain */}
              <h3 className="text-xl font-black text-[#0D65C9] group-hover:text-pink-600 transition-colors mb-1">
                {game.title}
              </h3>
              <p className="text-xs font-bold text-emerald-700 mb-2">
                {game.targetDomain}
              </p>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                {game.subTitle}
              </p>
            </div>

            {/* Play Button */}
            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-[#0D65C9] to-blue-600 group-hover:from-[#FB789E] group-hover:to-pink-600 text-white font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-102"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>VÀO CHƠI NGAY</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
