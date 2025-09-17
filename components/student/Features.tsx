import React, { useState, useEffect, useRef } from 'react';

// --- Reusable Components ---

const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

interface FeatureShellProps {
    title: string;
    onBack: () => void;
    children: React.ReactNode;
}

const FeatureShell: React.FC<FeatureShellProps> = ({ title, onBack, children }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors mr-2">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <h2 className="text-3xl font-bold text-[#2E7D32]">{title}</h2>
            </div>
            <div>{children}</div>
        </div>
    );
};


// --- Feature Implementations ---

// 1. Challenges
export const Challenges = ({ t, onBack, updateEcoPoints, showInfoModal }: { t: any, onBack: () => void, updateEcoPoints: (amount: number) => void, showInfoModal: (message: string) => void }) => {
    const [challenges, setChallenges] = useState([
        { title: "Tree Plantation Drive", description: "Plant a sapling in your community and upload a picture.", points: 100, submitted: false },
        { title: "Waste Segregation", description: "Correctly segregate your household waste for 3 days.", points: 50, submitted: true },
        { title: "Use Public Transport", description: "Use public transport instead of a private vehicle and share your experience.", points: 75, submitted: false },
        { title: "DIY Upcycling", description: "Create something new from old waste materials.", points: 80, submitted: false },
    ]);

    const handleSubmit = (index: number) => {
        const newChallenges = [...challenges];
        if (newChallenges[index].submitted) return;

        newChallenges[index].submitted = true;
        setChallenges(newChallenges);
        updateEcoPoints(newChallenges[index].points);
        showInfoModal(`🌿 ${newChallenges[index].points} points awarded! Your submission is pending teacher verification.`);
    };

    return (
        <FeatureShell title={t.challenges} onBack={onBack}>
            <div className="space-y-4">
                {challenges.map((challenge, index) => (
                    <div key={index} className="bg-white/80 p-4 rounded-xl shadow-md">
                        <h3 className="font-bold text-lg text-gray-800">{challenge.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-green-600">🌿 {challenge.points} Points</span>
                            <button 
                                disabled={challenge.submitted} 
                                onClick={() => handleSubmit(index)}
                                className="px-4 py-1.5 text-sm font-semibold text-white bg-[#2E7D32] rounded-full hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {challenge.submitted ? 'Submitted' : 'Submit'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </FeatureShell>
    );
};

// 2. Quiz
export const Quiz = ({ t, onBack, updateEcoPoints }: { t: any, onBack: () => void, updateEcoPoints: (amount: number) => void }) => {
    const questions = [
        { question: "Which of these is a renewable energy source?", options: ["Coal", "Solar", "Natural Gas", "Oil"], answer: "Solar", points: 20 },
        { question: "What does 'composting' primarily help reduce?", options: ["Air pollution", "Landfill waste", "Water usage", "Noise pollution"], answer: "Landfill waste", points: 20 },
        { question: "The 'Three Rs' of waste management are Reduce, Reuse, and...?", options: ["Recycle", "Replant", "Review", "Remove"], answer: "Recycle", points: 10 },
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState<{[key: string]: 'correct' | 'incorrect'}>({});
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (option: string) => {
        if (isAnswered) return;

        setIsAnswered(true);
        const isCorrect = option === questions[currentQuestion].answer;
        
        if (isCorrect) {
            // TODO: Play correct answer SFX
            setScore(prev => prev + questions[currentQuestion].points);
            setFeedback({ [option]: 'correct' });
        } else {
            // TODO: Play incorrect answer SFX
            setFeedback({ [option]: 'incorrect' });
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setIsAnswered(false);
                setFeedback({});
            } else {
                setShowResult(true);
            }
        }, 1500);
    };
    
    useEffect(() => {
        if(showResult) {
            updateEcoPoints(score);
        }
    }, [showResult, score, updateEcoPoints]);

    if (showResult) {
        return (
            <FeatureShell title={t.quizzes} onBack={onBack}>
                <div className="text-center bg-white/80 p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                    <p className="my-4 text-lg">You earned <span className="font-bold text-green-600">🌿 {score}</span> Eco Points!</p>
                    <button onClick={onBack} className="px-6 py-2 bg-[#2E7D32] text-white font-bold rounded-lg">Back to Dashboard</button>
                </div>
            </FeatureShell>
        );
    }

    const getButtonClass = (option: string) => {
        if (feedback[option] === 'correct') {
            return 'bg-green-500 text-white animate-pop';
        }
        if (feedback[option] === 'incorrect') {
            return 'bg-red-500 text-white animate-shake';
        }
        return 'bg-gray-100 hover:bg-green-100';
    };

    return (
        <FeatureShell title={t.quizzes} onBack={onBack}>
            <div className="bg-white/80 p-6 rounded-xl shadow-lg">
                <p className="text-sm text-gray-500 mb-2">Question {currentQuestion + 1}/{questions.length}</p>
                <h3 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h3>
                <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestion].options.map(option => (
                        <button 
                            key={option} 
                            onClick={() => handleAnswer(option)}
                            disabled={isAnswered}
                            className={`w-full text-left p-4 rounded-lg transition-colors duration-300 ${getButtonClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </FeatureShell>
    );
};

// 3. Shop
export const Shop = ({ t, onBack, ecoPoints, updateEcoPoints, onCareForPet }: { t: any, onBack: () => void, ecoPoints: number, updateEcoPoints: (amount: number) => void, onCareForPet: (careType: 'hunger' | 'thirst') => void }) => {
    const items = [
        { name: "Pet Food", price: 50, icon: "🍖", care: 'hunger' as 'hunger' | 'thirst' },
        { name: "Water Bowl", price: 30, icon: "💧", care: 'thirst' as 'hunger' | 'thirst' },
        { name: "Flower Seeds", price: 200, icon: "🌸" },
        { name: "Garden Gnome", price: 300, icon: "🍄" },
        { name: "Bird Feeder", price: 250, icon: "🐦" },
        { name: "Bee Hotel", price: 400, icon: "🐝" },
    ];
    const [message, setMessage] = useState('');
    
    const handleBuy = (item: {price: number, care?: 'hunger' | 'thirst'}) => {
        if (ecoPoints >= item.price) {
            updateEcoPoints(-item.price);
            if (item.care) {
                onCareForPet(item.care);
                setMessage(`You replenished your pet's ${item.care}!`);
            } else {
                setMessage('Purchase successful!');
            }
        } else {
            setMessage("Not enough points!");
        }
        setTimeout(() => setMessage(''), 2000);
    }

    return (
        <FeatureShell title={t.shop} onBack={onBack}>
             <div className="bg-white/80 p-4 rounded-xl shadow-md text-center mb-4">
                <p className="text-gray-600">Your Balance</p>
                <p className="text-3xl font-bold text-green-600">🌿 {ecoPoints.toLocaleString()}</p>
                {message && <p className="text-sm text-blue-500 mt-2">{message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                {items.map(item => (
                    <div key={item.name} className="bg-white/80 p-4 rounded-xl shadow-md text-center">
                        <div className="text-5xl mb-2">{item.icon}</div>
                        <p className="font-semibold">{item.name}</p>
                        <button onClick={() => handleBuy(item)} disabled={ecoPoints < item.price} className="mt-2 w-full px-3 py-1.5 text-sm bg-[#FBC02D] text-gray-800 font-bold rounded-full hover:bg-yellow-400 disabled:bg-gray-300 disabled:cursor-not-allowed">
                           🌿 {item.price}
                        </button>
                    </div>
                ))}
            </div>
        </FeatureShell>
    );
};


// 4. Journaling
export const Journal = ({ t, onBack }: { t: any, onBack: () => void }) => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('eco-journal');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('eco-journal', JSON.stringify(entries));
    }, [entries]);

    const handleSubmit = () => {
        if(entry.trim()) {
            const newEntry = { text: entry, date: new Date().toLocaleDateString() };
            setEntries([newEntry, ...entries]);
            setEntry('');
        }
    };

    return (
        <FeatureShell title={t.journaling} onBack={onBack}>
            <div className="bg-white/80 p-4 rounded-xl shadow-md mb-4">
                <textarea 
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="What did you do for the planet today?"
                    className="w-full h-28 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
                <button onClick={handleSubmit} className="mt-2 w-full py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600">Save Entry</button>
            </div>
             <div className="space-y-3 max-h-80 overflow-y-auto">
                {entries.map((item: any, index: number) => (
                    <div key={index} className="bg-white/60 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{item.text}</p>
                        <p className="text-xs text-gray-500 text-right mt-1">{item.date}</p>
                    </div>
                ))}
            </div>
        </FeatureShell>
    );
};


// 5. Group Discussion
export const GroupDiscussion = ({ t, onBack }: { t: any, onBack: () => void }) => {
    const mockMessages = [
        { user: "Aarav", text: "Hey everyone! I just planted a mango sapling for the challenge! 🌱", isMe: false },
        { user: "Saanvi", text: "That's awesome, Aarav! I'm trying to convince my family to start composting.", isMe: false },
        { user: "You", text: "Great ideas! I'm planning to use public transport more often.", isMe: true },
        { user: "Teacher", text: "Wonderful initiatives, class! Keep up the great work. Every small step counts.", isMe: false, isTeacher: true },
    ];
    return (
        <FeatureShell title={t.groupDiscussion} onBack={onBack}>
            <div className="bg-white/80 h-[60vh] rounded-xl shadow-md flex flex-col p-4">
                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                    {mockMessages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.isMe ? 'justify-end' : ''}`}>
                            {!msg.isMe && <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${msg.isTeacher ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>{msg.user.charAt(0)}</div>}
                            <div className={`max-w-xs p-3 rounded-2xl ${msg.isMe ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {!msg.isMe && <p className={`font-bold text-sm ${msg.isTeacher ? 'text-blue-600' : 'text-orange-500'}`}>{msg.user}</p>}
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex gap-2">
                    <input type="text" placeholder="Type your message..." className="flex-1 p-3 border rounded-full focus:ring-2 focus:ring-green-500 outline-none" />
                    <button className="px-5 py-3 bg-[#2E7D32] text-white rounded-full font-semibold">Send</button>
                </div>
            </div>
        </FeatureShell>
    );
};

// 6. Personal Goals
export const PersonalGoals = ({ t, onBack }: { t: any, onBack: () => void }) => {
     const [goals, setGoals] = useState([
        { text: "Carry a reusable water bottle all week", done: true },
        { text: "Switch to LED bulbs at home", done: false },
        { text: "Have two meat-free days", done: false },
    ]);
    const [newGoal, setNewGoal] = useState('');

    const addGoal = () => {
        if(newGoal.trim()){
            setGoals([...goals, { text: newGoal, done: false }]);
            setNewGoal('');
        }
    };
    
    const toggleGoal = (index: number) => {
        const updatedGoals = [...goals];
        updatedGoals[index].done = !updatedGoals[index].done;
        setGoals(updatedGoals);
    }

    return (
        <FeatureShell title={t.personalGoals} onBack={onBack}>
            <div className="bg-white/80 p-4 rounded-xl shadow-md mb-4">
                <div className="flex gap-2">
                    <input value={newGoal} onChange={e => setNewGoal(e.target.value)} type="text" placeholder="Add a new eco-goal" className="flex-1 p-2 border rounded-lg" />
                    <button onClick={addGoal} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">Add</button>
                </div>
            </div>
            <div className="space-y-3">
                {goals.map((goal, index) => (
                    <div key={index} onClick={() => toggleGoal(index)} className={`flex items-center p-3 rounded-lg cursor-pointer ${goal.done ? 'bg-green-100 text-gray-500 line-through' : 'bg-white/80'}`}>
                        <div className={`w-5 h-5 mr-3 rounded border-2 ${goal.done ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                        <span>{goal.text}</span>
                    </div>
                ))}
            </div>
        </FeatureShell>
    );
};

// 7. Pet Rescue
export const PetRescue = ({ t, onBack, onAdopt }: { t: any, onBack: () => void, onAdopt: (pet: {name: string, icon: string}) => void }) => {
    const pets = [
        { name: 'Rusty', species: 'Stray Dog', icon: '🐶', story: 'Found wandering near the school. Loves long walks and belly rubs!' },
        { name: 'Whiskers', species: 'Kitten', icon: '🐱', story: 'Rescued from a tree. A bit shy but very playful.' },
        { name: 'Shelly', species: 'Turtle', icon: '🐢', story: 'Found near a polluted pond. Now safe and sound.' },
    ];
    
    const handleAdopt = (pet: {name: string, icon: string}) => {
        onAdopt(pet);
        onBack();
    }

    return (
        <FeatureShell title={t.petRescue} onBack={onBack}>
            <div className="space-y-4">
                {pets.map(pet => (
                    <div key={pet.name} className="bg-white/80 p-4 rounded-xl shadow-md flex items-center">
                        <div className="text-6xl mr-4">{pet.icon}</div>
                        <div>
                            <h3 className="font-bold text-lg">{pet.name} <span className="text-sm font-normal text-gray-500">({pet.species})</span></h3>
                            <p className="text-sm text-gray-600 italic">"{pet.story}"</p>
                        </div>
                        <button onClick={() => handleAdopt(pet)} className="ml-auto px-4 py-2 bg-[#8D6E63] text-white font-semibold rounded-lg text-sm transition-transform hover:scale-105">Adopt</button>
                    </div>
                ))}
            </div>
        </FeatureShell>
    );
};

// 8. Impact Calculator
export const ImpactCalculator = ({ t, onBack }: { t: any, onBack: () => void }) => {
    const [result, setResult] = useState(0);
    const [plasticBottles, setPlasticBottles] = useState(0);
    const [meatlessMeals, setMeatlessMeals] = useState(0);
    
    const calculateImpact = () => {
        // Mock calculations: 1 bottle = 0.1kg CO2, 1 meal = 2.5kg CO2
        const impact = (plasticBottles * 0.1) + (meatlessMeals * 2.5);
        setResult(impact);
    }
    
    return (
        <FeatureShell title={t.impactCalculator} onBack={onBack}>
            <div className="bg-white/80 p-6 rounded-xl shadow-md space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Plastic bottles avoided this week:</label>
                    <input type="number" value={plasticBottles} onChange={e => setPlasticBottles(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded-lg" />
                </div>
                 <div>
                    <label className="block font-semibold mb-1">Meat-free meals this week:</label>
                    <input type="number" value={meatlessMeals} onChange={e => setMeatlessMeals(parseInt(e.target.value) || 0)} className="w-full p-2 border rounded-lg" />
                </div>
                <button onClick={calculateImpact} className="w-full py-2 bg-indigo-500 text-white font-bold rounded-lg">Calculate</button>
                {result > 0 && 
                    <div className="text-center pt-4">
                        <p className="text-lg">You've saved an estimated</p>
                        <p className="text-4xl font-bold text-indigo-600 my-2">{result.toFixed(1)} kg</p>
                        <p className="text-lg">of CO₂ this week! Amazing!</p>
                    </div>
                }
            </div>
        </FeatureShell>
    );
};

// 9. Badges
export const Badges = ({ t, onBack }: { t: any, onBack: () => void }) => {
    const badges = [
        { name: "Tree Planter", icon: "🌳", earned: true },
        { name: "Recycle Pro", icon: "♻️", earned: true },
        { name: "Water Saver", icon: "💧", earned: false },
        { name: "Energy Star", icon: "💡", earned: true },
        { name: "Compost King", icon: "🌱", earned: false },
        { name: "Eco-Warrior", icon: "🛡️", earned: false },
    ];
    return (
        <FeatureShell title={t.badges} onBack={onBack}>
            <div className="grid grid-cols-3 gap-4">
                {badges.map(badge => (
                    <div key={badge.name} className={`p-4 rounded-xl text-center ${badge.earned ? 'bg-white/90' : 'bg-gray-200/80'}`}>
                        <div className={`text-5xl transition-transform ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</div>
                        <p className={`mt-2 font-semibold text-sm ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}>{badge.name}</p>
                    </div>
                ))}
            </div>
        </FeatureShell>
    );
};

// 10. Habit Heatmap
export const HabitHeatmap = ({ t, onBack }: { t: any, onBack: () => void }) => {
    // Mock data for a month
    const days = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, activity: Math.floor(Math.random() * 4) }));
    const colors = ['bg-gray-200/50', 'bg-green-200', 'bg-green-400', 'bg-green-600'];
    return (
        <FeatureShell title={t.habitHeatmap} onBack={onBack}>
            <div className="bg-white/80 p-4 rounded-xl shadow-md">
                <h3 className="font-bold text-center mb-4">Your Eco-Activity Last Month</h3>
                <div className="grid grid-cols-7 gap-2">
                    {days.map(day => (
                        <div key={day.day} className={`w-full aspect-square rounded ${colors[day.activity]} flex items-center justify-center text-xs text-gray-700`}>
                            {day.day}
                        </div>
                    ))}
                </div>
            </div>
        </FeatureShell>
    );
};

// 11. Spin Wheel
export const SpinWheel = ({ t, onBack, updateEcoPoints }: { t: any, onBack: () => void, updateEcoPoints: (amount: number) => void }) => {
    const prizes = [10, 50, 100, 20, 0, 75, 200, 5];
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    const spin = () => {
        if(spinning) return;
        setSpinning(true);
        setResult(null);
        const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
        const prize = prizes[randomPrizeIndex];
        const degreesPerSegment = 360 / prizes.length;
        const randomOffset = (Math.random() - 0.5) * degreesPerSegment * 0.8;
        const finalRotation = 360 * 5 + (360 - (randomPrizeIndex * degreesPerSegment + randomOffset));
        
        if (wheelRef.current) {
            wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.25, 1, 0.5, 1)';
            wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
        }
        
        setTimeout(() => {
            setSpinning(false);
            setResult(prize);
            updateEcoPoints(prize);
             if (wheelRef.current) {
                wheelRef.current.style.transition = 'none';
                const currentRotation = finalRotation % 360;
                wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
            }
        }, 4000);
    }

    return (
        <FeatureShell title={t.spinWheel} onBack={onBack}>
            <div className="flex flex-col items-center">
                <div className="relative w-80 h-80 mb-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-5xl z-10">▼</div>
                    <div ref={wheelRef} className="w-full h-full rounded-full border-8 border-yellow-300 shadow-lg overflow-hidden">
                        {prizes.map((prize, index) => {
                            const rotation = index * (360 / prizes.length);
                            return (
                             <div key={index} className="absolute w-1/2 h-1/2 origin-bottom-right" style={{ transform: `rotate(${rotation}deg)`}}>
                                <div className={`w-full h-full text-center flex items-center justify-center font-bold text-lg -rotate-45 ${index % 2 ? 'bg-cyan-300' : 'bg-cyan-400'}`} style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}>
                                    <span>🌿{prize}</span>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
                <button onClick={spin} disabled={spinning} className="px-10 py-4 bg-yellow-400 text-gray-800 font-bold text-2xl rounded-full shadow-lg hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-wait">
                    {spinning ? 'Spinning...' : 'SPIN!'}
                </button>
                {result !== null && <p className="mt-6 text-xl font-bold animate-pulse">You won 🌿{result} Eco Points!</p>}
            </div>
        </FeatureShell>
    );
};

// 12. User Profile
export const UserProfile = ({ t, onBack, stats, adoptedPet }: { t: any, onBack: () => void, stats: any, adoptedPet: {name: string, icon: string, hunger: number, thirst: number} | null }) => {
    const allBadges = [
        { name: "Tree Planter", icon: "🌳", earned: true },
        { name: "Recycle Pro", icon: "♻️", earned: true },
        { name: "Water Saver", icon: "💧", earned: false },
        { name: "Energy Star", icon: "💡", earned: true },
        { name: "Compost King", icon: "🌱", earned: false },
        { name: "Eco-Warrior", icon: "🛡️", earned: false },
    ];
    const earnedBadges = allBadges.filter(b => b.earned);

    return (
        <FeatureShell title="My Profile" onBack={onBack}>
            <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white/80 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                    <img src="https://picsum.photos/100" alt="avatar" className="w-24 h-24 rounded-full object-cover border-4 border-green-400 shadow-lg mb-4"/>
                    <h3 className="text-2xl font-bold text-gray-800">Aarav Sharma</h3>
                    <div className="mt-4 w-full flex justify-around">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">{t.leaderboard}</p>
                            <p className="text-2xl font-bold text-[#2E7D32]">#{stats.rank}</p>
                        </div>
                         <div className="text-center">
                            <p className="text-sm text-gray-500">{t.streak}</p>
                            <p className="text-2xl font-bold text-[#FBC02D]">🔥 {stats.streak}</p>
                        </div>
                    </div>
                </div>

                {/* Adopted Pet Section */}
                {adoptedPet && (
                    <div className="bg-white/80 p-4 rounded-xl shadow-md">
                        <h4 className="font-bold text-lg mb-2 text-gray-700">My Companion</h4>
                        <div className="flex items-center space-x-4">
                             <div className="text-6xl">{adoptedPet.icon}</div>
                            <div className="flex-1">
                                <p className="font-bold text-xl text-[#8D6E63]">{adoptedPet.name}</p>
                                <div className="space-y-1 mt-1">
                                    <div>
                                        <span className="text-sm">🍖 Hunger</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-orange-400 h-2.5 rounded-full" style={{ width: `${adoptedPet.hunger}%` }}></div></div>
                                    </div>
                                    <div>
                                        <span className="text-sm">💧 Thirst</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${adoptedPet.thirst}%` }}></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Badges Section */}
                <div className="bg-white/80 p-4 rounded-xl shadow-md">
                    <h4 className="font-bold text-lg mb-3 text-gray-700">My Badges ({earnedBadges.length})</h4>
                    <div className="flex flex-wrap gap-4">
                        {earnedBadges.map(badge => (
                             <div key={badge.name} className="text-center">
                                <div className="text-5xl bg-green-100 p-3 rounded-full">{badge.icon}</div>
                                <p className="text-xs mt-1 font-semibold text-gray-600">{badge.name}</p>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </FeatureShell>
    );
};