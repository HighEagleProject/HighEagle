import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { gameplayService } from '../services/gameplayService';
import { favoriteService } from '../services/favoriteService';
import { authService } from '../services/authService';
import { GameGrid } from '../components/GameGrid/GameGrid';
import { FaUser, FaCoins, FaGamepad, FaTrophy, FaHeart, FaHistory, FaCog, FaUndoAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const { user, balance, setBalance } = useAuth();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'favorites' | 'history' | 'settings'
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Settings form state
  const [usernameInput, setUsernameInput] = useState(user?.username || '');

  useEffect(() => {
    if (user?.username) {
      setUsernameInput(user.username);
    }
  }, [user?.username]);

  useEffect(() => {
    if (activeTab === 'history') {
      setLoading(true);
      gameplayService
        .getHistory()
        .then((res) => setHistory(res.results || res || []))
        .finally(() => setLoading(false));
    } else if (activeTab === 'favorites') {
      setLoading(true);
      favoriteService
        .getFavorites()
        .then((res) => setFavorites(res.favorites || []))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const handleResetBalance = async () => {
    try {
      const data = await gameplayService.resetBalance();
      if (data.success) {
        setBalance(10000);
        toast.success('Demo Balance reset to 10,000 coins!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset balance');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.updateProfile({ username: usernameInput });
      if (data.success) {
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!user) {
    return (
      <div className="py-20 text-center glass-panel rounded-3xl my-6">
        <h2 className="text-xl font-bold text-white mb-2">Please Log In</h2>
        <p className="text-sm text-slate-400">Log in to view your profile dashboard and spin history.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header Profile Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-ocean-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 shadow-glow-cyan">
            <div className="w-full h-full bg-ocean-950 rounded-full flex items-center justify-center text-2xl font-black text-white">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{user.username}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
            <span className="inline-block mt-2 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-glow border border-cyan-400/40">
              VIP Member
            </span>
          </div>
        </div>

        {/* Balance */}
        <div className="flex items-center space-x-4 glass-card p-4 px-6 rounded-2xl border border-amber-500/30">
          <div className="flex items-center space-x-3">
            <FaCoins className="text-3xl text-gold-400" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Balance</span>
              <span className="text-2xl font-black text-amber-300">{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex border-b border-ocean-800 space-x-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: FaUser },
          { id: 'favorites', label: 'Favorites', icon: FaHeart },
          { id: 'history', label: 'Spin History', icon: FaHistory },
          { id: 'settings', label: 'Settings', icon: FaCog },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-bold text-xs border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-cyan-glow text-cyan-glow'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="glass-panel p-6 rounded-2xl border border-ocean-700 text-center">
                <FaGamepad className="text-3xl text-cyan-glow mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-400 uppercase">Games Played</span>
                <p className="text-2xl font-black text-white mt-1">{user.games_played || 0}</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-ocean-700 text-center">
                <FaCoins className="text-3xl text-gold-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-400 uppercase">Total Spins</span>
                <p className="text-2xl font-black text-white mt-1">{user.total_spins || 0}</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-ocean-700 text-center">
                <FaTrophy className="text-3xl text-amber-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-400 uppercase">Total Demo Wins</span>
                <p className="text-2xl font-black text-amber-300 mt-1">{(user.total_wins || 0).toLocaleString()}</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-ocean-700 space-y-4">
              <h3 className="text-lg font-bold text-white">Account Details</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between py-2 border-b border-ocean-800">
                  <span>Username:</span>
                  <strong className="text-white">{user.username}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-ocean-800">
                  <span>Email:</span>
                  <strong className="text-white">{user.email}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-ocean-800">
                  <span>Member Since:</span>
                  <strong className="text-white">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Active Member'}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">My Favorite Slot Games</h3>
            <GameGrid games={favorites} loading={loading} skeletonCount={6} />
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Recent Spin History</h3>
            
            {loading ? (
              <div className="py-12 text-center text-cyan-glow font-bold">Loading history...</div>
            ) : history.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm glass-panel rounded-2xl">
                No spin history recorded yet. Open a game and spin to start tracking!
              </div>
            ) : (
              <div className="overflow-x-auto glass-panel rounded-2xl border border-ocean-700">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-ocean-900 text-slate-400 font-bold uppercase tracking-wider border-b border-ocean-800">
                    <tr>
                      <th className="p-4">Game</th>
                      <th className="p-4">Bet</th>
                      <th className="p-4">Win</th>
                      <th className="p-4">Balance After</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ocean-800">
                    {history.map((spin) => (
                      <tr key={spin.id} className="hover:bg-ocean-800/50">
                        <td className="p-4 font-bold text-white">{spin.game_title}</td>
                        <td className="p-4">{spin.bet}</td>
                        <td className={`p-4 font-bold ${spin.win > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                          {spin.win > 0 ? `+${spin.win}` : '0'}
                        </td>
                        <td className="p-4">{spin.balance_after}</td>
                        <td className="p-4 text-slate-500">
                          {new Date(spin.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-ocean-700 max-w-xl space-y-6">
            <h3 className="text-lg font-bold text-white">Profile Settings</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Username</label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ocean-900 border border-ocean-700 text-white focus:outline-none focus:border-cyan-glow text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm shadow-glow-cyan"
              >
                Save Profile Changes
              </button>
            </form>

            <div className="pt-6 border-t border-ocean-800">
              <h4 className="text-sm font-bold text-white mb-2">Reset Demo Balance</h4>
              <p className="text-xs text-slate-400 mb-4">
                Refill your virtual demo coins back to the starting amount of 10,000 coins.
              </p>
              <button
                type="button"
                onClick={handleResetBalance}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-amber-300 border border-amber-400/30 font-bold text-xs transition-colors"
              >
                <FaUndoAlt /> Reset Balance to 10,000 Coins
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
