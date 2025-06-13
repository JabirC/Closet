//src/components/Calendar.js

'use client';
import { useState } from 'react';

export default function Calendar({ user, updateUser }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState('');

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDate = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const planOutfit = () => {
    if (!selectedDate || !selectedOutfit) return;
    
    const updatedUser = {
      ...user,
      calendar: {
        ...user.calendar,
        [selectedDate]: selectedOutfit
      }
    };
    
    updateUser(updatedUser);
    setSelectedDate(null);
    setSelectedOutfit('');
  };

  const getOutfitForDate = (date) => {
    const outfitId = user.calendar[date];
    return user.outfits.find(outfit => outfit.id.toString() === outfitId);
  };

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Outfit Calendar</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium mb-6 text-center">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}
          
          {days.map(day => {
            const dateStr = formatDate(day);
            const plannedOutfit = getOutfitForDate(dateStr);
            const isToday = day === today.getDate() && currentMonth === today.getMonth();
            const isPast = new Date(currentYear, currentMonth, day) < today;
            
            return (
              <div
                key={day}
                onClick={() => !isPast && setSelectedDate(dateStr)}
                className={`aspect-square border rounded-lg p-1 cursor-pointer transition-colors ${
                  isToday ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                } ${isPast ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} ${
                  selectedDate === dateStr ? 'bg-gray-100' : ''
                }`}
              >
                <div className="text-sm font-medium">{day}</div>
                {plannedOutfit && (
                  <div className="mt-1">
                    <div className="text-xs truncate text-gray-600">
                      {plannedOutfit.name}
                    </div>
                    <div className="flex -space-x-1 mt-1">
                      {plannedOutfit.items.slice(0, 3).map(item => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt=""
                          className="w-4 h-4 rounded-full border border-white object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {selectedDate && (
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">
            Plan outfit for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          
          <select
            value={selectedOutfit}
            onChange={(e) => setSelectedOutfit(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          >
            <option value="">Select an outfit</option>
            {user.outfits.map(outfit => (
              <option key={outfit.id} value={outfit.id}>
                {outfit.name}
              </option>
            ))}
          </select>
          
          <div className="flex space-x-4">
            <button
              onClick={planOutfit}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Plan Outfit
            </button>
            <button
              onClick={() => setSelectedDate(null)}
              className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {user.outfits.length === 0 && (
        <div className="mt-6 text-center py-8 text-gray-600">
          <p>Create some outfits first to start planning your calendar!</p>
        </div>
      )}
    </div>
  );
}