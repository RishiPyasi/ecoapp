import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LeafIcon, ChartBarIcon, BookOpenIcon, CheckCircleIcon, UsersIcon, TrophyIcon } from './Icons';

interface TeacherDashboardProps {
  t: Record<string, string>;
}

// Mock Data
const studentActivityData = [
  { name: 'Mon', active: 40, completed: 24 },
  { name: 'Tue', active: 30, completed: 13 },
  { name: 'Wed', active: 20, completed: 48 },
  { name: 'Thu', active: 27, completed: 39 },
  { name: 'Fri', active: 18, completed: 28 },
  { name: 'Sat', active: 23, completed: 38 },
  { name: 'Sun', active: 34, completed: 43 },
];

const leaderboardData = [
    { rank: 1, name: 'Aarav Sharma', points: 1250, streak: 12 },
    { rank: 2, name: 'Saanvi Patel', points: 1100, streak: 10 },
    { rank: 3, name: 'Vivaan Singh', points: 980, streak: 15 },
    { rank: 4, name: 'Myra Gupta', points: 950, streak: 8 },
    { rank: 5, name: 'Reyansh Kumar', points: 800, streak: 5 },
];

const submissionsData = [
    { id: 1, studentName: 'Diya Joshi', challengeTitle: 'Waste Segregation Photo', date: '2024-07-20' },
    { id: 2, studentName: 'Kabir Verma', challengeTitle: 'Plant a Sapling Video', date: '2024-07-19' },
    { id: 3, studentName: 'Anika Reddy', challengeTitle: 'DIY Recycled Craft', date: '2024-07-19' },
];

// Sub-components for each tab view
const DashboardView: React.FC<{t: Record<string, string>}> = ({t}) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.analytics}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow"><p className="text-gray-500">Total Students</p><p className="text-3xl font-bold text-[#2E7D32]">120</p></div>
            <div className="bg-white p-4 rounded-lg shadow"><p className="text-gray-500">Avg. Eco Points</p><p className="text-3xl font-bold text-[#FBC02D]">780</p></div>
            <div className="bg-white p-4 rounded-lg shadow"><p className="text-gray-500">Daily Active Students</p><p className="text-3xl font-bold text-[#29B6F6]">85%</p></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">{t.studentActivity} (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" fill="#29B6F6" name="Active Students" />
                    <Bar dataKey="completed" fill="#2E7D32" name="Challenges Completed" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const LeaderboardView: React.FC<{t: Record<string, string>}> = ({t}) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.leaderboard}</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Rank</th>
                        <th scope="col" className="px-6 py-3">Student Name</th>
                        <th scope="col" className="px-6 py-3">Eco Points</th>
                        <th scope="col" className="px-6 py-3">Streak</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map(student => (
                        <tr key={student.rank} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-bold text-gray-900">{student.rank}</td>
                            <td className="px-6 py-4">{student.name}</td>
                            <td className="px-6 py-4 text-green-600 font-semibold">{student.points}</td>
                            <td className="px-6 py-4 text-yellow-500 font-semibold">🔥 {student.streak}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ManageContentView: React.FC<{t: Record<string, string>}> = ({t}) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.manageContent}</h2>
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">{t.createChallenge}</h3>
                <form className="space-y-4">
                     <input type="text" placeholder="Challenge Title" className="w-full p-2 border rounded"/>
                     <textarea placeholder="Description" className="w-full p-2 border rounded"></textarea>
                     <input type="number" placeholder="Eco Points" className="w-full p-2 border rounded"/>
                     <button type="submit" className="px-4 py-2 bg-[#2E7D32] text-white rounded hover:bg-green-700">{t.createChallenge}</button>
                </form>
            </div>
             <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">{t.uploadLesson}</h3>
                <input type="file" className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            </div>
        </div>
    </div>
);

const VerifySubmissionsView: React.FC<{t: Record<string, string>}> = ({t}) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.verifySubmissions}</h2>
        <div className="bg-white rounded-lg shadow space-y-4 p-4">
            {submissionsData.map(submission => (
                <div key={submission.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p className="font-bold">{submission.challengeTitle}</p>
                        <p className="text-sm text-gray-600">By: {submission.studentName} on {submission.date}</p>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                        <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">Approve</button>
                        <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">Reject</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Main Teacher Dashboard Component
const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ t }) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', name: t.dashboard, icon: <ChartBarIcon className="w-5 h-5 mr-2"/> },
        { id: 'leaderboard', name: t.leaderboard, icon: <TrophyIcon className="w-5 h-5 mr-2"/> },
        { id: 'manage', name: t.manageContent, icon: <BookOpenIcon className="w-5 h-5 mr-2"/> },
        { id: 'verify', name: t.verifySubmissions, icon: <CheckCircleIcon className="w-5 h-5 mr-2"/> },
        { id: 'roles', name: t.assignRoles, icon: <UsersIcon className="w-5 h-5 mr-2"/> },
    ];
    
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardView t={t} />;
            case 'leaderboard': return <LeaderboardView t={t}/>;
            case 'manage': return <ManageContentView t={t}/>;
            case 'verify': return <VerifySubmissionsView t={t}/>;
            case 'roles': return <div className="bg-white p-6 rounded-lg shadow"><p className="text-gray-500">Role assignment UI placeholder.</p></div>;
            default: return <DashboardView t={t} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <LeafIcon className="h-8 w-8 text-green-600"/>
                        <h1 className="text-2xl font-bold text-gray-800 ml-2">{t.appTitle} - {t.teacher}</h1>
                    </div>
                    <button className="w-12 h-12 bg-gray-200 rounded-full">
                         <img src="https://picsum.photos/101" alt="teacher avatar" className="w-full h-full rounded-full object-cover"/>
                    </button>
                </div>
            </header>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row md:space-x-6">
                    <aside className="md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
                        <nav className="space-y-2">
                             {tabs.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${activeTab === tab.id ? 'bg-[#2E7D32] text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                                    {tab.icon} {tab.name}
                                </button>
                             ))}
                        </nav>
                    </aside>
                    <main className="flex-1">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;