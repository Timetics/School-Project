import React, { useEffect, useState } from 'react';
import BackgroundImage from '../components/BackgroundImage';

const ClassicStudentDashboard: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString('en-GB');
      const time = now.toLocaleTimeString('en-US');
      setDateTime(`${date} | ${time}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-4">
          <img src="https://eschool.mayar-schools.com/images/logo.png" alt="Mayar Logo" className="h-10" />
          <div>
            <div className="text-lg font-semibold text-gray-800">student</div>
            <div className="text-xs text-gray-500">Mayar International Schools</div>
            <div className="text-xs text-gray-400">Second Semester (01/02/2025 - 31/07/2025)</div>
          </div>
        </div>
        <div className="text-xs text-gray-700 font-medium">{dateTime}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-700">Ayesha Fahim Memon</span>
          <span className="text-gray-400"><i className="lucide lucide-settings-2" /></span>
          <span className="text-xs text-gray-700">عربي</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-row">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 min-h-full">
          <nav className="space-y-2">
            <div className="font-bold text-gray-700 mb-2">Dashboard</div>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>School Messages</li>
              <li>Student Affairs</li>
              <li>Academic Affairs</li>
              <li>Marks Report</li>
              <li>Tickets</li>
              <li>LMS</li>
              <li>List Virtual Classrooms</li>
              <li>Platforms</li>
              <li>Mail</li>
            </ul>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <section className="flex-1 p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg bg-gray-800 text-white p-4 flex flex-col items-center">
              <div className="text-xs mb-2">New Mail</div>
              <div className="text-2xl font-bold">4</div>
            </div>
            <div className="rounded-lg bg-cyan-600 text-white p-4 flex flex-col items-center">
              <div className="text-xs mb-2">Class Works</div>
              <div className="text-2xl font-bold">381</div>
            </div>
            <div className="rounded-lg bg-pink-600 text-white p-4 flex flex-col items-center">
              <div className="text-xs mb-2">Available Homeworks</div>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div className="rounded-lg bg-blue-900 text-white p-4 flex flex-col items-center">
              <div className="text-xs mb-2">School Notifications</div>
              <div className="text-2xl font-bold">0</div>
            </div>
          </div>

          {/* Timetable */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-gray-700">Timetable</div>
              <div className="flex gap-2">
                <button className="px-4 py-1 rounded bg-cyan-600 text-white text-xs font-medium">Daily Schedule</button>
                <button className="px-4 py-1 rounded bg-white text-cyan-600 border border-cyan-600 text-xs font-medium">Weekly Schedule</button>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm py-8">No data found for today</div>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="font-semibold text-gray-700 mb-4">Subjects</div>
            <div className="grid grid-cols-5 gap-4">
              {['Islamic Education','Arabic Language','English Language','Mathematics','Social and National Education','Science','Art Education','Physical Education','Computer Studies','French Language'].map((subject) => (
                <div key={subject} className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 h-32">
                  <div className="mb-2 text-gray-400 text-xs">IMAGE NOT AVAILABLE</div>
                  <div className="text-xs text-gray-700 text-center font-medium">{subject}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClassicStudentDashboard;
