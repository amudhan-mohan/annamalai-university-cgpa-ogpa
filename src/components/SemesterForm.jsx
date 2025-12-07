import React, { useEffect, useState } from "react";
import { calcGPA, truncate2, format2 } from "../utils/math.js";
import { PlusIcon, TrashIcon, CalculatorIcon } from "./Icons.jsx";

export default function SemesterForm({ semester, updateSemester }) {
  if (!semester) return null;

  const [subjects, setSubjects] = useState(semester.subjects || []);

  useEffect(() => {
    const gpa = calcCGPA(subjects);
    updateSemester({ ...semester, subjects, gpa });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects]);

  // Safe ID generator
  const makeId = () =>
    (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : String(Date.now() + Math.random());

  const addSubject = () => {
    const newSubject = { id: makeId(), name: "", credits: "", hours: "" };
    setSubjects((prev = []) => [...prev, newSubject]);
  };

  const updateSubject = (id, field, value) => {
    setSubjects((prev = []) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleNumberInput = (e, id, field) => {
    const value = e.target.value;

    // Allow empty input
    if (value === '') {
      updateSubject(id, field, '');
      return;
    }

    // Improved regex to allow decimal numbers
    const validNumber = /^-?\d*\.?\d*$/.test(value);
    if (validNumber) {
      updateSubject(id, field, value);
    }
  };

  const handleNumberBlur = (e, id, field) => {
    const value = e.target.value;

    // If empty, leave as empty
    if (value === '') return;

    // Ensure non-negative and format properly
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (numValue < 0) {
        updateSubject(id, field, '0');
      } else {
        // Format to 2 decimal places
        const formattedValue = numValue.toFixed(2);
        updateSubject(id, field, formattedValue);
      }
    } else {
      // If invalid, clear the field
      updateSubject(id, field, '');
    }
  };

  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter, decimal point
    if ([46, 8, 9, 27, 13, 110, 190].includes(e.keyCode) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }

    // Ensure that it is a number or decimal point
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode !== 190 && e.keyCode !== 110) {
      e.preventDefault();
    }
  };

  const deleteSubject = (id) => {
    setSubjects((prev = []) => prev.filter((s) => s.id !== id));
  };

  const completedSubjects = subjects.filter(sub => Number(sub.credits) > 0).length;
  const totalSubjects = subjects.length;
  const progressPercentage = totalSubjects > 0 ? (completedSubjects / totalSubjects) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      {subjects.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{completedSubjects}/{totalSubjects} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Subjects List */}
      <div className="space-y-4">
        {subjects.map((s, idx) => {
          const hasCredits = Number(s.credits) > 0;
          const isReappear = Number(s.credits) === 0 && s.credits !== "";

          return (
            <div
              key={s.id}
              className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border transition-all duration-200 ${hasCredits
                  ? 'border-green-200 shadow-sm'
                  : isReappear
                    ? 'border-red-200 shadow-sm'
                    : 'border-gray-200/60 hover:border-gray-300'
                }`}
            >
              <div className="flex items-start gap-4">
                {/* Subject Number */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${hasCredits
                    ? 'bg-green-100 text-green-700'
                    : isReappear
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                  <span className="text-sm font-semibold">{idx + 1}</span>
                </div>

                {/* Input Fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Subject Name */}
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Subject Name
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      placeholder={`Enter subject name`}
                      value={s.name}
                      onChange={(e) => updateSubject(s.id, "name", e.target.value)}
                    />
                  </div>

                  {/* Credit Hours */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Hours
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={s.hours}
                      onChange={(e) => handleNumberInput(e, s.id, "hours")}
                      onBlur={(e) => handleNumberBlur(e, s.id, "hours")}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  {/* Credits */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Credits
                    </label>
                    <input
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors ${isReappear
                          ? 'border-red-300 bg-red-50'
                          : hasCredits
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-300'
                        }`}
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={s.credits}
                      onChange={(e) => handleNumberInput(e, s.id, "credits")}
                      onBlur={(e) => handleNumberBlur(e, s.id, "credits")}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  {/* Delete Button */}
                  <div className="sm:col-span-1 flex items-end justify-end sm:justify-start">
                    <button
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      onClick={() => deleteSubject(s.id)}
                      title="Delete subject"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-3 flex items-center gap-2">
                {hasCredits && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    Completed
                  </span>
                )}
                {isReappear && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    Reappear
                  </span>
                )}
                {!s.name && (
                  <span className="text-xs text-gray-500">Enter subject details</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Subject Button */}
      <button
        onClick={addSubject}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50/50 transition-all duration-200 group"
      >
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-brand-100 flex items-center justify-center transition-colors">
          <PlusIcon className="w-4 h-4 text-gray-500 group-hover:text-brand-600" />
        </div>
        <span className="font-medium">Add New Subject</span>
      </button>

      {/* GPA Display */}
      <div className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
              <CalculatorIcon className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Semester GPA</h3>
              <p className="text-sm text-gray-600">Automatically calculated from subjects</p>
            </div>
          </div>

          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${semester.gpa === null
              ? 'bg-red-50 border border-red-200'
              : 'bg-green-50 border border-green-200'
            }`}>
            {semester.gpa === null ? (
              <>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-red-600">!</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">Reappear Required</p>
                  <p className="text-xs text-red-600">Complete all subjects</p>
                </div>
              </>
            ) : (
              <>


                <div className="text-2xl font-bold text-green-800">
                  {typeof semester.gpa === "number" ? format2(semester.gpa) : "0.00"}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-700">Current GPA</p>
                  <p className="text-xs text-green-600">{completedSubjects} subjects completed</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-blue-600">i</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 text-sm mb-1">How it works</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Enter values from 0 to any positive number</li>
              <li>• Use decimal point for fractional values (e.g., 1.5, 3.75)</li>
              <li>• Set credits to 0 for reappear subjects</li>
              <li>• GPA updates automatically as you enter data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}