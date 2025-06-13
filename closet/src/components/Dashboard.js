//src/components/Dashboard.js

'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import ClothingDrawer from './ClothingDrawer';
import OutfitPlanner from './OutfitPlanner';
import Calendar from './Calendar';

export default function Dashboard({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('closet');

  const updateUser = (updatedUser) => {
    localStorage.setItem('closetUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('closetUser');
    setUser(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="flex-1">
        <div className="p-8">
          {activeTab === 'closet' && (
            <ClothingDrawer user={user} updateUser={updateUser} />
          )}
          {activeTab === 'outfits' && (
            <OutfitPlanner user={user} updateUser={updateUser} />
          )}
          {activeTab === 'calendar' && (
            <Calendar user={user} updateUser={updateUser} />
          )}
        </div>
      </div>
    </div>
  );
}