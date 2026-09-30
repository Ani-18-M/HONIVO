import React, { useState } from 'react';
import { educationalArticles } from '../../data/mockData';
import type { EducationalArticle } from '../../types';
import { Search, Clock, ChevronRight, ArrowLeft } from 'lucide-react';

export const LearnAboutHoney: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<EducationalArticle | null>(null);

  const categories = ['All', 'Benefits', 'Types', 'FAQs'];

  const filteredArticles = educationalArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (activeArticle) {
    return (
      <div className="max-w-xl mx-auto space-y-5 pb-12">
        <button
          onClick={() => setActiveArticle(null)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-amber-200/80">
          <div className="h-56 w-full relative">
            <img src={activeArticle.imageUrl} alt={activeArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">
                {activeArticle.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif mt-1">{activeArticle.title}</h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{activeArticle.readTime}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Verified by HONIVA AgriTech Experts</span>
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-relaxed italic bg-amber-50/60 p-4 rounded-2xl border-l-4 border-amber-500">
              "{activeArticle.summary}"
            </p>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p>{activeArticle.content}</p>
              <p>
                Honey’s anti-bacterial properties stem from hydrogen peroxide produced enzymatically during ripening. Pure raw honey never expires if stored in airtight containers away from humidity.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
          Learn About Honey
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Explore purity tests, health benefits, and apiculture awareness
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-2">
        <Search className="w-5 h-5 text-amber-600 ml-2" />
        <input
          type="text"
          placeholder="Search topics (e.g. adulteration, benefits, types)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-honey scale-105'
                : 'bg-white text-slate-600 hover:bg-amber-100/50 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-200/80 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-36 w-full relative overflow-hidden bg-amber-50">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 font-bold text-[9px] uppercase">
                {art.category}
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors font-serif">
                  {art.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-amber-800">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3 text-amber-600" /> {art.readTime}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
