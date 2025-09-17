import React, { useState } from 'react';
import { Role, Language } from '../types';
import { translations } from '../constants';
import { LeafIcon, GlobeIcon } from './Icons';

interface LoginScreenProps {
  onLogin: (role: Role) => void;
  onLanguageChange: (language: Language) => void;
  currentLanguage: Language;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onLanguageChange, currentLanguage }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const t = translations[currentLanguage];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Mock login logic: For this demo, we'll assume a successful login
      // and default to the student role as we don't have user data.
      // A real app would verify credentials and fetch the user's role.
      onLogin(Role.STUDENT); 
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email && password && selectedRole && termsAccepted) {
      onLogin(selectedRole);
    }
  };

  const LoginForm = (
    <form onSubmit={handleLoginSubmit} className="space-y-6">
      <div>
        <label htmlFor="email_login" className="block text-sm font-medium text-gray-700 text-left">Email</label>
        <input
          id="email_login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="password_login" className="block text-sm font-medium text-gray-700 text-left">Password</label>
        <input
          id="password_login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={!email || !password}
        className="w-full bg-[#2E7D32] text-white py-3 rounded-lg text-lg font-bold shadow-md hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );

  const RegisterForm = (
     <form onSubmit={handleRegisterSubmit} className="space-y-4">
      <div>
        <label htmlFor="username_reg" className="block text-sm font-medium text-gray-700 text-left">Username</label>
        <input
          id="username_reg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
       <div>
        <label htmlFor="email_reg" className="block text-sm font-medium text-gray-700 text-left">Email</label>
        <input
          id="email_reg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
       <div>
        <label htmlFor="password_reg" className="block text-sm font-medium text-gray-700 text-left">Password</label>
        <input
          id="password_reg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      <div>
        <span className="block text-sm font-medium text-gray-700 text-left mb-2">{t.selectRole}</span>
        <div className="grid grid-cols-2 gap-4">
           <button
            type="button"
            onClick={() => setSelectedRole(Role.STUDENT)}
            className={`py-4 px-2 border-2 rounded-xl text-center transition-all duration-300 ${selectedRole === Role.STUDENT ? 'border-[#2E7D32] bg-green-50 scale-105' : 'border-gray-200 bg-white hover:border-green-300'}`}
          >
            <span className="text-3xl">🎓</span>
            <span className="block mt-1 text-sm font-bold text-gray-800">{t.student}</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole(Role.TEACHER)}
            className={`py-4 px-2 border-2 rounded-xl text-center transition-all duration-300 ${selectedRole === Role.TEACHER ? 'border-[#2E7D32] bg-green-50 scale-105' : 'border-gray-200 bg-white hover:border-green-300'}`}
          >
            <span className="text-3xl">👩‍🏫</span>
            <span className="block mt-1 text-sm font-bold text-gray-800">{t.teacher}</span>
          </button>
        </div>
      </div>

       <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="h-4 w-4 rounded text-green-600 focus:ring-green-500 border-gray-300"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">{t.terms}</label>
        </div>

      <button
        type="submit"
        disabled={!username || !email || !password || !selectedRole || !termsAccepted}
        className="w-full bg-[#2E7D32] text-white py-3 rounded-lg text-lg font-bold shadow-md hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Create Account
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-yellow-100 flex flex-col items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
            <div className="relative">
                <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <select 
                    value={currentLanguage} 
                    onChange={(e) => onLanguageChange(e.target.value as Language)}
                    className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none appearance-none"
                >
                    <option value={Language.ENGLISH}>English</option>
                    <option value={Language.HINDI}>हिंदी</option>
                    <option value={Language.BENGALI}>বাংলা (Placeholder)</option>
                    <option value={Language.TELUGU}>తెలుగు (Placeholder)</option>
                </select>
            </div>
        </div>

      <div className="text-center bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full">
        <div className="flex justify-center items-center mb-4">
          <LeafIcon className="h-12 w-12 text-green-600" />
          <h1 className="text-4xl font-extrabold text-[#2E7D32] ml-2">{t.appTitle}</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{isRegistering ? 'Create Your Account' : 'Welcome Back!'}</h2>
        
        {isRegistering ? RegisterForm : LoginForm}

        <p className="mt-6 text-sm text-gray-600">
          {isRegistering ? "Already have an account? " : "Don't have an account? "}
          <button onClick={() => setIsRegistering(!isRegistering)} className="font-medium text-green-600 hover:text-green-500">
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>

      </div>
       <div className="mt-4 text-center text-gray-500 text-sm">
            <p>Mock login. No real authentication implemented.</p>
        </div>
    </div>
  );
};
