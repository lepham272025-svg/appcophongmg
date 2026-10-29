import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Volume2,
  Award,
  Star,
  ArrowUp,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight,
} from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useApp } from '../../context/AppContext';

interface GameMazeVillageProps {
  onBack: () => void;
}

export const GameMazeVillage: React.FC<GameMazeVillageProps> = ({ onBack }) => {
  const { addStar } = useApp();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6;

  // Player position (row, col)
  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
  const goalPos: [number, number] = [gridSize - 1, gridSize - 1];

  // Obstacle grid (true means rock obstacle)
  const [obstacles, setObstacles] = useState<boolean[][]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [movesCount, setMovesCount] = useState<number>(0);

  // Generate solvable maze with rocks
  const generateMaze = (size: number) => {
    const obs: boolean[][] = Array(size).fill(false).map(() => Array(size).fill(false));

    // Simple curated layout based on size to ensure clear solvable path
    if (size === 4) {
      obs[1][0] = true;
      obs[1][2] = true;
      obs[2][3] = true;
    } else if (size === 5) {
      obs[1][1] = true;
      obs[2][3] = true;
      obs[3][1] = true;
      obs[3][2] = true;
    } else {
      // 6x6
      obs[1][1] = true;
      obs[1][3] = true;
      obs[2][4] = true;
      obs[3][1] = true;
      obs[3][2] = true;
      obs[4][4] = true;
    }

    setObstacles(obs);
    setPlayerPos([0, 0]);
    setIsGameOver(false);
    setMovesCount(0);
  };

  useEffect(() => {
    generateMaze(gridSize);
  }, [difficulty]);

  const movePlayer = (dr: number, dc: number) => {
    if (isGameOver) return;
    const [r, c] = playerPos;
    const nr = r + dr;
    const nc = c + dc;

    // Check bounds
    if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) {
      soundManager.playEncouragingChime();
      return;
    }

    // Check obstacle
    if (obstacles[nr] && obstacles[nr][nc]) {
      soundManager.playEncouragingChime();
      soundManager.speakVietnamese('Có hòn đá chặn lối rồi, bé đi đường khác nhé!');
      return;
    }

    // Valid move
    soundManager.playClick();
    setPlayerPos([nr, nc]);
    setMovesCount(m => m + 1);

    // Check victory
    if (nr === goalPos[0] && nc === goalPos[1]) {
      soundManager.playCelebrationFanfare();
      soundManager.speakVietnamese('Hoan hô! Bạn Ban Nhỏ đã về đến ngôi nhà sàn ấm áp rồi!');
      setIsGameOver(true);
      addStar(2);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') movePlayer(-1, 0);
      else if (e.key === 'ArrowDown') movePlayer(1, 0);
      else if (e.key === 'ArrowLeft') movePlayer(0, -1);
      else if (e.key === 'ArrowRight') movePlayer(0, 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, isGameOver, obstacles]);

  const handleCellClick = (r: number, c: number) => {
    const [pr, pc] = playerPos;
    // Check if clicked cell is adjacent
    if (Math.abs(r - pr) + Math.abs(c - pc) === 1) {
      movePlayer(r - pr, c - pc);
    }
  };

  const speakGuide = () => {
    soundManager.speakVietnamese('Bé hãy bấm các nút mũi tên hoặc chạm vào ô bên cạnh để đưa Bạn Ban Nhỏ về ngôi nhà sàn nhé!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-4 border-[#FFCD53]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bản đồ trò chơi</span>
        </button>

        {/* Level Selector */}
        <div className="flex items-center gap-1 bg-sky-50 p-1 rounded-2xl border border-sky-200">
          {(['easy', 'medium', 'hard'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundManager.playClick();
                setDifficulty(lvl);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                difficulty === lvl
                  ? 'bg-[#0D65C9] text-white shadow-sm'
                  : 'text-sky-900 hover:bg-sky-100'
              }`}
            >
              {lvl === 'easy' ? '4×4 (Dễ)' : lvl === 'medium' ? '5×5 (Vừa)' : '6×6 (Thử thách)'}
            </button>
          ))}
        </div>

        <button
          onClick={() => generateMaze(gridSize)}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
          title="Bắt đầu lại"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {isGameOver ? (
        <div className="text-center py-12 px-4 animate-fadeIn">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce text-white">
            <Award className="w-14 h-14" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            HOAN HÔ BẠN BAN NHỎ ĐÃ VỀ NHÀ!
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-600 mb-6">
            Bé định hướng không gian rất tài tình, chỉ mất {movesCount} bước đi để về đích!
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-500 animate-pulse" />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => generateMaze(gridSize)}
              className="px-6 py-3 bg-gradient-to-r from-[#0D65C9] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-extrabold rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              Chơi thêm một màn nữa
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl transition-all"
            >
              Về thế giới trò chơi
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {/* Guide Banner */}
          <div className="flex items-center justify-between gap-3 bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧭</span>
              <div>
                <h3 className="text-sm sm:text-base font-black text-blue-950">
                  Dẫn Bạn Ban Nhỏ 🌸 vượt qua rừng núi về với ngôi nhà sàn 🏡!
                </h3>
                <p className="text-xs text-blue-700 font-semibold">
                  Bé có thể bấm nút mũi tên hoặc chạm trực tiếp vào ô cạnh bên nhé.
                </p>
              </div>
            </div>
            <button
              onClick={speakGuide}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md shrink-0 transition-transform active:scale-90"
              title="Nghe hướng dẫn"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* The Maze Grid */}
            <div className="flex justify-center">
              <div
                className="bg-emerald-100/80 p-3 sm:p-4 rounded-3xl border-4 border-emerald-300 shadow-md inline-block"
              >
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: gridSize }).map((_, r) =>
                    Array.from({ length: gridSize }).map((_, c) => {
                      const isPlayer = playerPos[0] === r && playerPos[1] === c;
                      const isGoal = goalPos[0] === r && goalPos[1] === c;
                      const isObstacle = obstacles[r]?.[c];
                      const isAdjacent =
                        Math.abs(r - playerPos[0]) + Math.abs(c - playerPos[1]) === 1;

                      return (
                        <div
                          key={`${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-2xl transition-all duration-200 select-none ${
                            isObstacle
                              ? 'bg-stone-300 border-2 border-stone-400 text-stone-600 cursor-not-allowed shadow-inner'
                              : isPlayer
                              ? 'bg-pink-100 border-3 border-pink-400 shadow-md scale-105'
                              : isGoal
                              ? 'bg-amber-100 border-3 border-amber-400 animate-pulse'
                              : isAdjacent
                              ? 'bg-white/90 border-2 border-emerald-400 hover:bg-emerald-50 cursor-pointer hover:scale-105'
                              : 'bg-white/70 border border-emerald-200'
                          }`}
                        >
                          {isPlayer ? (
                            <span className="text-2xl sm:text-3xl animate-bounce">🌸</span>
                          ) : isGoal ? (
                            <span className="text-2xl sm:text-3xl">🏡</span>
                          ) : isObstacle ? (
                            <span className="text-xl sm:text-2xl">🪨</span>
                          ) : null}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Direction Arrow Controller (Kid friendly big buttons) */}
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Bàn điều khiển hướng đi:
              </p>

              {/* Up */}
              <button
                onClick={() => movePlayer(-1, 0)}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-sky-400 to-[#0D65C9] text-white rounded-3xl shadow-lg border-3 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                title="Đi Lên"
              >
                <ArrowUp className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>

              {/* Middle row: Left and Right */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => movePlayer(0, -1)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-sky-400 to-[#0D65C9] text-white rounded-3xl shadow-lg border-3 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  title="Sang Trái"
                >
                  <ArrowLeftIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                </button>

                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-3xl border-2 border-amber-300 flex items-center justify-center font-black text-amber-900 text-sm">
                  {movesCount} bước
                </div>

                <button
                  onClick={() => movePlayer(0, 1)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-sky-400 to-[#0D65C9] text-white rounded-3xl shadow-lg border-3 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  title="Sang Phải"
                >
                  <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10" />
                </button>
              </div>

              {/* Down */}
              <button
                onClick={() => movePlayer(1, 0)}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-sky-400 to-[#0D65C9] text-white rounded-3xl shadow-lg border-3 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                title="Đi Xuống"
              >
                <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
