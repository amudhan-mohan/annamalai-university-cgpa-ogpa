# 🎓 Annamalai University CGPA & OGPA Calculator

A modern, mobile-first Progressive Web App (PWA) designed specifically for Annamalai University students to calculate, track, and optimize their academic performance. This tool provides real-time GPA (Grade Point Average) and OGPA (Overall Grade Point Average) calculations with a beautiful, intuitive interface that works seamlessly across all devices — online or offline.

## 🎯 Why This Tool?

Traditional GPA calculators are often clunky, confusing, and not tailored to Annamalai University's specific grading system. Our calculator addresses these pain points by providing:

- **University-specific accuracy** - Precisely follows Annamalai University's grading scale and calculation formulas
- **Intuitive visual design** - Clear progress tracking with color-coded performance indicators
- **Offline reliability** - Works without internet connection once loaded
- **Privacy-focused** - All data stays locally in your browser, never sent to servers
- **Progressive Web App** - Install as a native app on any device for instant access

## 🚀 Key Benefits

### For Students:
- **Instant calculations** - See GPA updates as you enter subject details
- **Academic planning** - Understand how each subject impacts your overall performance
- **Goal tracking** - Set and monitor GPA improvement targets
- **Reappear prevention** - Get immediate alerts about incomplete subjects

### For Better Academic Management:
- **Semester organization** - Manage multiple semesters in one place
- **Progress visualization** - Charts and stats show your academic journey
- **Strategic insights** - Learn which subjects have the biggest impact on your GPA
- **Mobile convenience** - Access your academic data anywhere, anytime

## 🔍 Perfect For:
- **Current students** tracking ongoing semester performance
- **Final year students** calculating overall graduation OGPA
- **Academic planners** strategizing subject selection for maximum GPA impact
- **University alumni** documenting their academic history
- **Academic advisors** helping students understand grade impacts

Built with modern web technologies and designed specifically for the Annamalai University ecosystem, this calculator combines precision engineering with beautiful user experience to make academic tracking effortless and insightful.

## ✨ Features

### 📱 Modern & Responsive Design
- **Mobile-first approach** with touch-friendly interface
- **Glass morphism effects** and gradient backgrounds
- **Dark/light mode ready** (white theme)
- **PWA support** - Install as a native app
- **Offline functionality** - Works without internet

### 📊 Academic Features
- **Semester-wise GPA calculation** using Annamalai University's formula
- **Overall OGPA calculation** across all completed semesters
- **Real-time calculations** as you enter data
- **Reappear tracking** - Automatically detects incomplete subjects
- **Academic statistics** dashboard with progress tracking
- **Grading system reference** (S, A, B, C, D, E, RA grades)

### 🛠️ Technical Features
- **Local storage** - Data saved in browser (cookies + localStorage fallback)
- **No backend required** - 100% client-side processing
- **Fast & lightweight** - Built with React and Tailwind CSS
- **SEO optimized** with proper meta tags and sitemap
- **Cross-browser compatible**

## 🚀 Live Demo

[🔗 Live Application URL](https://amudhan-mohan.github.io/annamalai-university-cgpa-ogpa/)

## 📸 Screenshots

### 🏠 Home Page
<div align="center">

| Home Page |
|-----------|
| ![Home](/screenshots/home.png) |

</div>

### 📚 Semester Management
<div align="center">

| Semester Management |
|---------------------|
| ![Semester](/screenshots/semester.png) |
</div>

### 📊 Statistics Dashboard
<div align="center">

| Statistics Dashboard |
|----------------------|
| ![Stats](/screenshots/statistics.png) |

</div>


## 📖 How to Use

### 1. **Create a Semester**
- Click "Create Semester" button on the home page
- Semester will be automatically numbered (Semester 1, Semester 2, etc.)

### 2. **Add Subjects**
- Click "Manage" on any semester
- Add subjects with:
  - **Subject Name** (e.g., "Mathematics 1")
  - **Credit Hours** (4, 3, 2, 1.5, 1)
  - **Credits Earned** (based on your grade)

### 3. **Calculate GPA**
- GPA is calculated automatically as: **GPA** = Sum of Credit Points ÷ Sum of Credit Hours

- **Credit Points** = Grade Point × Credit Hours
- If any subject has 0 credits, the semester is marked as "Reappear"

### 4. **Track Overall Performance**
- **OGPA** is calculated automatically from all completed semesters
- **Statistics page** shows academic progress overview
- **Progress bars** show completion percentage for each semester

## 🎯 Grading System (Annamalai University)

<div align="center">

| Marks Range | Grade | Grade Points |
|-------------|-------|--------------|
| 90 - 100    | S     | 10           |
| 80 - 89     | A     | 9            |
| 70 - 79     | B     | 8            |
| 60 - 69     | C     | 7            |
| 55 - 59     | D     | 6            |
| 50 - 54     | E     | 5            |
| Below 50    | RA    | 0            |
| Withdrawn   | W     | -            |

</div>

## 📈 GPA Growth Strategy

### Priority Order for Maximum Impact:
1. **4-credit subjects** - Highest weight, focus most effort here
2. **3-credit subjects** - Second highest impact on GPA
3. **1.5-credit labs** - Easier to score high, great for boosting
4. **2 & 1-credit subjects** - Lower priority, maintain decent grades

### Quick Impact Examples:
- Improving 4-credit subject from B→A: +9 points × 4 hours = **+36 credit points**
- Improving 3-credit subject from C→B: +8 point × 3 hours = **+24 credit points**
- Perfect lab (1.5 credits): S grade = **15 credit points**

## 💻 Installation & Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/amudhan-mohan/annamalai-university-cgpa-ogpa.git

# Navigate to project directory
cd annamalai-university-cgpa-ogpa

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

```

## 📁 Project Structure

```
.
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.svg
│   ├── manifest.json
│   ├── robots.txt
│   ├── service-worker.js
│   └── sitemap.xml
├── src
│   ├── App.jsx
│   ├── components
│   │   ├── Icons.jsx
│   │   ├── SemesterForm.jsx
│   │   └── SemesterList.jsx
│   ├── main.jsx
│   ├── pages
│   │   ├── IndexPage.jsx
│   │   ├── SemesterPage.jsx
│   │   └── StatsPage.jsx
│   ├── styles.css
│   └── utils
│       ├── math.js
│       └── storage.js
├── screenshots
│   ├── home.png
│   ├── semester.png
│   └── statistics.png
├── tailwind.config.js
├── vite.config.js
└── README.md
```
## 🛡️ Data Privacy

- **100% private** - All data stays in your browser
- **No data sent to servers** - Everything processes locally
- **Browser storage** - Uses localStorage with cookie fallback
- **Export/Import** - Coming soon feature for data backup

## 📱 PWA Installation

### Desktop:
1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Or go to Menu → "Install Annamalai University GPA & OGPA Calculator"

### Mobile:
1. Open the app in Chrome/Safari
2. Tap "Share" button
3. Select "Add to Home Screen"

## 🔧 Technical Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: Custom SVG icons
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## 📄 Formulas Used

### GPA Calculation
```javascript
GPA = Σ(Credit Points) ÷ Σ(Credit Hours)
Credit Points = Grade Point × Credit Hours
```
### OGPA Calculation
```javascript
OGPA = Σ(Semester GPAs) ÷ Number of Completed Semesters
```
## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Amudhan Mohan**  
- GitHub: [@amudhan-mohan](https://github.com/amudhan-mohan)

## 🙏 Acknowledgments

- Annamalai University
- React and Tailwind CSS communities

## 🔗 Useful Links

- [Annamalai University](https://www.annamalaiuniversity.ac.in/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Create React App Documentation](https://create-react-app.dev/)