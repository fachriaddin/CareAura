import React, { useState } from 'react';
import { Header } from './components/Header';
import { TrackSelector } from './components/TrackSelector';
import { ChatCompanion } from './components/ChatCompanion';
import { IngredientsMatrix } from './components/IngredientsMatrix';
import { MealBuilder } from './components/MealBuilder';
import { PuskesmasGuide } from './components/PuskesmasGuide';
import { TrackType } from './types';
import { MessageSquare, ArrowRightLeft, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { TRANSLATIONS } from './constants';

function App() {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [activeTrack, setActiveTrack] = useState<TrackType | null>(null);
  const [activeTab, setActiveTab] = useState<'CHAT' | 'MATRIX' | 'BUILDER' | 'GUIDE'>('CHAT');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  const t = TRANSLATIONS[language];

  // Map font size state to Tailwind classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-lg';
      case 'xlarge': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1E2D1]/30">
      {/* Accessible Header */}
      <Header
        fontSize={fontSize}
        setFontSize={setFontSize}
        isAudioEnabled={isAudioEnabled}
        setIsAudioEnabled={setIsAudioEnabled}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Track Selector (Always visible at top if not selected, or collapsible) */}
        {!activeTrack ? (
          <div className="py-8">
            <TrackSelector
              onSelectTrack={(track) => {
                setActiveTrack(track);
                setActiveTab('CHAT');
              }}
              activeTrack={activeTrack}
              fontSizeClass={getFontSizeClass()}
              language={language}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active Track Banner & Switcher */}
            <div className="bg-white border border-[#DCC3AA] rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#F1E2D1] p-2.5 rounded-xl text-[#810B38] border border-[#DCC3AA]">
                  <Heart className="h-6 w-6 fill-[#810B38] stroke-[#541A1A]" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold bg-[#F1E2D1] text-[#810B38] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#DCC3AA]">
                    {t.activeTrack}
                  </span>
                  <h2 className="text-lg font-extrabold text-[#541A1A] mt-1">
                    {activeTrack === 'CHRONIC'
                      ? (language === 'id' ? 'Pencegahan Sekunder (Penyakit Kronis)' : 'Secondary Prevention (Chronic Care)')
                      : activeTrack === 'MCH'
                      ? (language === 'id' ? 'Kesehatan Ibu & Anak (MCH)' : 'Maternal & Child Health (MCH)')
                      : (language === 'id' ? 'Pengembangan Remaja (13-18 Tahun)' : 'Youth Development (Ages 13-18)')}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setActiveTrack(null)}
                className="text-xs font-bold text-[#F1E2D1] hover:text-white bg-[#810B38] hover:bg-[#541A1A] px-4 py-2.5 rounded-xl border border-[#DCC3AA] transition-all"
              >
                {t.changeTrack}
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#DCC3AA] overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('CHAT')}
                className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'CHAT'
                    ? 'border-[#810B38] text-[#810B38]'
                    : 'border-transparent text-[#541A1A]/60 hover:text-[#541A1A]'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                {t.tabAiConsultation}
              </button>
              <button
                onClick={() => setActiveTab('MATRIX')}
                className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'MATRIX'
                    ? 'border-[#810B38] text-[#810B38]'
                    : 'border-transparent text-[#541A1A]/60 hover:text-[#541A1A]'
                }`}
              >
                <ArrowRightLeft className="h-4 w-4" />
                {t.tabLocalFoodMatrix}
              </button>
              <button
                onClick={() => setActiveTab('BUILDER')}
                className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'BUILDER'
                    ? 'border-[#810B38] text-[#810B38]'
                    : 'border-transparent text-[#541A1A]/60 hover:text-[#541A1A]'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                {t.tabHealthyPlateBuilder}
              </button>
              <button
                onClick={() => setActiveTab('GUIDE')}
                className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'GUIDE'
                    ? 'border-[#810B38] text-[#810B38]'
                    : 'border-transparent text-[#541A1A]/60 hover:text-[#541A1A]'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                {t.tabPuskesmasGuide}
              </button>
            </div>

            {/* Tab Content Rendering */}
            <div className="py-4">
              {activeTab === 'CHAT' && (
                <ChatCompanion
                  activeTrack={activeTrack}
                  fontSizeClass={getFontSizeClass()}
                  isAudioEnabled={isAudioEnabled}
                  language={language}
                />
              )}
              {activeTab === 'MATRIX' && (
                <IngredientsMatrix fontSizeClass={getFontSizeClass()} language={language} />
              )}
              {activeTab === 'BUILDER' && (
                <MealBuilder fontSizeClass={getFontSizeClass()} language={language} />
              )}
              {activeTab === 'GUIDE' && (
                <PuskesmasGuide language={language} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#541A1A] text-[#DCC3AA] py-8 border-t border-[#810B38] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-sm font-semibold text-[#F1E2D1]">
            {t.footerText}
          </p>
          <p className="text-xs text-[#DCC3AA]/70 max-w-2xl mx-auto leading-relaxed">
            {t.footerSub}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
