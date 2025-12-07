import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import SemesterPage from "./pages/SemesterPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import { store } from "./utils/storage.js";

export default function App() {
  // Single state declaration with debugging
  const [semesters, setSemesters] = useState(() => {
    const loaded = store.loadSemesters();
    console.log('🚀 App initialized with:', loaded.length, 'semesters');
    return loaded;
  });

  // Single useEffect for saving
  useEffect(() => {
    console.log('💾 Semesters changed - saving:', semesters.length, 'semesters');
    store.saveSemesters(semesters);
  }, [semesters]);

  // Debug useEffect
  useEffect(() => {
    console.log('🔄 App semesters state updated:', semesters.length, 'semesters');
    console.log('📊 Semester names:', semesters.map(s => s.name));
  }, [semesters]);

  return (
    <>
      {/* Modern Header with Glass Morphism */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Animated Logo */}
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25">
                  <span className="text-white font-bold text-lg">AU</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 opacity-20 blur-sm"></div>
              </div>

              {/* App Info */}
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Annamalai University GPA & OGPA Calculator
                </h1>
              </div>
            </div>

            {/* Desktop Navigation & Stats Badge */}
            <div className="flex items-center gap-4">
              {/* Desktop Stats Link - Hidden on mobile */}
              <Link
                to="/stats"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100/80 transition-colors"
              >
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Statistics
              </Link>

              {/* Stats Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100/80 border border-gray-200/60">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {semesters?.length || 0} Semesters
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Enhanced Spacing */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <div className="min-h-[calc(100vh-200px)]">
          <Routes>
            <Route
              path="/"
              element={
                <IndexPage
                  semesters={semesters}
                  setSemesters={setSemesters}
                />
              }
            />
            <Route
              path="/semester/:id"
              element={
                <SemesterPage
                  semesters={semesters}
                  setSemesters={setSemesters}
                />
              }
            />
            <Route
              path="/stats"
              element={
                <StatsPage
                  semesters={semesters}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-gray-200/60 bg-white/50 backdrop-blur-lg mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600 font-medium">
                © {new Date().getFullYear()} Annamalai University GPA & OGPA Calculator
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Built with React + Tailwind CSS
              </p>
            </div>

            {/* Developer Info & Tech Stack */}
            <div className="text-center">
              {/* Developer Credit */}
              <div className="mb-2">
                <p className="text-xs text-gray-600">
                  Designed & Developed by{" "}
                  <a
                    href="https://github.com/amudhan-mohan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                  >
                    Amudhan Mohan
                  </a>
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Offline Support
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  Local Storage
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Mobile Friendly
                </div>
              </div>
            </div>
          </div>

          {/* Storage Info */}
          <div className="mt-4 pt-4 border-t border-gray-200/40 text-center">
            <p className="text-xs text-gray-500">
              Your data is securely stored in your browser and works offline once loaded.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 sm:hidden z-40">
        <div className="flex items-center justify-around py-3">
          <Link
            to="/"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100/50"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Home</span>
          </Link>

          <Link
            to="/stats"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100/50"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Stats</span>
          </Link>
        </div>
      </nav>

      {/* Add padding for mobile bottom nav */}
      <div className="pb-16 sm:pb-0"></div>
    </>
  );
}