import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface NameEntryProps {
  onNameSubmit: (name: string) => void;
}

export const NameEntry: React.FC<NameEntryProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onNameSubmit(name.trim());
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Battle</h1>
          <p className="text-gray-600">Enter your nickname to join the battle!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                Choose your battle name
              </label>
              <input
                type="text"
                id="nickname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your nickname"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                maxLength={20}
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 mt-1">
                {name.length}/20 characters (minimum 2)
              </p>
            </div>

            <button
              type="submit"
              disabled={name.trim().length < 2 || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Start Battle
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};