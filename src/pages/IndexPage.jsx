import React from "react";
import SemesterList from "../components/SemesterList.jsx";
import { calcOGPA, truncate2, format2 } from "../utils/math.js";



export default function IndexPage({ semesters, setSemesters }) {

  // Debug: Log when component renders
  console.log('🎯 IndexPage rendering with', semesters.length, 'semesters');
  console.log('🎯 Semester names:', semesters.map(s => s.name));


  // Collect reappear subjects per semester
  const reappearDetails = semesters
    .filter((s) => s.cgpa === null)
    .map((s) => ({
      name: s.name,
      subjects: s.subjects
        .filter((sub) => Number(sub.credits) === 0)
        .map((sub) => sub.name || "Unnamed Subject")
    }));

  const hasReappear = reappearDetails.length > 0;
  const ogpa = hasReappear
    ? null
    : truncate2(calcOGPA(semesters));

  const completedSemesters = semesters.filter(s => s.cgpa !== null && s.cgpa > 0);
  const averageCGPA = completedSemesters.length > 0
    ? truncate2(completedSemesters.reduce((sum, sem) => sum + sem.cgpa, 0) / completedSemesters.length)
    : 0;

  const addSemester = () => {
    const nextIndex = semesters.length + 1;
    const newSem = {
      id: crypto.randomUUID(),
      name: `Semester ${nextIndex}`,
      subjects: [],
      cgpa: 0
    };
    setSemesters([newSem, ...semesters]);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Overview Cards */}
      {semesters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Semesters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{semesters.length}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>

          {/* Completed Semesters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedSemesters.length}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>

          {/* Average CGPA */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{format2(averageCGPA)}</p>
                <p className="text-xs text-gray-500">Avg CGPA</p>
              </div>
            </div>
          </div>

          {/* Overall OGPA */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {hasReappear ? "—" : format2(ogpa)}
                </p>
                <p className="text-xs text-gray-500">Overall OGPA</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Semester Overview</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your semesters and track your academic progress
          </p>
        </div>
        <button
          onClick={addSemester}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Semester
        </button>
      </div>

      {/* Semester List */}
      <SemesterList semesters={semesters} setSemesters={setSemesters} />


      {/* OGPA Card */}
      {semesters.length > 0 && (
        <div className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Academic Performance</h3>
              <p className="text-sm text-gray-600">
                Your Overall Grade Point Average (OGPA) is calculated from all completed semesters.
              </p>
            </div>

            {hasReappear ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 lg:max-w-md">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 text-sm mb-2">Reappear Required</h4>
                    <div className="space-y-2">
                      {[...reappearDetails]
                        .sort((a, b) => {
                          const numA = parseInt(a.name.replace(/\D/g, ""), 10) || 0;
                          const numB = parseInt(b.name.replace(/\D/g, ""), 10) || 0;
                          return numA - numB;
                        })
                        .map((sem) => (
                          <div key={sem.name} className="text-xs text-red-700">
                            <span className="font-medium">{sem.name}:</span> {sem.subjects.join(", ")}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white text-xl font-bold">{format2(ogpa)}</span>
                  </div>
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-green-500 to-green-600 opacity-20 blur-sm"></div>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-3">Overall OGPA</p>

                {ogpa > 8 && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-yellow-500/25">
                    <span>🎉</span>
                    Distinction Achieved
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {semesters.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No semesters yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first semester to start tracking your academic performance and calculate your CGPA.
            </p>
            <button
              onClick={addSemester}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Semester
            </button>
          </div>
        </div>
      )}

      {/* Formula Explanation Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/60 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Calculation Formula</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CGPA Formula */}
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-800 text-sm">Semester CGPA</h4>
                <div className="bg-white/80 rounded-xl p-4 border border-blue-200">
                  <div className="text-center text-sm text-blue-900 font-mono">
                    <div>Sum of Credit Points</div>
                    <div className="border-t border-blue-300 my-1"></div>
                    <div>Sum of Credit Hours</div>
                  </div>
                  <div className="mt-2 text-xs text-blue-700 space-y-1">
                    <div>• Credit Points = Grade × Credit Hours</div>
                    <div>• Reappear if any subject has 0 credits</div>
                  </div>
                </div>
              </div>

              {/* OGPA Formula */}
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-800 text-sm">Overall OGPA</h4>
                <div className="bg-white/80 rounded-xl p-4 border border-blue-200">
                  <div className="text-center text-sm text-blue-900 font-mono">
                    <div>Sum of All CGPAs</div>
                    <div className="border-t border-blue-300 my-1"></div>
                    <div>Total Number of Semesters</div>
                  </div>
                  <div className="mt-2 text-xs text-blue-700 space-y-1">
                    <div>• Only completed semesters included</div>
                    <div>• Reappear semesters are excluded</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 text-xs mb-2">Example Calculation:</h5>
              <div className="text-xs text-blue-700 space-y-1">
                <div>• Subject: 4 hours × 5 grade = 20 Credit Points</div>
                <div>• Semester CGPA = Total Credit Points ÷ Total Credit Hours</div>
                <div>• OGPA = Average of all semester CGPAs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grading System Card */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/60 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14.5l-5.5 3.5 1.5-6-5-4.5 6.5-.5L12 2l2.5 5 6.5.5-5 4.5 1.5 6-5.5-3.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Annamalai University Grading System</h3>

            {/* Grading Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Marks Range Column */}
              <div className="space-y-3">
                <h4 className="font-semibold text-indigo-800 text-sm mb-2">Marks Range & Grade</h4>
                <div className="bg-white/80 rounded-xl p-4 border border-indigo-200 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">90 - 100</span>
                    <span className="font-semibold text-green-600">Grade 'S'</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">80 - 89</span>
                    <span className="font-semibold text-blue-600">Grade 'A'</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">70 - 79</span>
                    <span className="font-semibold text-blue-500">Grade 'B'</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">60 - 69</span>
                    <span className="font-semibold text-cyan-600">Grade 'C'</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">55 - 59</span>
                    <span className="font-semibold text-yellow-600">Grade 'D'</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">50 - 54</span>
                    <span className="font-semibold text-orange-600">Grade 'E'</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Below 50</span>
                    <span className="font-semibold text-red-600">Grade 'RA'</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Withdrawn</span>
                    <span className="font-semibold text-gray-600">Grade 'W'</span>
                  </div>
                </div>
              </div>

              {/* Grade Points Column */}
              <div className="space-y-3">
                <h4 className="font-semibold text-indigo-800 text-sm mb-2">Grade Points</h4>
                <div className="bg-white/80 rounded-xl p-4 border border-indigo-200 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Grade S</span>
                    <span className="font-semibold text-green-600">10 Points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Grade A</span>
                    <span className="font-semibold text-blue-600">9 Points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Grade B</span>
                    <span className="font-semibold text-blue-500">8 Points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Grade C</span>
                    <span className="font-semibold text-cyan-600">7 Points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Grade D</span>
                    <span className="font-semibold text-yellow-600">6 Points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Grade E</span>
                    <span className="font-semibold text-orange-600">5 Points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-700">Grade RA</span>
                    <span className="font-semibold text-red-600">0 Points</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculation Note */}
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-indigo-200">
              <h5 className="font-semibold text-indigo-800 text-xs mb-1">How to Calculate Credit Points:</h5>
              <p className="text-xs text-indigo-700">
                Credit Points = Grade Point × Credit Hours
              </p>
              <p className="text-xs text-indigo-600 mt-1">
                Example: Grade 'A' (9 points) × 4 credit hours = 36 credit points
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CGPA Growth Strategy Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/60 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">How to Grow Your CGPA & OGPA</h3>

            {/* Credit Hours Strategy */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h4 className="font-semibold text-emerald-800 text-sm">Credit Hours Strategy</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* High Impact Subjects */}
                <div className="bg-white/80 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="font-semibold text-emerald-800">High Impact (4 & 3 credits)</span>
                  </div>
                  <ul className="text-xs text-emerald-700 space-y-1">
                    <li>• Core theory subjects</li>
                    <li>• Maximum weight on CGPA</li>
                    <li>• Focus on getting S/A grades</li>
                    <li>• 1 point improvement = +0.25 CGPA boost</li>
                  </ul>
                </div>

                {/* Medium Impact Subjects */}
                <div className="bg-white/80 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="font-semibold text-emerald-800">Medium Impact (2 & 1 credits)</span>
                  </div>
                  <ul className="text-xs text-emerald-700 space-y-1">
                    <li>• Electives & minor subjects</li>
                    <li>• Moderate weight on CGPA</li>
                    <li>• Maintain B+ grades or better</li>
                    <li>• Good for consistency</li>
                  </ul>
                </div>
              </div>

              {/* Lab Subjects */}
              <div className="mt-3 bg-white/80 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-semibold text-emerald-800">Lab Subjects (1.5 credits)</span>
                </div>
                <ul className="text-xs text-emerald-700 space-y-1">
                  <li>• Practical/laboratory courses</li>
                  <li>• Easier to score high grades</li>
                  <li>• Perfect for boosting CGPA</li>
                  <li>• Aim for S grades consistently</li>
                </ul>
              </div>
            </div>

            {/* Growth Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CGPA Growth */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 className="font-semibold text-emerald-800 text-sm">CGPA Growth Strategy</h4>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-emerald-200 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-700">Priority 1:</span>
                    <span className="font-semibold text-red-600">4-credit subjects</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-700">Priority 2:</span>
                    <span className="font-semibold text-orange-600">3-credit subjects</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-700">Priority 3:</span>
                    <span className="font-semibold text-blue-600">1.5-credit labs</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-700">Priority 4:</span>
                    <span className="font-semibold text-gray-600">1 & 2-credit subjects</span>
                  </div>
                </div>
              </div>

              {/* OGPA Strategy */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <h4 className="font-semibold text-emerald-800 text-sm">OGPA Growth Strategy</h4>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-emerald-200 space-y-2">
                  <div className="text-sm text-emerald-700">
                    • <span className="font-semibold">Consistency</span> across all semesters
                  </div>
                  <div className="text-sm text-emerald-700">
                    • Avoid <span className="font-semibold">reappears</span> at all costs
                  </div>
                  <div className="text-sm text-emerald-700">
                    • <span className="font-semibold">Early semesters</span> set the base
                  </div>
                  <div className="text-sm text-emerald-700">
                    • <span className="font-semibold">Later semesters</span> can recover OGPA
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Calculation Examples */}
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h5 className="font-semibold text-emerald-800 text-xs">Quick Impact Calculation</h5>
              </div>
              <div className="text-xs text-emerald-700 space-y-1">
                <div>• Improving 4-credit subject from B→A: +7 points × 4 hours = <span className="font-semibold">+28 credit points</span></div>
                <div>• Improving 3-credit subject from C→B: +5 point × 3 hours = <span className="font-semibold">+15 credit points</span></div>
                <div>• Perfect lab (1.5 credits): S grade = <span className="font-semibold">15 credit points</span></div>
              </div>
            </div>

            {/* Action Plan */}
            <div className="mt-4 p-3 bg-emerald-100/50 rounded-lg border border-emerald-300">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h5 className="font-semibold text-emerald-800 text-xs">Your Action Plan</h5>
              </div>
              <ol className="text-xs text-emerald-800 space-y-1">
                <li>1. <span className="font-semibold">Focus on 4 & 3 credit subjects first</span></li>
                <li>2. <span className="font-semibold">Aim for S/A grades in labs</span> (easy boost)</li>
                <li>3. <span className="font-semibold">Maintain consistency</span> across all semesters</li>
                <li>4. <span className="font-semibold">Never get reappear</span> (zeros destroy CGPA)</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}