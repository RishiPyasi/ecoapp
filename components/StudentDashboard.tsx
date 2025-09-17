import React, { useState, useEffect } from 'react';
import { getEnvironmentalFact } from '../services/geminiService';
import { LeafIcon, BookOpenIcon, ChartBarIcon, PawIcon, ShoppingBagIcon, PencilIcon, TargetIcon, UsersIcon, CalculatorIcon, TrophyIcon, CalendarIcon, SparklesIcon } from './Icons';
import { Challenges, Quiz, Shop, Journal, GroupDiscussion, PersonalGoals, PetRescue, ImpactCalculator, Badges, HabitHeatmap, SpinWheel, UserProfile } from './student/Features';

interface StudentDashboardProps {
  t: Record<string, string>;
}

// Sub-component for Fact Banner
const FactBanner: React.FC<{ t: Record<string, string> }> = ({ t }) => {
    const [fact, setFact] = useState<string>('Loading environmental fact...');

    useEffect(() => {
        const fetchFact = async () => {
            const newFact = await getEnvironmentalFact();
            setFact(newFact);
        };
        fetchFact();
    }, []);

    return (
        <div className="bg-gradient-to-r from-[#29B6F6] to-[#00838F] text-white p-4 rounded-lg shadow-lg text-center mb-6 animate-fade-in-down">
            <h3 className="font-bold text-lg mb-1">{t.factOfTheDay}</h3>
            <p className="text-sm italic">"{fact}"</p>
        </div>
    );
};

// Sub-component for Stats Card
const StatsCard: React.FC<{ t: Record<string, string>, stats: { rank: number, streak: number, ecoPoints: number } }> = ({ t, stats }) => {
    return (
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md grid grid-cols-3 divide-x divide-gray-200 text-center mb-6">
            <div>
                <p className="text-sm text-gray-500">{t.leaderboard}</p>
                <p className="text-2xl font-bold text-[#2E7D32]">#{stats.rank}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">{t.streak}</p>
                <p className="text-2xl font-bold text-[#FBC02D]">🔥 {stats.streak}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">{t.ecoPoints}</p>
                <p className="text-2xl font-bold text-green-500">🌿 {stats.ecoPoints.toLocaleString()}</p>
            </div>
        </div>
    );
};

// Sub-component for Adopted Pet
const AdoptedPetDisplay: React.FC<{ pet: { name: string; icon: string; hunger: number; thirst: number; } }> = ({ pet }) => (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md mb-6 animate-fade-in-down">
        <div className="flex items-center">
            <div className="text-5xl mr-4">{pet.icon}</div>
            <div className="flex-1">
                <p className="font-bold text-lg text-[#8D6E63]">{pet.name}</p>
                 <div className="space-y-1 mt-1">
                    <div>
                        <span className="text-sm">🍖 Hunger</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-orange-400 h-2.5 rounded-full" style={{ width: `${pet.hunger}%` }}></div></div>
                    </div>
                    <div>
                        <span className="text-sm">💧 Thirst</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${pet.thirst}%` }}></div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Sub-component for Virtual Garden
const VirtualGarden: React.FC<{ t: Record<string, string>, onGardenClick: () => void }> = ({ t, onGardenClick }) => {
    const [activeTab, setActiveTab] = useState('my');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        onGardenClick();
    }

    return (
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md mb-6">
            <div className="flex border-b border-gray-200 mb-4">
                <button onClick={() => handleTabClick('my')} className={`px-4 py-2 font-semibold ${activeTab === 'my' ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]' : 'text-gray-500'}`}>{t.myGarden}</button>
                <button onClick={() => handleTabClick('class')} className={`px-4 py-2 font-semibold ${activeTab === 'class' ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]' : 'text-gray-500'}`}>{t.classGarden}</button>
                <button onClick={() => handleTabClick('school')} className={`px-4 py-2 font-semibold ${activeTab === 'school' ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]' : 'text-gray-500'}`}>{t.schoolGarden}</button>
            </div>
            <div 
                onClick={onGardenClick}
                className="relative w-full h-48 bg-[#8D6E63] rounded-lg overflow-hidden bg-cover bg-center cursor-pointer" 
                style={{backgroundImage: "url('https://i.imgur.com/uG9G6l5.png')"}}
                aria-label="Virtual Garden, click to learn more"
            >
                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors">
                    <p className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded-md">View Your Garden</p>
                 </div>
            </div>
        </div>
    );
};

// Sub-component for Feature Grid
const FeatureGrid: React.FC<{ t: Record<string, string>, onFeatureSelect: (featureId: string) => void }> = ({ t, onFeatureSelect }) => {
    const features = [
        { id: 'challenges', name: t.challenges, icon: <TrophyIcon className="w-8 h-8"/>, color: 'text-[#2E7D32]' },
        { id: 'quiz', name: t.quizzes, icon: <BookOpenIcon className="w-8 h-8"/>, color: 'text-[#29B6F6]' },
        { id: 'shop', name: t.shop, icon: <ShoppingBagIcon className="w-8 h-8"/>, color: 'text-[#FBC02D]' },
        { id: 'journaling', name: t.journaling, icon: <PencilIcon className="w-8 h-8"/>, color: 'text-purple-500' },
        { id: 'groupDiscussion', name: t.groupDiscussion, icon: <UsersIcon className="w-8 h-8"/>, color: 'text-orange-500' },
        { id: 'personalGoals', name: t.personalGoals, icon: <TargetIcon className="w-8 h-8"/>, color: 'text-red-500' },
        { id: 'petRescue', name: t.petRescue, icon: <PawIcon className="w-8 h-8"/>, color: 'text-[#8D6E63]' },
        { id: 'lessons', name: t.lessons, icon: <LeafIcon className="w-8 h-8"/>, color: 'text-teal-500' },
        { id: 'impactCalculator', name: t.impactCalculator, icon: <CalculatorIcon className="w-8 h-8"/>, color: 'text-indigo-500' },
        { id: 'badges', name: t.badges, icon: <ChartBarIcon className="w-8 h-8"/>, color: 'text-pink-500' },
        { id: 'habitHeatmap', name: t.habitHeatmap, icon: <CalendarIcon className="w-8 h-8"/>, color: 'text-cyan-500' },
        { id: 'spinWheel', name: t.spinWheel, icon: <SparklesIcon className="w-8 h-8"/>, color: 'text-yellow-400' },
    ];

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {features.map(feature => (
                <button key={feature.id} onClick={() => onFeatureSelect(feature.id)} className="flex flex-col items-center justify-center p-2 bg-white/90 backdrop-blur-md rounded-xl shadow-md aspect-square transition-transform hover:scale-105 hover:shadow-lg">
                    <div className={`${feature.color}`}>{feature.icon}</div>
                    <span className="text-xs sm:text-sm text-center font-semibold mt-2 text-gray-700">{feature.name}</span>
                </button>
            ))}
        </div>
    );
}

interface ModalProps {
    onClose: () => void;
    title?: string;
    message: string;
    icon?: React.ReactNode;
}

const InfoModal: React.FC<ModalProps> = ({ onClose, title, message, icon }) => (
     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm mx-4 transform transition-transform animate-scale-in">
            {icon && <div className="text-green-500 mx-auto mb-4 w-16 h-16 flex items-center justify-center">{icon}</div>}
            {title && <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>}
            <p className="text-gray-600">{message}</p>
            <button onClick={onClose} className="mt-6 w-full px-4 py-2 bg-[#2E7D32] text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
                Got it!
            </button>
        </div>
    </div>
)


// Main Student Dashboard Component
const StudentDashboard: React.FC<StudentDashboardProps> = ({ t }) => {
    const [activeView, setActiveView] = useState('dashboard');
    const [comingSoonModalContent, setComingSoonModalContent] = useState<{title: string, message: string, icon: React.ReactNode} | null>(null);
    const [infoModalMessage, setInfoModalMessage] = useState<string | null>(null);
    const [adoptedPet, setAdoptedPet] = useState<{ name: string; icon: string; hunger: number; thirst: number; } | null>(null);

    const [userStats, setUserStats] = useState({
        rank: 5,
        streak: 12,
        ecoPoints: 1250,
    });
    
    useEffect(() => {
        if (adoptedPet) {
            const interval = setInterval(() => {
                setAdoptedPet(prevPet => {
                    if (!prevPet) return null;
                    return {
                        ...prevPet,
                        hunger: Math.max(0, prevPet.hunger - 1),
                        thirst: Math.max(0, prevPet.thirst - 2), // Thirst decreases faster
                    };
                });
            }, 5000); // Decrease every 5 seconds
            return () => clearInterval(interval);
        }
    }, [adoptedPet]);

    const handleFeatureSelect = (featureId: string) => {
        if (featureId === 'lessons' || featureId === 'spinWheel') {
             setComingSoonModalContent({
                title: 'Coming Soon!',
                message: 'Our team is cultivating exciting new features to help you grow. Stay tuned!',
                icon: <LeafIcon className="h-16 w-16" />
            });
        } else {
            setActiveView(featureId);
        }
    };
    
    const handleGardenClick = () => {
        setComingSoonModalContent({
            title: 'Garden Feature Coming Soon!',
            message: 'Get ready to grow your own virtual garden by completing challenges. This feature is currently sprouting and will be available soon!',
            icon: <SparklesIcon className="h-16 w-16" />
        });
    }
    
    const handleAdoptPet = (pet: { name: string; icon: string; }) => {
        setAdoptedPet({ ...pet, hunger: 100, thirst: 100 });
    };

    const handleCareForPet = (careType: 'hunger' | 'thirst') => {
        if (adoptedPet) {
            setAdoptedPet(prevPet => {
                if (!prevPet) return null;
                return {
                    ...prevPet,
                    [careType]: 100,
                };
            });
        }
    };

    const handleBackToDashboard = () => {
        setActiveView('dashboard');
    };
    
    const updateEcoPoints = (amount: number) => {
        setUserStats(prev => ({...prev, ecoPoints: prev.ecoPoints + amount}));
    }

    const renderActiveView = () => {
        switch (activeView) {
            case 'challenges': return <Challenges t={t} onBack={handleBackToDashboard} updateEcoPoints={updateEcoPoints} showInfoModal={setInfoModalMessage} />;
            case 'quiz': return <Quiz t={t} onBack={handleBackToDashboard} updateEcoPoints={updateEcoPoints} />;
            case 'shop': return <Shop t={t} onBack={handleBackToDashboard} ecoPoints={userStats.ecoPoints} updateEcoPoints={updateEcoPoints} onCareForPet={handleCareForPet} />;
            case 'journaling': return <Journal t={t} onBack={handleBackToDashboard} />;
            case 'groupDiscussion': return <GroupDiscussion t={t} onBack={handleBackToDashboard} />;
            case 'personalGoals': return <PersonalGoals t={t} onBack={handleBackToDashboard} />;
            case 'petRescue': return <PetRescue t={t} onBack={handleBackToDashboard} onAdopt={handleAdoptPet} />;
            case 'impactCalculator': return <ImpactCalculator t={t} onBack={handleBackToDashboard} />;
            case 'badges': return <Badges t={t} onBack={handleBackToDashboard} />;
            case 'habitHeatmap': return <HabitHeatmap t={t} onBack={handleBackToDashboard} />;
            case 'spinWheel': return <SpinWheel t={t} onBack={handleBackToDashboard} updateEcoPoints={updateEcoPoints} />;
            case 'profile': return <UserProfile t={t} onBack={handleBackToDashboard} stats={userStats} adoptedPet={adoptedPet} />
            default:
                return (
                    <>
                        <FactBanner t={t} />
                        <StatsCard t={t} stats={userStats} />
                        {adoptedPet && <AdoptedPetDisplay pet={adoptedPet} />}
                        <VirtualGarden t={t} onGardenClick={handleGardenClick} />
                        <FeatureGrid t={t} onFeatureSelect={handleFeatureSelect} />
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-yellow-50">
            <div className="max-w-2xl mx-auto">
                <header className="flex justify-between items-center p-4 sm:p-6">
                    <div className="flex items-center">
                        <LeafIcon className="h-8 w-8 text-green-600"/>
                        <h1 className="text-2xl font-bold text-[#2E7D32] ml-2">{t.appTitle}</h1>
                    </div>
                    <button onClick={() => setActiveView('profile')} className="w-12 h-12 bg-white rounded-full shadow-md transition-transform hover:scale-110">
                        <img src="https://picsum.photos/100" alt="avatar" className="w-full h-full rounded-full object-cover"/>
                    </button>
                </header>
                
                <main className="p-4 sm:p-6 pt-0">
                    {renderActiveView()}
                </main>

                {activeView === 'dashboard' && (
                     <div className="mt-4 text-center text-gray-500 text-sm p-4">
                        <p>Offline-first functionality is mocked. Data persists on refresh using local state.</p>
                    </div>
                )}
               
                {comingSoonModalContent && <InfoModal onClose={() => setComingSoonModalContent(null)} {...comingSoonModalContent} />}
                {infoModalMessage && <InfoModal message={infoModalMessage} onClose={() => setInfoModalMessage(null)} />}
            </div>
        </div>
    );
};

export default StudentDashboard;