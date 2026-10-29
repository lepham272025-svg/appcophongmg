/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ExplorationMap } from './components/ExplorationMap';
import { GamesHub } from './components/GamesHub';
import { StoryReader } from './components/StoryReader';
import { SteamHub } from './components/SteamHub';
import { TeacherPortal } from './components/TeacherPortal';
import { EnglishCorner } from './components/EnglishCorner';
import { AiLessonPlanner } from './components/AiLessonPlanner';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedGameSlug, setSelectedGameSlug] = useState<string | null>(null);

  const handleSelectGameFromMap = (gameSlug: string) => {
    setSelectedGameSlug(gameSlug);
    setCurrentTab('tro-choi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'tro-choi') {
      setSelectedGameSlug(null);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FFF6DF] text-slate-800 font-sans selection:bg-[#FB789E] selection:text-white">
        {/* Navigation Bar */}
        <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} />

        {/* Dynamic Main View */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <HomePage onNavigate={handleTabChange} />
          )}

          {currentTab === 'kham-pha' && (
            <ExplorationMap onSelectGame={handleSelectGameFromMap} />
          )}

          {currentTab === 'tro-choi' && (
            <GamesHub initialGameSlug={selectedGameSlug} />
          )}

          {currentTab === 'tieng-anh' && (
            <EnglishCorner />
          )}

          {currentTab === 'truyen-ke' && (
            <StoryReader />
          )}

          {currentTab === 'steam' && (
            <SteamHub />
          )}

          {currentTab === 'soan-giao-an' && (
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
              <AiLessonPlanner />
            </div>
          )}

          {currentTab === 'giao-vien' && (
            <TeacherPortal />
          )}

          {currentTab === 'quyen-rieng-tu' && (
            <PrivacyPolicy onBack={() => handleTabChange('home')} />
          )}
        </main>

        {/* Global Footer */}
        <Footer onNavigate={handleTabChange} />
      </div>
    </AppProvider>
  );
}
