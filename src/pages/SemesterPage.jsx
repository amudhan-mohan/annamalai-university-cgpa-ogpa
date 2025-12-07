import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SemesterForm from "../components/SemesterForm.jsx";

export default function SemesterPage({ semesters, setSemesters }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const semester = semesters.find((s) => s.id === id);

  const updateSemester = (updated) => {
    setSemesters(semesters.map((s) => (s.id === updated.id ? updated : s)));
  };

  const saveAndReturn = () => {
    navigate("/");
  };

  if (!semester) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Semester Not Found</h2>
          <p className="text-gray-600 mb-6">
            The semester you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const hasReappear = semester.cgpa === null;
  const cgpaValue = typeof semester.cgpa === "number" ? semester.cgpa.toFixed(2) : "0.00";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{semester.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage subjects and calculate your semester CGPA
            </p>
          </div>
        </div>

        {/* CGPA Badge */}
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${hasReappear
            ? 'bg-red-50 border-red-200'
            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
          } backdrop-blur-sm shadow-sm`}>
          {hasReappear ? (
            <>
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">Reappear Required</p>
                <p className="text-xs text-red-600">Complete all subjects</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Semester CGPA</p>
                <p className="text-lg font-bold text-green-800">{cgpaValue}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200/60 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">
            {semester.subjects.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total Subjects</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200/60 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">
            {semester.subjects.filter(sub => Number(sub.credits) > 0).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Completed</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200/60 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">
            {semester.subjects.filter(sub => Number(sub.credits) === 0).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Reappear</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200/60 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">
            {semester.subjects.reduce((sum, sub) => sum + Number(sub.credits), 0)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total Credits</p>
        </div>
      </div>

      {/* Semester Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-lg bg-brand-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Subject Details</h3>
        </div>
        <SemesterForm semester={semester} updateSemester={updateSemester} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200/60">
        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>

        <button
          onClick={saveAndReturn}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save & Return to Dashboard
        </button>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 text-sm mb-1">Quick Tip</h4>
            <p className="text-blue-700 text-sm">
              Set credits to 0 for reappear subjects. CGPA is automatically calculated when all subjects have credits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}