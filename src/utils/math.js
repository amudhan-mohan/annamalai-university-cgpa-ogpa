// Annamalai University's Formula:
// GPA = Sum of Credit Points / Sum of Credit Hours
// OGPA = Sum of GPA / Total Number of GPA

export function calcGPA(subjects) {
  if (!subjects || subjects.length === 0) return 0;

  // If any subject has credits = 0 → mark as reappear
  const hasReappear = subjects.some(
    (s) => Number(s.credits) === 0 && s.credits !== ""
  );
  if (hasReappear) {
    return null; // null means reappear
  }

  // Calculate sum of credit points and sum of credit hours
  let sumCreditPoints = 0;
  let sumCreditHours = 0;
  let hasValidSubjects = false;

  subjects.forEach((subject) => {
    const creditPoints = Number(subject.credits) || 0;
    const creditHours = Number(subject.hours) || 0;

    // Only include subjects that have both credit points and credit hours
    if (creditPoints > 0 && creditHours > 0) {
      sumCreditPoints += creditPoints;
      sumCreditHours += creditHours;
      hasValidSubjects = true;
    }
  });

  // Avoid division by zero
  if (sumCreditHours === 0 || !hasValidSubjects) return 0;

  // GPA = Sum of Credit Points / Sum of Credit Hours
  const rawGPA = sumCreditPoints / sumCreditHours;

  return truncate2(rawGPA);
}

export function calcOGPA(semesters) {
  if (!semesters || semesters.length === 0) return 0;

  // Filter out semesters with reappear (null GPA) and get valid GPAs
  const validGPAs = semesters
    .filter(
      (semester) =>
        semester.gpa !== null &&
        typeof semester.gpa === "number" &&
        semester.gpa > 0
    )
    .map((semester) => semester.gpa);

  // If no valid GPAs, return 0
  if (validGPAs.length === 0) return 0;

  // Calculate sum of all GPAs
  const sumGPA = validGPAs.reduce((total, gpa) => total + gpa, 0);
  const ogpa = sumGPA / validGPAs.length;

  return truncate2(ogpa);
}

// ===============================
// Formatting Helper
// ===============================

// Always print with 2 decimals (like %.2f in C)
export function format2(x) {
  return (Number(x) || 0).toFixed(2);
}

// Truncate to 2 decimal places
export function truncate2(x) {
  const num = Number(x) || 0;
  return Math.floor(num * 100) / 100;
}