"use client";

import React, { useEffect, useRef } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Navigation,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import Scene3D from "@/components/Scene3D";

// Define expected type for geometries
type GeometryType = "sphere" | "box" | "torus";

interface AnimatedGeometryProps {
  type: GeometryType;
  position: [number, number, number];
  color: string;
  scale: number;
}

const Cart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "translateY(30px)";
      containerRef.current.style.transition = "all 0.8s ease-out";

      requestAnimationFrame(() => {
        containerRef.current!.style.opacity = "1";
        containerRef.current!.style.transform = "translateY(0)";
      });
    }

    if (itemsRef.current) {
      const items = itemsRef.current.children;
      Array.from(items).forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.opacity = "0";
        element.style.transform = "translateX(-50px)";
        element.style.transition = "all 0.6s ease-out";

        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateX(0)";
        }, 400 + index * 100);
      });
    }
  }, []);

  const cartItems = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 3.99,
      quantity: 2,
      aisle: "Produce",
      emoji: "🍌",
    },
    {
      id: 2,
      name: "Whole Milk",
      price: 4.29,
      quantity: 1,
      aisle: "Dairy",
      emoji: "🥛",
    },
    {
      id: 3,
      name: "Sourdough Bread",
      price: 5.99,
      quantity: 1,
      aisle: "Bakery",
      emoji: "🍞",
    },
    {
      id: 4,
      name: "Greek Yogurt",
      price: 6.49,
      quantity: 3,
      aisle: "Dairy",
      emoji: "🥛",
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleViewRoute = () => {
    window.location.href = "/map";
  };

  const handleBackToShopping = () => {
    window.location.href = "/action";
  };

  const sceneGeometries: AnimatedGeometryProps[] = [
    { type: "sphere", position: [-4, 3, -1], color: "#60A5FA", scale: 0.7 },
    { type: "sphere", position: [4, -2, -1], color: "#F472B6", scale: 0.5 },
    { type: "box", position: [-3, -1, 2], color: "#A78BFA", scale: 0.6 },
    { type: "box", position: [3, 2, -2], color: "#FBBF24", scale: 0.6 },
    { type: "torus", position: [0, 4, 0], color: "#34D399", scale: 0.8 },
    { type: "torus", position: [0, -3, -1], color: "#4ADE80", scale: 0.5 },
    { type: "sphere", position: [2, 1, 3], color: "#FCD34D", scale: 0.9 },
    { type: "box", position: [-1, -3, 0], color: "#C084FC", scale: 0.4 },
    { type: "torus", position: [-5, 2, 2], color: "#F87171", scale: 0.6 },
    { type: "sphere", position: [5, -4, 1], color: "#60A5FA", scale: 0.5 },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <Scene3D geometries={sceneGeometries} enableControls={false} />
      </div>

      <div className="relative z-10 p-6 min-h-screen">
        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 pt-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
              <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <ShoppingCart className="w-6 h-6 text-orange-400" />
              </div>
              Your Cart
            </h1>
            <button
              onClick={handleViewRoute}
              className="bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              View Route
            </button>
          </div>

          <div ref={itemsRef} className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{item.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg">
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/50">
                        Aisle: {item.aisle}
                      </p>
                      <p className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-xl min-w-[3rem] text-center text-white">
                      {item.quantity}
                    </span>
                    <button className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-center text-3xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold mb-4">
              Total: ${total.toFixed(2)}
            </h2>
            <button
              onClick={handleViewRoute}
              className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/10 font-semibold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <MapPin className="w-5 h-5" />
              Get Optimized Store Route
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleBackToShopping}
              className="text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shopping Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
