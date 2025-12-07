import React from "react";
import { Link } from "react-router-dom";

export default function StatsPage({ semesters }) {
  // Sort semesters in ascending order by their numeric value
  const sortedSemesters = [...semesters].sort((a, b) => {
    const numA = parseInt(a.name.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.name.replace(/\D/g, ""), 10) || 0;
    return numA - numB;
  });

  const completedSemesters = sortedSemesters.filter(s => s.gpa !== null && s.gpa > 0);
  const totalCredits = completedSemesters.reduce((sum, sem) =>
    sum + (sem.subjects?.reduce((subSum, sub) => subSum + Number(sub.credits), 0) || 0), 0
  );
  const totalHours = completedSemesters.reduce((sum, sem) =>
    sum + (sem.subjects?.reduce((subSum, sub) => subSum + Number(sub.hours), 0) || 0), 0
  );
  const averageGPA = completedSemesters.length > 0
    ? completedSemesters.reduce((sum, sem) => sum + sem.gpa, 0) / completedSemesters.length
    : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="w-10 h-10 rounded-xl border border-gray-300 bg-white/80 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Statistics</h1>
          <p className="text-gray-600">Overview of your academic performance</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{completedSemesters.length}</p>
            <p className="text-xs text-gray-500">Completed Semesters</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{totalCredits.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Total Credits</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{totalHours.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Total Hours</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{averageGPA.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Avg GPA</p>
          </div>
        </div>
      </div>

      {/* Semester Progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Semester Performance</h3>
        <div className="space-y-4">
          {sortedSemesters.map((sem) => (
            <div key={sem.id} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{sem.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${sem.gpa === null
                  ? 'bg-red-100 text-red-700'
                  : sem.gpa >= 8
                    ? 'bg-green-100 text-green-700'
                    : sem.gpa >= 6
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                }`}>
                {sem.gpa === null ? 'Reappear' : `${sem.gpa.toFixed(2)} GPA`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}