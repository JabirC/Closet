// src/components/Dashboard.js
'use client';
import { useState, useEffect, useMemo } from 'react';
import { signOut } from 'next-auth/react';
import { User, Crown, LogOut, ChevronDown } from 'lucide-react';
import TopNavigation from './TopNavigation';
import ClothingDrawer from './ClothingDrawer';
import OutfitPlanner from './OutfitPlanner';
import Calendar from './Calendar';

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('closet');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState({
    ...user,
    clothes: [],
    outfits: [],
    calendar: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [clothesRes, outfitsRes] = await Promise.all([
        fetch('/api/clothes'),
        fetch('/api/outfits')
      ]);

      if (clothesRes.ok && outfitsRes.ok) {
        const clothesData = await clothesRes.json();
        const outfitsData = await outfitsRes.json();

        const transformedOutfits = outfitsData.outfits.map(outfit => ({
          ...outfit,
          items: outfit.items.map(item => item.clothingItem)
        }));

        setUserData(prev => ({
          ...prev,
          clothes: clothesData.clothes || [],
          outfits: transformedOutfits || []
        }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = (updatedData) => {
    setUserData(updatedData);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  // Memoize tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'closet':
        return <ClothingDrawer user={userData} updateUser={updateUserData} />;
      case 'outfits':
        return <OutfitPlanner user={userData} updateUser={updateUserData} />;
      case 'calendar':
        return <Calendar user={userData} updateUser={updateUserData} />;
      default:
        return null;
    }
  }, [activeTab, userData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <div className="text-lg font-light text-gray-600">Loading your wardrobe...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Profile Menu */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{userData.name}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-slide-up">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                <Crown className="w-4 h-4" />
                <span>Plan Information ({userData.tier})</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Navigation */}
      <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="px-6 pb-8 tab-content">
        {tabContent}
      </div>
    </div>
  );
}