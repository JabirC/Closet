// src/components/Calendar.js
'use client';
import { useState, useEffect } from 'react';

export default function Calendar({ user, updateUser }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [draggedOutfit, setDraggedOutfit] = useState(null);
  const [calendar, setCalendar] = useState({});
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCalendar();
  }, []);

  const fetchCalendar = async () => {
    try {
      const response = await fetch('/api/calendar');
      if (response.ok) {
        const data = await response.json();
        setCalendar(data.calendar || {});
      }
    } catch (error) {
      console.error('Error fetching calendar:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getOutfitForDate = (date) => {
    const entry = calendar[date];
    return entry?.outfit;
  };

  const handleDragStart = (e, outfit) => {
    setDraggedOutfit(outfit);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, date) => {
    e.preventDefault();
    if (!draggedOutfit) return;
    
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: date,
          outfitId: draggedOutfit.id
        })
      });

      if (response.ok) {
        const { calendarEntry } = await response.json();
        setCalendar(prev => ({
          ...prev,
          [date]: {
            outfitId: calendarEntry.outfitId,
            outfit: calendarEntry.outfit
          }
        }));
      }
    } catch (error) {
      console.error('Error updating calendar:', error);
    }
    
    setDraggedOutfit(null);
  };

  const removeOutfitFromDate = async (date) => {
    try {
      const response = await fetch(`/api/calendar?date=${date}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const { [date]: removed, ...restCalendar } = calendar;
        setCalendar(restCalendar);
      }
    } catch (error) {
      console.error('Error removing outfit from calendar:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600 font-light">Plan your outfits for the week</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-8 border border-gray-100">
            <h2 className="text-2xl font-light mb-8 text-center text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            
            <div className="grid grid-cols-7 gap-4 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-500 py-3">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-4">
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
                    className={`aspect-square border-2 border-dashed rounded-2xl p-3 transition-all duration-200 ${
                      isToday ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                    } ${isPast ? 'opacity-40' : 'hover:border-gray-400'} ${
                      draggedOutfit && !isPast ? 'hover:border-gray-900 hover:bg-gray-50' : ''
                    }`}
                  >
                    <div className="text-sm font-medium mb-2 text-gray-900">{day}</div>
                    {plannedOutfit && (
                      <div className="relative group">
                        <div className="grid grid-cols-2 gap-1">
                          {plannedOutfit.items.slice(0, 4).map((item, index) => (
                            <img
                              key={item.clothingItem.id}
                              src={item.clothingItem.imageUrl}
                              alt=""
                              className="w-full h-6 rounded object-cover"
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => removeOutfitFromDate(dateStr)}
                          className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
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
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <h3 className="text-lg font-medium mb-6 text-gray-900">Your Outfits</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {user.outfits.map(outfit => (
                <div
                  key={outfit.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, outfit)}
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-move"
                >
                  <h4 className="font-medium text-sm mb-3 truncate text-gray-900">{outfit.name}</h4>
                  <div className="grid grid-cols-3 gap-1">
                    {outfit.items.slice(0, 3).map(item => (
                      <img
                        key={item.id}
                        src={item.imageUrl || item.image}
                        alt={item.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    ))}
                    {outfit.items.length > 3 && (
                      <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center text-xs text-gray-600 font-medium">
                        +{outfit.items.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {user.outfits.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm font-light">Create outfits to start planning</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}