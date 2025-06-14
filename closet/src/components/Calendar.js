//src/components/Calendar.js

'use client';
import { useState } from 'react';

export default function Calendar({ user, updateUser }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [draggedOutfit, setDraggedOutfit] = useState(null);

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

  const getOutfitForDate = (date) => {
    const outfitId = user.calendar[date];
    return user.outfits.find(outfit => outfit.id.toString() === outfitId);
  };

  const handleDragStart = (e, outfit) => {
    setDraggedOutfit(outfit);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, date) => {
    e.preventDefault();
    if (!draggedOutfit) return;
    
    const updatedUser = {
      ...user,
      calendar: {
        ...user.calendar,
        [date]: draggedOutfit.id.toString()
      }
    };
    
    updateUser(updatedUser);
    setDraggedOutfit(null);
  };

  const removeOutfitFromDate = (date) => {
    const { [date]: removed, ...restCalendar } = user.calendar;
    const updatedUser = {
      ...user,
      calendar: restCalendar
    };
    updateUser(updatedUser);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)]">
      {/* Calendar */}
      <div className="flex-1 p-6 flex flex-col">
        <h1 className="text-2xl font-light mb-6">Outfit Calendar</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col flex-1">
          <h2 className="text-lg font-medium mb-4 text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-600 py-2 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 flex-1 content-start">
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
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, dateStr)}
                  className={`aspect-square border rounded-lg p-1 transition-all duration-200 ${
                    isToday ? 'border-black bg-gray-50' : 'border-gray-200'
                  } ${isPast ? 'opacity-50' : 'hover:bg-gray-50'} ${
                    draggedOutfit && !isPast ? 'hover:border-blue-400 hover:bg-blue-50' : ''
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{day}</div>
                  {plannedOutfit && (
                    <div className="relative group">
                      <div className="grid grid-cols-2 gap-0.5">
                        {plannedOutfit.items.slice(0, 4).map((item, index) => (
                          <img
                            key={item.id}
                            src={item.imageUrl || item.image}
                            alt=""
                            className="w-full h-3 rounded-sm object-cover"
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => removeOutfitFromDate(dateStr)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                        style={{ fontSize: '8px' }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Outfit Sidebar */}
      <div className="w-80 bg-gray-50 p-6 border-l">
        <h2 className="text-lg font-medium mb-4">Your Outfits</h2>
        
        <div className="space-y-3 overflow-y-auto h-full">
          {user.outfits.map(outfit => (
            <div
              key={outfit.id}
              draggable
              onDragStart={(e) => handleDragStart(e, outfit)}
              className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-move"
            >
              <h3 className="font-medium text-sm mb-2 truncate">{outfit.name}</h3>
              <div className="grid grid-cols-4 gap-1">
                {outfit.items.slice(0, 4).map(item => (
                  <img
                    key={item.id}
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover rounded"
                  />
                ))}
                {outfit.items.length > 4 && (
                  <div className="bg-gray-100 rounded aspect-square flex items-center justify-center text-xs text-gray-600">
                    +{outfit.items.length - 4}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {user.outfits.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Create some outfits first to start planning!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}