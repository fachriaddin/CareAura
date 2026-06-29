import React from 'react';
import { HeartPulse, Baby, Sparkles, ArrowRight } from 'lucide-react';
import { TRACKS, TRANSLATIONS } from '../constants';
import { TrackType } from '../types';

interface TrackSelectorProps {
  onSelectTrack: (trackId: TrackType) => void;
  activeTrack: TrackType | null;
  fontSizeClass: string;
  language: 'id' | 'en';
}

export const TrackSelector: React.FC<TrackSelectorProps> = ({
  onSelectTrack,
  activeTrack,
  fontSizeClass,
  language
}) => {
  const t = TRANSLATIONS[language];
  const tracks = TRACKS(language);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="h-8 w-8 text-[#810B38]" />;
      case 'Baby':
        return <Baby className="h-8 w-8 text-[#810B38]" />;
      case 'Sparkles':
        return <Sparkles className="h-8 w-8 text-[#810B38]" />;
      default:
        return <HeartPulse className="h-8 w-8 text-[#810B38]" />;
    }
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      return 'border-[#810B38] ring-4 ring-[#DCC3AA]/50 bg-[#F1E2D1]';
    }
    return 'border-[#DCC3AA] hover:border-[#810B38] bg-white hover:shadow-md';
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className={`font-extrabold text-[#541A1A] tracking-tight ${
          fontSizeClass === 'text-base' ? 'text-2xl' : fontSizeClass === 'text-lg' ? 'text-3xl' : 'text-4xl'
        }`}>
          {t.selectTrackTitle}
        </h2>
        <p className="text-[#541A1A]/80 mt-2 text-sm sm:text-base">
          {t.selectTrackDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((track) => {
          const isActive = activeTrack === track.id;
          return (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between h-full ${getColorClasses(
                track.color,
                isActive
              )}`}
            >
              <div>
                <div className="p-3 bg-[#F1E2D1] rounded-xl w-fit mb-4 border border-[#DCC3AA]">
                  {getIcon(track.icon)}
                </div>
                <h3 className="text-lg font-bold text-[#541A1A] leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs font-semibold text-[#810B38] mt-1">
                  {track.subtitle}
                </p>
                <p className="text-[#541A1A]/70 text-sm mt-3 leading-relaxed">
                  {track.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCC3AA]/30 w-full flex items-center justify-between text-sm font-bold text-[#810B38]">
                <span>{t.startConsultation}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
