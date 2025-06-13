//src/components/Calendar.js

'use client';
import { useState } from 'react';

export default function Calendar({ outfits }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [plannedOutfits, setPlannedOutfits] = useState({});

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const formatDateKey = (year, month, day) => {
    return `${year}-${month + 1}-${day}`;
  };

  const assignOutfitToDay = (day, outfit) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    setPlannedOutfits(prev => ({
      ...prev,
      [dateKey]: outfit
    }));
  };

  const getOutfitForDay = (day) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    return plannedOutfits[dateKey];
  };

  return (
    <div className="h-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 h-full">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-24 border border-gray-200 rounded p-1 ${
              day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
            }`}
          >
            {day && (
              <>
                <div className="text-sm text-gray-600 mb-1">{day}</div>
                {getOutfitForDay(day) ? (
                  <div className="text-xs bg-black text-white px-2 py-1 rounded truncate">
                    {getOutfitForDay(day).name}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400">
                    {outfits.length > 0 && (
                      <select
                        onChange={(e) => {
                          const outfit = outfits.find(o => o.id === parseInt(e.target.value));
                          if (outfit) assignOutfitToDay(day, outfit);
                        }}
                        className="text-xs border-none bg-transparent"
                        defaultValue=""
                      >
                        <option value="">Plan outfit</option>
                        {outfits.map(outfit => (
                          <option key={outfit.id} value={outfit.id}>
                            {outfit.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      {outfits.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-3xl mb-2">📅</div>
            <p>Create some outfits first to plan your calendar!</p>
          </div>
        </div>
      )}
    </div>
  );
}