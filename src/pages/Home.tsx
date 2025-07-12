import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QrCode,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Scan
} from 'lucide-react';
import Scene3D from '@/components/Scene3D';

const Home = () => {
  const navigate = useNavigate();
  const [scanningComplete, setScanningComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanningComplete(true);
    }, 2500); // 2.5 seconds scanning animation

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/action');
  };

  const sceneGeometries = [
    { type: 'sphere' as const, position: [-4, 3, -1], color: '#60A5FA', scale: 0.7 },
    { type: 'sphere' as const, position: [4, -2, -1], color: '#F472B6', scale: 0.5 },
    { type: 'box' as const, position: [-3, -1, 2], color: '#A78BFA', scale: 0.6 },
    { type: 'box' as const, position: [3, 2, -2], color: '#FBBF24', scale: 0.6 },
    { type: 'torus' as const, position: [0, 4, 0], color: '#34D399', scale: 0.8 },
    { type: 'torus' as const, position: [0, -3, -1], color: '#4ADE80', scale: 0.5 },
    { type: 'sphere' as const, position: [2, 1, 3], color: '#FCD34D', scale: 0.9 },
    { type: 'box' as const, position: [-1, -3, 0], color: '#C084FC', scale: 0.4 },
    { type: 'torus' as const, position: [-5, 2, 2], color: '#F87171', scale: 0.6 },
    { type: 'sphere' as const, position: [5, -4, 1], color: '#60A5FA', scale: 0.5 },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <Scene3D geometries={sceneGeometries} enableControls={false} />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        {!scanningComplete ? (
          // 👁 Scanning Simulation Screen
          <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-in">
            <div className="w-28 h-28 rounded-2xl border border-purple-500 flex items-center justify-center bg-gradient-to-br from-purple-700/30 to-purple-500/10 animate-pulse shadow-lg">
              <Scan className="w-14 h-14 text-purple-400 animate-bounce-slow" />
            </div>
            <p className="text-sm text-white/70">
              Scanning for store QR code...
            </p>
          </div>
        ) : (
          // ✅ QR & Continue Screen
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Smart Shopping Assistant
                </h1>
                <Sparkles className="w-6 h-6 text-blue-300 animate-pulse" />
              </div>
              <p className="text-sm text-white/70 max-w-sm mx-auto">
                Your scan is complete. Continue to begin your optimized shopping journey.
              </p>
            </div>

            {/* Mock QR */}
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-lg shadow-lg">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=smart-shopping"
                  alt="Mock QR Code"
                  className="w-36 h-36"
                />
              </div>
            </div>

            {/* Button */}
            <div className="bg-white/5 border border-white/10 hover:border-purple-300 transition-all rounded-xl p-6 shadow-xl backdrop-blur-md text-center space-y-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm text-white/60">
                  You're all set to begin your smart route.
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full py-3 text-sm font-semibold border border-purple-300 text-purple-300 bg-purple-400/10 hover:bg-purple-300/20 rounded-xl flex justify-center items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <QrCode className="w-5 h-5" />
                Continue to Store
              </button>
              <div className="text-xs text-white/40 mt-2 flex items-center gap-2 justify-center">
                <Smartphone className="w-4 h-4" />
                <span>Mobile-optimized experience</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
