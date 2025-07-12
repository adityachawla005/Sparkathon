// ActionSelect.tsx (Updated with 3D Scene Background and Shopping-themed Models)
import React, { useRef, useState } from 'react';
import {
  ShoppingCart,
  RotateCcw,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MousePointer2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Scene3D from '@/components/Scene3D';

const ActionSelect = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardInteraction = (cardType, action) => {
    setHoveredCard(action === 'enter' ? cardType : null);
  };

  const sceneGeometries = [
    { type: 'sphere' as const, position: [-4, 3, -1] as [number, number, number], color: '#60A5FA', scale: 0.7 },
    { type: 'sphere' as const, position: [4, -2, -1] as [number, number, number], color: '#F472B6', scale: 0.5 },
    { type: 'box' as const, position: [-3, -1, 2] as [number, number, number], color: '#A78BFA', scale: 0.6 },
    { type: 'box' as const, position: [3, 2, -2] as [number, number, number], color: '#FBBF24', scale: 0.6 },
    { type: 'torus' as const, position: [0, 4, 0] as [number, number, number], color: '#34D399', scale: 0.8 },
    { type: 'torus' as const, position: [0, -3, -1] as [number, number, number], color: '#4ADE80', scale: 0.5 },
    { type: 'sphere' as const, position: [2, 1, 3] as [number, number, number], color: '#FCD34D', scale: 0.9 },
    { type: 'box' as const, position: [-1, -3, 0] as [number, number, number], color: '#C084FC', scale: 0.4 },
    { type: 'torus' as const, position: [-5, 2, 2] as [number, number, number], color: '#F87171', scale: 0.6 },
    { type: 'sphere' as const, position: [5, -4, 1] as [number, number, number], color: '#60A5FA', scale: 0.5 },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-20">
        <Scene3D geometries={sceneGeometries} enableControls={false} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div ref={containerRef} className="max-w-5xl w-full space-y-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-yellow-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to SmartCart
              </h1>
              <Sparkles className="w-6 h-6 text-sky-300 animate-pulse" />
            </div>
            <p className="text-base text-white/70 max-w-xl mx-auto">
              Choose your shopping journey. Start fresh or relive a past trip—your store, your way.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/50">
              <MousePointer2 className="w-4 h-4" />
              <span>Hover cards to explore modes</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`group relative bg-white/5 border border-white/10 hover:border-emerald-300 transition-all rounded-3xl p-8 shadow-xl cursor-pointer backdrop-blur-md ${
                hoveredCard === 'new' ? 'scale-[1.02] ring-2 ring-emerald-400/40' : ''
              }`}
              onMouseEnter={() => handleCardInteraction('new', 'enter')}
              onMouseLeave={() => handleCardInteraction('new', 'leave')}
              onClick={() => navigate('/cart')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="text-xl font-semibold">Start New Cart</div>
              </div>
              <p className="text-sm text-white/60 mb-6">
                Begin your next visit with personalized suggestions and smart route planning.
              </p>
              <button className="w-full py-3 text-sm font-semibold border border-emerald-300 text-emerald-300 bg-emerald-400/10 hover:bg-emerald-300/20 rounded-xl flex justify-center items-center gap-2 transition-all">
                Start Shopping <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div
              className={`group relative bg-white/5 border border-white/10 hover:border-indigo-300 transition-all rounded-3xl p-8 shadow-xl cursor-pointer backdrop-blur-md ${
                hoveredCard === 'rebuy' ? 'scale-[1.02] ring-2 ring-indigo-400/40' : ''
              }`}
              onMouseEnter={() => handleCardInteraction('rebuy', 'enter')}
              onMouseLeave={() => handleCardInteraction('rebuy', 'leave')}
              onClick={() => navigate('/cart?rebuy=true')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-indigo-300" />
                </div>
                <div className="text-xl font-semibold">Rebuy This Day</div>
              </div>
              <p className="text-sm text-white/60 mb-4">
                Instantly refill your basket with updated pricing and availability.
              </p>
              <div className="text-xs text-white/40 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Last shopped: Jan 28, 2024
              </div>
              <button className="w-full py-3 text-sm font-semibold border border-indigo-300 text-indigo-300 bg-indigo-400/10 hover:bg-indigo-300/20 rounded-xl flex justify-center items-center gap-2 transition-all">
                Rebuy Mode <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-center pt-8">
            <button
              onClick={() => navigate('/')}
              className="text-white/50 hover:text-white transition duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionSelect;
