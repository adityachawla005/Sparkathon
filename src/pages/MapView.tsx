import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Route, CheckCircle, Timer, Zap } from 'lucide-react';

const MapView = () => {
  const containerRef = useRef(null);
  const stepsRef = useRef(null);

  const routeSteps = [
    { step: 1, location: 'Store Entrance', status: 'completed', emoji: '🚪', time: '0:00' },
    { step: 2, location: 'Produce Section', item: 'Organic Bananas', status: 'completed', emoji: '🍌', time: '1:30' },
    { step: 3, location: 'Dairy Section', item: 'Milk & Greek Yogurt', status: 'current', emoji: '🥛', time: '3:45' },
    { step: 4, location: 'Bakery Section', item: 'Sourdough Bread', status: 'upcoming', emoji: '🍞', time: '6:20' },
    { step: 5, location: 'Checkout Counter', status: 'upcoming', emoji: '💳', time: '8:00' },
  ];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'translateY(30px)';
      containerRef.current.style.transition = 'all 0.8s ease-out';
      requestAnimationFrame(() => {
        containerRef.current.style.opacity = '1';
        containerRef.current.style.transform = 'translateY(0)';
      });
    }

    if (stepsRef.current) {
      const steps = stepsRef.current.children;
      Array.from(steps).forEach((step, index) => {
        const element = step as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        element.style.transition = 'all 0.6s ease-out';

        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
        }, 600 + index * 100);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-10 p-6 min-h-screen">
        <div ref={containerRef} className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pt-8">
            <button
              onClick={() => (window.location.href = '/cart')}
              className="bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Smart Route Navigator
              </h1>
              <p className="text-white/60 mt-2">AI-optimized path for maximum efficiency</p>
            </div>
            <div className="w-32" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Static Map Image */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Route className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Live Store Map</h2>
                  <p className="text-sm text-white/50">Real-time navigation system</p>
                </div>
              </div>

              {/* Replace src with your actual image */}
              <div className="rounded-xl overflow-hidden border border-white/10">
                <img
                  src="/mapview.png"
                  alt="Store Navigation Map"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Route Steps */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Smart Route Steps</h2>
                  <p className="text-sm text-white/50">Optimized shopping sequence</p>
                </div>
              </div>

              <div ref={stepsRef} className="space-y-4">
                {routeSteps.map((step) => (
                  <div
                    key={step.step}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                      step.status === 'current'
                        ? 'bg-blue-500/10 border border-blue-400/30 shadow-lg ring ring-blue-300/40'
                        : step.status === 'completed'
                        ? 'bg-green-500/10 border border-green-400/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className="text-3xl">{step.emoji}</div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${
                        step.status === 'current'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                          : step.status === 'completed'
                          ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                          : 'bg-white/5 text-white/50 border border-white/10'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step.step
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${step.status === 'current' ? 'text-blue-300' : 'text-white'}`}>
                        {step.location}
                      </p>
                      {step.item && <p className="text-sm text-white/50 mt-1">{step.item}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-white/60">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="p-6 bg-green-500/10 rounded-xl border border-green-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-green-300">Total Estimated Time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-300">8:00 minutes</span>
                    <span className="text-sm text-green-400/70">vs 29 min traditional</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300">AI-optimized to minimize walking distance by 73%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default MapView;
