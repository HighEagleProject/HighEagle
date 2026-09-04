import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthError } from '../store/slices/authSlice';
import { FaUser, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const RegisterPage = ({ isModal = false, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    const resultAction = await dispatch(
      registerUser({ email: email.trim(), username: username.trim(), password, passwordConfirm })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success('🎉 Account created successfully! Welcome to High Eagle.');
      if (onSuccess) onSuccess();
      if (!isModal) navigate('/');
    } else {
      toast.error(resultAction.payload || 'Registration failed.');
    }
  };

  return (
    <div className={isModal ? 'w-full' : 'max-w-md mx-auto py-12'}>
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-ocean-700 space-y-6">
        <div className="text-center">
          <span className="text-4xl mb-2 block">🦅</span>
          <h2 className="text-2xl font-black text-white">Create Player Account</h2>
          <p className="text-xs text-slate-400 mt-1">Join High Eagle Sweepstakes & Gaming Lounge</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ocean_king"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-ocean-900 border border-ocean-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-glow"
                required
              />
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-ocean-900 border border-ocean-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-glow"
                required
              />
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-ocean-900 border border-ocean-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-glow"
                required
              />
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-ocean-900 border border-ocean-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-glow"
                required
              />
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-white text-sm uppercase tracking-wider shadow-glow-cyan flex items-center justify-center space-x-2"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <span>REGISTER</span>}
          </button>
        </form>

        {!isModal && (
          <p className="text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-cyan-glow hover:underline">
              Log In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
