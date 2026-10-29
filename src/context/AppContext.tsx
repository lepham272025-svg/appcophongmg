import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';

interface AppContextType {
  tvMode: boolean;
  setTvMode: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  earnedStars: number;
  addStar: (count?: number) => void;
  completedRegions: string[];
  markRegionCompleted: (id: string) => void;
  teacherAvatar: string;
  setTeacherAvatar: (url: string) => void;
  activeChildCode: string;
  setActiveChildCode: (code: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tvMode, setTvMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dienbien_tv_mode') === 'true';
    }
    return false;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [earnedStars, setEarnedStars] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('dienbien_stars') || 3);
    }
    return 3;
  });

  const [completedRegions, setCompletedRegions] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dienbien_completed_regions');
        return saved ? JSON.parse(saved) : ['vuon-hoa-ban'];
      } catch {
        return ['vuon-hoa-ban'];
      }
    }
    return ['vuon-hoa-ban'];
  });

  const [teacherAvatar, setTeacherAvatar] = useState<string>(
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'
  );

  const [activeChildCode, setActiveChildCode] = useState<string>('Bé 01');

  useEffect(() => {
    soundManager.setMuted(!soundEnabled);
  }, [soundEnabled]);

  const addStar = (count: number = 1) => {
    setEarnedStars(prev => {
      const next = prev + count;
      if (typeof window !== 'undefined') {
        localStorage.setItem('dienbien_stars', next.toString());
      }
      return next;
    });
    soundManager.playStarChime();
  };

  const markRegionCompleted = (id: string) => {
    if (!completedRegions.includes(id)) {
      const next = [...completedRegions, id];
      setCompletedRegions(next);
      if (typeof window !== 'undefined') {
        localStorage.setItem('dienbien_completed_regions', JSON.stringify(next));
      }
      addStar(2);
    }
  };

  return (
    <AppContext.Provider
      value={{
        tvMode,
        setTvMode: (v) => {
          setTvMode(v);
          if (typeof window !== 'undefined') {
            localStorage.setItem('dienbien_tv_mode', v.toString());
          }
        },
        soundEnabled,
        setSoundEnabled,
        earnedStars,
        addStar,
        completedRegions,
        markRegionCompleted,
        teacherAvatar,
        setTeacherAvatar,
        activeChildCode,
        setActiveChildCode,
      }}
    >
      <div className={tvMode ? 'tv-mode' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
