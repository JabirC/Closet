//src/components/Dashboard.js

'use client';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Sidebar from './Sidebar';
import ClothingDrawer from './ClothingDrawer';
import OutfitPlanner from './OutfitPlanner';
import Calendar from './Calendar';

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('closet');
  const [userData, setUserData] = useState({
    ...user,
    clothes: [],
    outfits: [],
    calendar: {}
  });

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [clothesRes, outfitsRes] = await Promise.all([
        fetch('/api/clothes'),
        fetch('/api/outfits')
      ]);

      if (clothesRes.ok && outfitsRes.ok) {
        const clothesData = await clothesRes.json();
        const outfitsData = await outfitsRes.json();

        setUserData(prev => ({
          ...prev,
          clothes: clothesData.clothes || [],
          outfits: outfitsData.outfits || []
        }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUserData = (updatedData) => {
    setUserData(updatedData);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        user={userData}
        onLogout={handleLogout}
      />
      
      <div className="flex-1">
        <div className="p-8">
          {activeTab === 'closet' && (
            <ClothingDrawer user={userData} updateUser={updateUserData} />
          )}
          {activeTab === 'outfits' && (
            <OutfitPlanner user={userData} updateUser={updateUserData} />
          )}
          {activeTab === 'calendar' && (
            <Calendar user={userData} updateUser={updateUserData} />
          )}
        </div>
      </div>
    </div>
  );
}