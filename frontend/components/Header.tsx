import React from 'react';
import { Heart, Volume2, VolumeX, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  isAudioEnabled: boolean;
  setIsAudioEnabled: (enabled: boolean) => void;
  language: 'id' | 'en';
  setLanguage: (lang: 'id' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({
  fontSize,
  setFontSize,
  isAudioEnabled,
  setIsAudioEnabled,
  language,
  setLanguage
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-[#810B38] text-[#F1E2D1] shadow-md sticky top-0 z-50 border-b border-[#DCC3AA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-[#F1E2D1] p-2.5 rounded-full text-[#810B38] shadow-inner">
              <Heart className="h-7 w-7 fill-[#810B38] stroke-[#541A1A]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                {t.appName}
                <span className="text-xs bg-[#541A1A] text-[#F1E2D1] px-2.5 py-0.5 rounded-full font-medium border border-[#DCC3AA]">
                  {t.companionBadge}
                </span>
              </h1>
              <p className="text-xs text-[#DCC3AA] font-medium">{t.subTitle}</p>
            </div>
          </div>

          {/* Accessibility, Language & Privacy Controls */}
          <div className="flex items-center space-x-4">
            {/* Anonymous Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-[#541A1A]/50 px-3 py-1.5 rounded-lg border border-[#DCC3AA]/30 text-xs text-[#F1E2D1]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.anonymousBadge}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#541A1A]/60 rounded-lg p-1 border border-[#DCC3AA]/30">
              <Globe className="h-3.5 w-3.5 text-[#DCC3AA] mx-1.5" />
              <button
                onClick={() => setLanguage('id')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  language === 'id' ? 'bg-[#F1E2D1] text-[#810B38] shadow' : 'text-[#DCC3AA] hover:text-white'
                }`}
                title="Bahasa Indonesia Baku"
              >
                ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-[#F1E2D1] text-[#810B38] shadow' : 'text-[#DCC3AA] hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Font Size Controls */}
            <div className="flex items-center bg-[#541A1A]/60 rounded-lg p-1 border border-[#DCC3AA]/30">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  fontSize === 'normal' ? 'bg-[#F1E2D1] text-[#810B38] shadow' : 'text-[#DCC3AA] hover:text-white'
                }`}
                title={language === 'id' ? "Ukuran Teks Normal" : "Normal Text Size"}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 rounded text-sm font-bold transition-all ${
                  fontSize === 'large' ? 'bg-[#F1E2D1] text-[#810B38] shadow' : 'text-[#DCC3AA] hover:text-white'
                }`}
                title={language === 'id' ? "Ukuran Teks Besar" : "Large Text Size"}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 rounded text-base font-bold transition-all ${
                  fontSize === 'xlarge' ? 'bg-[#F1E2D1] text-[#810B38] shadow' : 'text-[#DCC3AA] hover:text-white'
                }`}
                title={language === 'id' ? "Ukuran Teks Sangat Besar" : "Extra Large Text Size"}
              >
                A++
              </button>
            </div>

            {/* Audio Assistant Toggle */}
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isAudioEnabled
                  ? 'bg-[#DCC3AA] border-[#F1E2D1] text-[#541A1A] shadow-lg animate-pulse'
                  : 'bg-[#541A1A]/60 border-[#DCC3AA]/30 text-[#DCC3AA] hover:text-white'
              }`}
              title={language === 'id' ? "Aktifkan Suara Pembaca" : "Toggle Voice Reader"}
            >
              {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span className="hidden sm:inline">{isAudioEnabled ? (language === 'id' ? 'Suara Aktif' : 'Voice Active') : (language === 'id' ? 'Suara Mati' : 'Voice Off')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Anonymous Badge */}
      <div className="md:hidden bg-[#541A1A] px-4 py-1.5 text-center text-xs text-[#DCC3AA] border-t border-[#810B38] flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{t.anonymousMobile}</span>
      </div>
    </header>
  );
};
