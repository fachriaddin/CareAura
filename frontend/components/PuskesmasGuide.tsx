import React from 'react';
import { MapPin, ShieldCheck, Calendar, Heart } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface PuskesmasGuideProps {
  language: 'id' | 'en';
}

export const PuskesmasGuide: React.FC<PuskesmasGuideProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-8">
      <div className="bg-[#F1E2D1] border border-[#DCC3AA] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-[#810B38] flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#810B38]" />
          {t.puskesmasGuideTitle}
        </h3>
        <p className="text-[#541A1A] text-sm mt-2 leading-relaxed">
          {t.puskesmasGuideDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Puskesmas Card */}
        <div className="bg-white border border-[#DCC3AA] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#F1E2D1] p-2.5 rounded-xl text-[#810B38] border border-[#DCC3AA]">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#541A1A]">{t.puskesmasCardTitle}</h4>
              <p className="text-xs text-[#810B38] font-semibold">{t.puskesmasCardSub}</p>
            </div>
          </div>

          <p className="text-[#541A1A]/80 text-sm leading-relaxed mb-4">
            {t.puskesmasCardDesc}
          </p>

          <div className="space-y-3">
            <h5 className="text-xs font-extrabold text-[#541A1A]/60 uppercase tracking-wider">{t.puskesmasServicesTitle}</h5>
            <ul className="space-y-2 text-sm text-[#541A1A]">
              {t.puskesmasServices.map((service, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#810B38]"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Posyandu Card */}
        <div className="bg-white border border-[#DCC3AA] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#F1E2D1] p-2.5 rounded-xl text-[#810B38] border border-[#DCC3AA]">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#541A1A]">{t.posyanduCardTitle}</h4>
              <p className="text-xs text-[#810B38] font-semibold">{t.posyanduCardSub}</p>
            </div>
          </div>

          <p className="text-[#541A1A]/80 text-sm leading-relaxed mb-4">
            {t.posyanduCardDesc}
          </p>

          <div className="space-y-3">
            <h5 className="text-xs font-extrabold text-[#541A1A]/60 uppercase tracking-wider">{t.posyanduServicesTitle}</h5>
            <ul className="space-y-2 text-sm text-[#541A1A]">
              {t.posyanduServices.map((service, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#810B38]"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BPJS Info Banner */}
      <div className="bg-[#541A1A] text-[#F1E2D1] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#DCC3AA]">
        <div className="flex items-center gap-3">
          <div className="bg-[#810B38] p-2 rounded-xl">
            <Heart className="h-6 w-6 text-[#F1E2D1] fill-[#F1E2D1]" />
          </div>
          <div>
            <h4 className="font-bold text-base">{t.bpjsTitle}</h4>
            <p className="text-xs text-[#DCC3AA]">{t.bpjsDesc}</p>
          </div>
        </div>
        <div className="bg-[#810B38] text-[#F1E2D1] px-4 py-2 rounded-xl text-xs font-bold border border-[#DCC3AA]">
          {t.bpjsBadge}
        </div>
      </div>
    </div>
  );
};
