import React, { useState } from 'react';
import { LOCAL_INGREDIENTS, TRANSLATIONS } from '../constants';
import { Ingredient } from '../types';
import { Check, Sparkles, Info, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MealBuilderProps {
  fontSizeClass: string;
  language: 'id' | 'en';
}

export const MealBuilder: React.FC<MealBuilderProps> = ({ fontSizeClass, language }) => {
  const [selectedCarb, setSelectedCarb] = useState<Ingredient | null>(null);
  const [selectedProtein, setSelectedProtein] = useState<Ingredient | null>(null);
  const [selectedVeg, setSelectedVeg] = useState<Ingredient | null>(null);

  const t = TRANSLATIONS[language];
  const ingredients = LOCAL_INGREDIENTS(language);

  const carbs = ingredients.filter(i => i.category === 'CARB');
  const proteins = ingredients.filter(i => i.category === 'PROTEIN');
  const vegetables = ingredients.filter(i => i.category === 'VEGETABLE');

  const handleReset = () => {
    setSelectedCarb(null);
    setSelectedProtein(null);
    setSelectedVeg(null);
  };

  // Calculate total nutrients
  const totalProtein = (selectedCarb?.nutrients.protein || 0) + (selectedProtein?.nutrients.protein || 0) + (selectedVeg?.nutrients.protein || 0);
  const totalVitamins = (selectedCarb?.nutrients.vitamins || 0) + (selectedProtein?.nutrients.vitamins || 0) + (selectedVeg?.nutrients.vitamins || 0);
  const totalFiber = (selectedCarb?.nutrients.fiber || 0) + (selectedProtein?.nutrients.fiber || 0) + (selectedVeg?.nutrients.fiber || 0);

  const chartData = [
    { name: 'Protein', Nilai: totalProtein, fill: '#810B38' },
    { name: 'Vitamin', Nilai: totalVitamins, fill: '#DCC3AA' },
    { name: 'Serat', Nilai: totalFiber, fill: '#541A1A' }
  ];

  const isPlateComplete = selectedCarb && selectedProtein && selectedVeg;

  return (
    <div className="space-y-8">
      <div className="bg-[#F1E2D1] border border-[#DCC3AA] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-[#810B38] flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#810B38]" />
          {t.plateBuilderTitle}
        </h3>
        <p className="text-[#541A1A] text-sm mt-2 leading-relaxed">
          {t.plateBuilderDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selection Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Karbohidrat */}
          <div>
            <h4 className="text-sm font-extrabold text-[#541A1A]/60 uppercase tracking-wider mb-3">{t.chooseCarb}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {carbs.map((carb) => (
                <button
                  key={carb.id}
                  onClick={() => setSelectedCarb(carb)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedCarb?.id === carb.id
                      ? 'border-[#810B38] bg-[#F1E2D1]/50 ring-2 ring-[#DCC3AA]'
                      : 'border-[#DCC3AA] bg-white hover:border-[#810B38]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[#541A1A] text-sm">{carb.name}</span>
                    {selectedCarb?.id === carb.id && <Check className="h-4 w-4 text-[#810B38]" />}
                  </div>
                  <span className="text-[10px] text-[#541A1A]/60 block mt-1">Ganti: {carb.alternativeTo}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Protein */}
          <div>
            <h4 className="text-sm font-extrabold text-[#541A1A]/60 uppercase tracking-wider mb-3">{t.chooseProtein}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {proteins.map((protein) => (
                <button
                  key={protein.id}
                  onClick={() => setSelectedProtein(protein)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedProtein?.id === protein.id
                      ? 'border-[#810B38] bg-[#F1E2D1]/50 ring-2 ring-[#DCC3AA]'
                      : 'border-[#DCC3AA] bg-white hover:border-[#810B38]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[#541A1A] text-sm">{protein.name}</span>
                    {selectedProtein?.id === protein.id && <Check className="h-4 w-4 text-[#810B38]" />}
                  </div>
                  <span className="text-[10px] text-[#541A1A]/60 block mt-1">Ganti: {protein.alternativeTo}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sayuran */}
          <div>
            <h4 className="text-sm font-extrabold text-[#541A1A]/60 uppercase tracking-wider mb-3">{t.chooseVeg}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {vegetables.map((veg) => (
                <button
                  key={veg.id}
                  onClick={() => setSelectedVeg(veg)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedVeg?.id === veg.id
                      ? 'border-[#810B38] bg-[#F1E2D1]/50 ring-2 ring-[#DCC3AA]'
                      : 'border-[#DCC3AA] bg-white hover:border-[#810B38]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[#541A1A] text-sm">{veg.name}</span>
                    {selectedVeg?.id === veg.id && <Check className="h-4 w-4 text-[#810B38]" />}
                  </div>
                  <span className="text-[10px] text-[#541A1A]/60 block mt-1">Ganti: {veg.alternativeTo}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Plate & Nutrition Feedback */}
        <div className="bg-white border border-[#DCC3AA] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-[#541A1A]">{t.yourHealthyPlate}</h4>
              <button
                onClick={handleReset}
                className="text-xs text-[#810B38] hover:text-[#541A1A] flex items-center gap-1 font-bold"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {t.resetPlate}
              </button>
            </div>

            {/* Visual Plate Representation */}
            <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-[#DCC3AA] shadow-inner flex items-center justify-center overflow-hidden mb-6">
              {/* Carb Section */}
              <div className={`absolute top-0 left-0 w-1/2 h-full border-r border-[#DCC3AA]/50 flex flex-col items-center justify-center p-2 text-center transition-all ${
                selectedCarb ? 'bg-[#F1E2D1] text-[#810B38]' : 'bg-slate-50 text-slate-400'
              }`}>
                <span className="text-[10px] font-extrabold uppercase">Karbohidrat</span>
                <span className="text-xs font-bold mt-1">{selectedCarb ? selectedCarb.name : t.notSelected}</span>
              </div>

              {/* Protein Section */}
              <div className={`absolute top-0 right-0 w-1/2 h-1/2 border-b border-[#DCC3AA]/50 flex flex-col items-center justify-center p-2 text-center transition-all ${
                selectedProtein ? 'bg-[#F1E2D1] text-[#810B38]' : 'bg-slate-50 text-slate-400'
              }`}>
                <span className="text-[10px] font-extrabold uppercase">Protein</span>
                <span className="text-xs font-bold mt-1">{selectedProtein ? selectedProtein.name : t.notSelected}</span>
              </div>

              {/* Vegetable Section */}
              <div className={`absolute bottom-0 right-0 w-1/2 h-1/2 flex flex-col items-center justify-center p-2 text-center transition-all ${
                selectedVeg ? 'bg-[#F1E2D1] text-[#810B38]' : 'bg-slate-50 text-slate-400'
              }`}>
                <span className="text-[10px] font-extrabold uppercase">Sayuran</span>
                <span className="text-xs font-bold mt-1">{selectedVeg ? selectedVeg.name : t.notSelected}</span>
              </div>
            </div>

            {/* Nutrition Chart */}
            {isPlateComplete ? (
              <div className="space-y-4">
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 'bold', fill: '#541A1A' }} />
                      <YAxis domain={[0, 30]} tick={{ fontSize: 10, fill: '#541A1A' }} />
                      <Tooltip />
                      <Bar dataKey="Nilai" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#F1E2D1] border border-[#DCC3AA] rounded-xl p-4">
                  <h5 className="text-xs font-extrabold text-[#810B38] uppercase mb-1 flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    {t.nutritionAnalysis}
                  </h5>
                  <p 
                    className="text-xs text-[#541A1A] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t.nutritionAnalysisDesc(selectedCarb.name, selectedProtein.name, selectedVeg.name) }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#541A1A]/60">
                <p className="text-sm">{t.plateIncomplete}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
