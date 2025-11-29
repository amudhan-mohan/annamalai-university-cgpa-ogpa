import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, ChartIcon, ChevronRightIcon, CalendarIcon, ClockIcon } from "./Icons.jsx";
import { store } from "../utils/storage.js";
import { format2 } from "../utils/math.js";

export default function SemesterList({ semesters, setSemesters }) {


  const deleteSemester = (id) => {
    const next = semesters.filter((s) => s.id !== id);
    setSemesters(next);
    store.saveSemesters(next);
  };

  // Sort semesters by their numeric suffix
  const sortedSemesters = [...semesters].sort((a, b) => {
    const numA = parseInt(a.name.replace(/\D/g, ""), 10);
    const numB = parseInt(b.name.replace(/\D/g, ""), 10);
    return numA - numB;
  });

  const getSemesterStats = (semester) => {
    const totalSubjects = semester.subjects?.length || 0;
    const completedSubjects = semester.subjects?.filter(sub => Number(sub.credits) > 0).length || 0;
    const totalCredits = semester.subjects?.reduce((sum, sub) => sum + Number(sub.credits), 0) || 0;
    const totalHours = semester.subjects?.reduce((sum, sub) => sum + Number(sub.hours), 0) || 0;

    return { totalSubjects, completedSubjects, totalCredits, totalHours };
  };

  const getPerformanceColor = (cgpa) => {
    if (cgpa === null) return "red";
    if (cgpa >= 8.5) return "green";
    if (cgpa >= 7.0) return "blue";
    if (cgpa >= 5.0) return "yellow";
    return "orange";
  };

  const getPerformanceLabel = (cgpa) => {
    if (cgpa === null) return "Reappear";
    if (cgpa >= 8.5) return "Excellent";
    if (cgpa >= 7.0) return "Good";
    if (cgpa >= 5.0) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-4">
      {sortedSemesters.map((sem) => {
        const { totalSubjects, completedSubjects, totalCredits, totalHours } = getSemesterStats(sem);
        const performanceColor = getPerformanceColor(sem.cgpa);
        const performanceLabel = getPerformanceLabel(sem.cgpa);

        const colorClasses = {
          green: "bg-green-50 border-green-200 text-green-700",
          blue: "bg-blue-50 border-blue-200 text-blue-700",
          yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
          orange: "bg-orange-50 border-orange-200 text-orange-700",
          red: "bg-red-50 border-red-200 text-red-700"
        };

        return (
          <div
            key={sem.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Semester Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25">
                      <CalendarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{sem.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses[performanceColor]}`}>
                          <div className={`w-1.5 h-1.5 rounded-full bg-${performanceColor}-500`}></div>
                          {performanceLabel}
                        </span>
                        {sem.cgpa !== null && (
                          <span className="text-sm text-gray-600">
                            {typeof sem.cgpa === "number" ? format2(sem.cgpa) : "0.00"} CGPA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Subjects Count */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ChartIcon className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-600">
                        {completedSubjects}/{totalSubjects} subjects
                      </span>
                    </div>

                    <div className="w-px h-4 bg-gray-300"></div>

                    {/* Credit Hours */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                        <ClockIcon className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-600">
                        {totalHours.toFixed(1)} hours
                      </span>
                    </div>

                    <div className="w-px h-4 bg-gray-300"></div>

                    {/* Total Credits */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">C</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {totalCredits.toFixed(1)} credits
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {totalSubjects > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Completion</span>
                        <span>{Math.round((completedSubjects / totalSubjects) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
                          style={{ width: `${(completedSubjects / totalSubjects) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/semester/${sem.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <span>Manage</span>
                    <ChevronRightIcon className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => deleteSemester(sem.id)}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-200 transition-all duration-200"
                    title="Delete semester"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}