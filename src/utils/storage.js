// Enhanced storage with size management
const STORAGE_KEY = "cgpa_semesters_data";

// Calculate approximate size of data
function getDataSize(obj) {
  return new Blob([JSON.stringify(obj)]).size;
}

// Clean up old data if needed
function cleanupData(semesters) {

  return semesters.map(semester => ({
    id: semester.id,
    name: semester.name,
    subjects: semester.subjects,
    cgpa: semester.cgpa
  }));
}

export const store = {
  saveSemesters: (semesters) => {
    try {
      console.log('Saving semesters to storage:', semesters.length);

      if (!Array.isArray(semesters)) {
        console.error('Invalid semesters data');
        return;
      }

      // Clean up data to reduce size
      const cleanData = cleanupData(semesters);
      const data = JSON.stringify(cleanData);
      const dataSize = getDataSize(cleanData);

      console.log('Data size:', dataSize, 'bytes');

      // Check if data is too large for localStorage (~5MB limit)
      if (dataSize > 4 * 1024 * 1024) { // 4MB warning
        console.warn('Data size approaching localStorage limit');
      }

      // Try localStorage first
      try {
        localStorage.setItem(STORAGE_KEY, data);
        console.log('Successfully saved to localStorage');

        // Verify the save worked
        const verify = localStorage.getItem(STORAGE_KEY);
        if (!verify) {
          throw new Error('LocalStorage verification failed');
        }

      } catch (lsError) {
        console.error('LocalStorage save failed:', lsError);

        // If localStorage fails, try to save partial data
        if (semesters.length > 3) {
          console.warn('Saving only first 3 semesters due to size limits');
          const limitedData = cleanupData(semesters.slice(0, 3));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedData));
        }

        return;
      }

      // Also try cookie as backup (for small data)
      try {
        if (data.length < 4000) {
          const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
          document.cookie = `${STORAGE_KEY}=${encodeURIComponent(data)}; expires=${expires}; path=/`;
        }
      } catch (cookieError) {
        console.warn('Cookie storage failed:', cookieError);
      }

    } catch (error) {
      console.error('Save failed completely:', error);
    }
  },

  loadSemesters: () => {
    try {
      console.log('Loading semesters from storage...');

      // Try localStorage first
      try {
        const lsData = localStorage.getItem(STORAGE_KEY);
        if (lsData) {
          const parsed = JSON.parse(lsData);
          console.log('Loaded from localStorage:', parsed.length, 'semesters');
          return Array.isArray(parsed) ? parsed : [];
        }
      } catch (lsError) {
        console.warn('localStorage load failed:', lsError);
      }

      // Try sessionStorage
      try {
        const ssData = sessionStorage.getItem(STORAGE_KEY);
        if (ssData) {
          const parsed = JSON.parse(ssData);
          console.log('Loaded from sessionStorage:', parsed.length, 'semesters');
          return Array.isArray(parsed) ? parsed : [];
        }
      } catch (ssError) {
        console.warn('sessionStorage load failed:', ssError);
      }

      console.log('No semesters found in storage');
      return [];

    } catch (error) {
      console.error('Load failed completely:', error);
      return [];
    }
  },

  // Get storage information
  getStorageInfo: () => {
    try {
      const lsData = localStorage.getItem(STORAGE_KEY);
      return {
        semesterCount: lsData ? JSON.parse(lsData).length : 0,
        dataSize: lsData ? lsData.length : 0,
        storageUsed: lsData ? new Blob([lsData]).size : 0
      };
    } catch (error) {
      return { error: error.message };
    }
  },

  clearStorage: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
      document.cookie = `${STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    } catch (error) {
      console.error('Clear storage failed:', error);
    }
  }
};