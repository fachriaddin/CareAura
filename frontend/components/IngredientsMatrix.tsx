import React, { useState } from 'react';
import { Search, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { LOCAL_INGREDIENTS, TRANSLATIONS } from '../constants';

interface IngredientsMatrixProps {
  fontSizeClass: string;
  language: 'id' | 'en';
}

export const IngredientsMatrix: React.FC<IngredientsMatrixProps> = ({ fontSizeClass, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'PROTEIN' | 'VEGETABLE' | 'CARB'>('ALL');

  const t = TRANSLATIONS[language];
  const ingredients = LOCAL_INGREDIENTS(language);

  const filteredIngredients = ingredients.filter(ing => {
    const matchesSearch = ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ing.alternativeTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || ing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#F1E2D1] border border-[#DCC3AA] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-[#810B38] flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-[#810B38]" />
          {t.matrixTitle}
        </h3>
        <p className="text-[#541A1A] text-sm mt-2 leading-relaxed">
          {t.matrixDesc}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#541A1A]/60" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DCC3AA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#810B38] text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {(['ALL', 'PROTEIN', 'VEGETABLE', 'CARB'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#810B38] text-[#F1E2D1] shadow'
                  : 'bg-white border border-[#DCC3AA] text-[#541A1A] hover:bg-[#F1E2D1]'
              }`}
            >
              {cat === 'ALL' ? t.all : cat === 'PROTEIN' ? t.protein : cat === 'VEGETABLE' ? t.vegetables : t.carbohydrates}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Ingredients */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIngredients.map((ing) => (
          <div key={ing.id} className="bg-white border border-[#DCC3AA] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-extrabold bg-[#F1E2D1] text-[#810B38] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#DCC3AA]">
                    {ing.category === 'PROTEIN' ? t.protein : ing.category === 'VEGETABLE' ? t.vegetables : t.carbohydrates}
                  </span>
                  <h4 className="text-xl font-extrabold text-[#541A1A] mt-2">{ing.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#541A1A]/60 block">{t.estimatedCost}</span>
                  <span className="text-xs font-extrabold text-[#810B38] bg-[#F1E2D1] px-2 py-0.5 rounded border border-[#DCC3AA]">
                    {ing.cost}
                  </span>
                </div>
              </div>

              {/* Alternative Comparison */}
              <div className="bg-[#F1E2D1]/30 rounded-xl p-3.5 border border-[#DCC3AA]/30 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#541A1A]/60 block uppercase">{t.healthyAlternative}</span>
                  <span className="text-sm font-bold text-[#810B38]">{ing.alternativeTo}</span>
                </div>
                <div className="bg-[#810B38] text-[#F1E2D1] p-1.5 rounded-full">
                  <ArrowRightLeft className="h-4 w-4" />
                </div>
              </div>

              <p className="text-[#541A1A]/80 text-sm leading-relaxed mb-4">
                {ing.description}
              </p>

              {/* Benefits List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#541A1A]/60 block uppercase">{t.keyBenefits}</span>
                {ing.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-[#541A1A]">
                    <CheckCircle2 className="h-4 w-4 text-[#810B38] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Nutrient Bar */}
            <div className="mt-6 pt-4 border-t border-[#DCC3AA]/30">
              <span className="text-xs font-bold text-[#541A1A]/60 block uppercase mb-2">{t.mainNutritional}</span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#541A1A]/80 mb-1">
                    <span>Protein</span>
                    <span>{ing.nutrients.protein}/10</span>
                  </div>
                  <div className="w-full bg-[#F1E2D1] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#810B38] h-full rounded-full" style={{ width: `${ing.nutrients.protein * 10}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#541A1A]/80 mb-1">
                    <span>Vitamin</span>
                    <span>{ing.nutrients.vitamins}/10</span>
                  </div>
                  <div className="w-full bg-[#F1E2D1] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#810B38] h-full rounded-full" style={{ width: `${ing.nutrients.vitamins * 10}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#541A1A]/80 mb-1">
                    <span>Serat</span>
                    <span>{ing.nutrients.fiber}/10</span>
                  </div>
                  <div className="w-full bg-[#F1E2D1] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#810B38] h-full rounded-full" style={{ width: `${ing.nutrients.fiber * 10}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
