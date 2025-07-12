import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QrCode, ShoppingCart, MapPin, Zap, Clock,
  ArrowRight, Star, Users, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Scene3D from '@/components/Scene3D';
import { gsap } from 'gsap';

const AnimatedTick = () => (
  <svg viewBox="0 0 52 52" className="w-16 h-16">
    <circle
      cx="26"
      cy="26"
      r="25"
      className="stroke-green-400 fill-transparent stroke-[4] animate-draw-circle"
    />
    <path
      d="M14 27l8 8 16-16"
      className="stroke-green-400 fill-transparent stroke-[4] animate-draw-check"
    />
  </svg>
);

const Index = () => {
  const navigate = useNavigate();
  const [currentPhoneStep, setCurrentPhoneStep] = useState(0);
  const heroRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out'
    }).from(phoneRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.5');
  }, []);

  const handleScanStart = () => {
    navigate('/home');
  };

  const phoneSteps = [
    {
      title: "Scan QR Code",
      description: "Instant entry with a simple scan",
      screen: "bg-black flex items-center justify-center",
      content: (
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-inner">
            <QrCode className="w-10 h-10 text-white animate-pulse" />
          </div>
          <p className="text-white text-sm mt-3">Ready to Shop</p>
        </div>
      )
    },
    {
      title: "Smart Selection",
      description: "New cart or intelligent rebuy",
      screen: "bg-black p-3",
      content: (
        <div className="grid grid-cols-2 gap-3 text-white">
          <div className="glass-effect rounded-2xl p-4 text-center shadow-lg">
            <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-orange-400" />
            <p className="text-xs font-semibold">New Cart</p>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center shadow-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <p className="text-xs font-semibold">Rebuy Jan 28</p>
          </div>
        </div>
      )
    },
    {
      title: "AI Cart",
      description: "Smart recommendations",
      screen: "bg-black p-4",
      content: (
        <div className="space-y-3">
          {["🥛 Milk - $3.99", "🍞 Bread - $2.49", "🧀 Cheese - $4.99"].map((item, idx) => (
            <div key={idx} className="glass-effect rounded-xl px-4 py-2 text-sm text-white font-medium shadow-md">
              {item}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Smart Route",
      description: "Zero backtracking navigation",
      screen: "bg-black p-4 flex items-center justify-center",
      content: (
        <div className="text-white text-center relative flex flex-col items-center justify-center">
          <div className="bg-purple-600 p-3 rounded-full inline-block animate-bounce">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs mt-3 text-purple-300 font-medium">Route optimized!</p>
          <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-12 left-12 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-200"></div>
          <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-500"></div>
        </div>
      )
    },
    {
      title: "Purchase Complete",
      description: "Your payment was successful",
      screen: "bg-black flex items-center justify-center",
      content: (
        <div className="flex flex-col items-center">
          <div className="rounded-full shadow-lg">
            <AnimatedTick />
          </div>
          <p className="text-green-400 text-sm mt-3 font-semibold">Purchase Complete!</p>
        </div>
      )
    }
  ];

  const sceneGeometries = [
    { type: 'sphere', position: [-2, 1, 0], color: '#60A5FA', scale: 0.8 },
    { type: 'box', position: [2, -1, 1], color: '#A78BFA', scale: 0.6 },
    { type: 'torus', position: [0, 2, -1], color: '#34D399', scale: 0.7 }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Scene3D geometries={sceneGeometries} enableControls={false} />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-16 pb-8">
        <div ref={heroRef} className="text-center max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-effect text-slate-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4 text-orange-400" />
            The Future of Shopping
          </div>

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
            Shop
            <span className="block">Intelligently</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the perfect fusion of AI intelligence and in-store efficiency.
            <span className="text-white"> No more wandering</span>,
            <span className="text-white"> no more waiting</span>.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16">
            <div ref={phoneRef} className="relative">
              <div className="relative w-64 h-[520px] bg-black rounded-[2.5rem] p-3 shadow-2xl border border-white/10">
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black">
                  <div className={`absolute inset-0 transition-all duration-700 ${phoneSteps[currentPhoneStep].screen}`}>
                    <div className="flex flex-col items-center justify-center h-full p-4">
                      {phoneSteps[currentPhoneStep].content}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-slate-700 rounded-full"></div>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {phoneSteps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentPhoneStep === index ? 'bg-white' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentPhoneStep(index)}
                    aria-label={`Step ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="text-left space-y-6 max-w-md">
              <div className="space-y-3">
                <h3 className="text-3xl font-bold">{phoneSteps[currentPhoneStep].title}</h3>
                <p className="text-lg text-white/70">{phoneSteps[currentPhoneStep].description}</p>
              </div>

              <Button
                onClick={handleScanStart}
                size="lg"
                className="glass-effect border border-white/20 hover:bg-white/10 text-white px-6 py-4 text-base rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <QrCode className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="glass-effect p-6 rounded-xl text-center">
              <Star className="mx-auto mb-2 text-yellow-400" />
              <h4 className="text-xl font-bold">4.9/5</h4>
              <p className="text-sm text-white/60">Average User Rating</p>
            </div>
            <div className="glass-effect p-6 rounded-xl text-center">
              <Users className="mx-auto mb-2 text-blue-400" />
              <h4 className="text-xl font-bold">12K+</h4>
              <p className="text-sm text-white/60">Shoppers Assisted</p>
            </div>
            <div className="glass-effect p-6 rounded-xl text-center">
              <TrendingUp className="mx-auto mb-2 text-green-400" />
              <h4 className="text-xl font-bold">98%</h4>
              <p className="text-sm text-white/60">Path Optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
