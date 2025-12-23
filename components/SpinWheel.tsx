
import React, { useState, useRef } from 'react';
import { SpinResult, User } from '../types';
import { apiService } from '../services/apiService';

interface SpinWheelProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

const SLOTS: SpinResult[] = [
  { label: 'Premium Card', type: 'card' },
  { label: '20% OFF', type: 'discount' },
  { label: '1 More Try', type: 'extra' },
  { label: 'Gold Card', type: 'card' },
  { label: 'Bad Luck', type: 'bad_luck' },
  { label: '10% OFF', type: 'discount' },
  { label: '3 More Chances', type: 'extra' },
  { label: 'Platinum Card', type: 'card' },
];

const COLORS = [
  '#6366f1', '#a5b4fc', '#4f46e5', '#818cf8', 
  '#4338ca', '#c7d2fe', '#3730a3', '#60a5fa'
];

const SpinWheel: React.FC<SpinWheelProps> = ({ user, onUpdateUser }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  const spin = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    const extraDegrees = Math.floor(Math.random() * 360) + 1800; // 5 full circles + random
    const newRotation = rotation + extraDegrees;
    setRotation(newRotation);

    // Calculate result after animation (simulated time)
    setTimeout(async () => {
      const actualDegrees = newRotation % 360;
      const segmentDegrees = 360 / SLOTS.length;
      const winningIndex = Math.floor((360 - actualDegrees) / segmentDegrees) % SLOTS.length;
      const prize = SLOTS[winningIndex];
      
      setResult(prize);
      setIsSpinning(false);

      // Save to backend if it's a card
      if (prize.type === 'card') {
        const newCards = [...(user.cards || []), prize.label];
        await apiService.updateUserProfile(user.id, { cards: newCards });
        onUpdateUser({ cards: newCards });
      }
    }, 4000);
  };

  React.useEffect(() => {
    drawWheel();
  }, []);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;
    const sliceAngle = (2 * Math.PI) / SLOTS.length;

    ctx.clearRect(0, 0, size, size);

    SLOTS.forEach((slot, i) => {
      ctx.beginPath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, i * sliceAngle, (i + 1) * sliceAngle);
      ctx.lineTo(center, center);
      ctx.fill();
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(i * sliceAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = i % 2 === 0 ? 'white' : 'black';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(slot.label, radius - 20, 5);
      ctx.restore();
    });

    // Center pin
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(center, center, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600"></div>
        </div>
        
        <div 
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s cubic-bezier(0.1, 0, 0.1, 1)'
          }}
        >
          <canvas ref={canvasRef} width={400} height={400} className="max-w-full" />
        </div>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className={`mt-10 px-12 py-4 rounded-full text-xl font-bold text-white transition shadow-xl ${
          isSpinning ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 active:scale-95'
        }`}
      >
        {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
      </button>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-2xl border-2 border-indigo-500 text-center animate-bounce">
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">You Won</p>
          <h2 className="text-3xl font-black text-indigo-600">{result.label}!</h2>
          {result.type === 'card' && <p className="text-green-600 mt-2 font-medium">Added to your profile cards!</p>}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
