
import React, { useState, useEffect } from 'react';
import { Role, Language } from './types';
import { translations } from './constants';
import { LoginScreen } from './components/LoginScreen';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  // Persist language choice
  useEffect(() => {
    const savedLang = localStorage.getItem('ecologic-lang');
    if (savedLang && Object.values(Language).includes(savedLang as Language)) {
      setLanguage(savedLang as Language);
    }
  }, []);

  const handleLogin = (role: Role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('ecologic-lang', lang);
  };

  const t = translations[language] || translations[Language.ENGLISH];

  if (!isLoggedIn || !userRole) {
    return <LoginScreen onLogin={handleLogin} onLanguageChange={handleLanguageChange} currentLanguage={language} />;
  }

  return (
    <div className="App">
      {userRole === Role.STUDENT && <StudentDashboard t={t} />}
      {userRole === Role.TEACHER && <TeacherDashboard t={t} />}
    </div>
  );
};

export default App;
