import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Clock, Route, CheckCircle, Timer, Zap,
  Lightbulb, Star, TrendingUp, MapPin, AlertCircle, Users
} from 'lucide-react';

const MapView = () => {
  const containerRef = useRef(null);
  const stepsRef = useRef(null);
  const navigate = useNavigate();

  const handleCollaborateClick = () => {
    navigate('/collaborate');
  };

  const routeSteps = [
    { step: 1, location: 'Store Entrance', status: 'completed', emoji: '🚪', time: '0:00' },
    { step: 2, location: 'Dairy Section', item: 'Milk & Greek Yogurt', status: 'completed', emoji: '🥛', time: '1:30' },
    { step: 3, location: 'Produce Section', item: 'Organic Bananas', status: 'completed', emoji: '🍌', time: '3:45' },
    { step: 4, location: 'Bakery Section', item: 'Sourdough Bread', status: 'current', emoji: '🍞', time: '6:20' },
    { step: 5, location: 'Checkout Counter', status: 'upcoming', emoji: '💳', time: '8:00' }
  ];

  const collaborators = [
    { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' }
  ];

  const suggestions = [
    { type: 'smart-tip', icon: Lightbulb, title: 'Smart Shopping Tip', description: 'Bakery section is less crowded at this time - perfect opportunity to grab fresh items!', priority: 'high', color: 'yellow' },
    { type: 'recommendation', icon: Star, title: 'Based on Your History', description: "You usually buy eggs with milk. They're on sale today - add to cart?", priority: 'medium', color: 'blue', action: 'Add Eggs' },
    { type: 'optimization', icon: TrendingUp, title: 'Route Optimization', description: "Skip aisle 7 today - it's being restocked. Your route is already optimized around it.", priority: 'low', color: 'green' },
    { type: 'alert', icon: AlertCircle, title: 'Store Alert', description: 'Express checkout (10 items or less) has no wait time right now.', priority: 'high', color: 'purple' }
  ];

  const personalizedTips = [
    { icon: '🕒', tip: 'Best time to visit: Weekdays 2–4 PM for shortest queues' },
    { icon: '💰', tip: 'You could save $3.50 by choosing store brand alternatives' },
    { icon: '🚶', tip: 'Your average shopping speed: 15% faster than typical customers' },
    { icon: '📱', tip: 'Use mobile payment for 30% faster checkout experience' }
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
        const element = step;
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

  const getColorClasses = (color, priority) => {
    const colors = {
      yellow: priority === 'high' ? 'bg-yellow-500/20 border-yellow-400/40 text-yellow-300' : 'bg-yellow-500/10 border-yellow-400/20 text-yellow-400',
      blue: priority === 'high' ? 'bg-blue-500/20 border-blue-400/40 text-blue-300' : 'bg-blue-500/10 border-blue-400/20 text-blue-400',
      green: priority === 'high' ? 'bg-green-500/20 border-green-400/40 text-green-300' : 'bg-green-500/10 border-green-400/20 text-green-400',
      purple: priority === 'high' ? 'bg-purple-500/20 border-purple-400/40 text-purple-300' : 'bg-purple-500/10 border-purple-400/20 text-purple-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-10 p-6">
        <div ref={containerRef} className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pt-8">
            <button onClick={() => navigate('/cart')} className="bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Smart Route Navigator</h1>
              <p className="text-white/60 mt-2">AI-optimized path for maximum efficiency</p>
            </div>
            <div className="w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start -mx-4 px-4">
            <div className="h-[660px] flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Route className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Live Store Map</h2>
                  <p className="text-sm text-white/50">Real-time navigation system</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[700px] w-full flex items-center justify-center bg-white/5">
               <img
    src="/mapview.png"
    alt="Store Navigation Map"
    className="h-full object-contain"
  />
</div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/70">Current Location</span>
                  </div>
                  <p className="font-semibold text-blue-300">Bakery Section</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-white/70">Time Saved</span>
                  </div>
                  <p className="font-semibold text-green-300">21 minutes</p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-purple-500/10 rounded-2xl border border-purple-400/20 shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Collaborate
                  </h3>
                  <button onClick={handleCollaborateClick} className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white">
                    + Collaborate
                  </button>
                </div>
                <div className="space-y-3">
                  {collaborators.map((person, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img src={person.avatar} className="w-8 h-8 rounded-full border border-white/20" alt={person.name} />
                      <span className="text-sm text-white/80">{person.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-[660px] flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Smart Route Steps</h2>
              </div>
              <div ref={stepsRef} className="space-y-4">
                {routeSteps.map((step) => (
                  <div key={step.step} className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${step.status === 'current' ? 'bg-blue-500/10 border border-blue-400/30 shadow-lg ring ring-blue-300/40' : step.status === 'completed' ? 'bg-green-500/10 border border-green-400/30' : 'bg-white/5 border border-white/10'}`}>
                    <div className="text-3xl">{step.emoji}</div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${step.status === 'current' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' : step.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                      {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : step.step}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${step.status === 'current' ? 'text-blue-300' : 'text-white'}`}>{step.location}</p>
                      {step.item && <p className="text-sm text-white/50 mt-1">{step.item}</p>}
                    </div>
                    <p className="text-sm font-mono text-white/60">{step.time}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300 font-semibold text-sm">Did you know?</span>
                </div>
                <p className="text-sm text-white/70">You’ve saved over <span className="text-green-300 font-medium">1 hour</span> of shopping time this month using Smart Routes!</p>
              </div>
            </div>
            <div className="h-[660px] flex flex-col justify-between space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Smart Suggestions</h2>
                    <p className="text-sm text-white/50">AI-powered recommendations</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${getColorClasses(suggestion.color, suggestion.priority)}`}>
                      <div className="flex items-start gap-3">
                        <suggestion.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{suggestion.title}</h3>
                          <p className="text-sm opacity-80">{suggestion.description}</p>
                          {suggestion.action && (
                            <button className="mt-3 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">{suggestion.action}</button>
                          )}
                        </div>
                        {suggestion.priority === 'high' && <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <Star className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Personal Insights</h2>
                    <p className="text-sm text-white/50">Tailored to your shopping habits</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {personalizedTips.map((tip, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <span className="text-xl">{tip.icon}</span>
                      <p className="text-sm text-white/80">{tip.tip}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Shopping Efficiency Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-green-400">8.5/10</span>
                    </div>
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
