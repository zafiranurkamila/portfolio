// =====================================================================
//  KONTEN PORTFOLIO (2 bahasa: ID default + EN)
//  Data dari CV, LinkedIn, & GitHub (github.com/zafiranurkamila)
// =====================================================================

export const profile = {
  name: 'Zafira Nur Kamila',
  role: 'Web & AI Developer · Mahasiswa Informatika',
  roleEn: 'Web & AI Developer · Informatics Student',
  location: 'Bandung, Indonesia',
  email: 'zafiranurkamila@gmail.com',
  github: 'https://github.com/zafiranurkamila',
  linkedin: 'https://www.linkedin.com/in/zafiranurkamila',
  photo: '/images/profile.jpeg',
  summary:
    'Individu yang berorientasi pada teknologi dengan latar belakang pendidikan vokasi di bidang teknik jaringan dan akses telekomunikasi, serta saat ini sedang menempuh studi di bidang Informatika. Memiliki keahlian dalam analisis data (Excel tingkat lanjut), perangkat CRM, pengembangan *front-end* (HTML, CSS, JavaScript), desain UI, pemrograman *back-end* (PHP & MySQL), pengembangan web berbasis AI, serta mahir dalam pemrograman Java dan Golang. Memiliki semangat tinggi untuk menerapkan teknologi dalam memecahkan masalah nyata dan meningkatkan pengalaman pengguna.',
  summaryEn:
    'Tech-driven individual with a vocational background in network engineering and telecommunications access, currently pursuing a degree in Informatics. Skilled in data analysis (Advanced Excel), CRM tools, front-end development (HTML, CSS, JavaScript), UI design, back-end programming (PHP & MySQL), web development using AI, and proficient in Java and Golang programming. Passionate about applying technology to solve real-world problems and enhance user experience.',
}

export const stats = [
  { n: 30, suffix: '+', label: 'Repository GitHub', labelEn: 'GitHub repos' },
  { n: 3, suffix: '', label: 'Juara kompetisi', labelEn: 'Competition wins' },
  { n: 5, suffix: '+', label: 'Sertifikasi', labelEn: 'Certifications' },
]

export const projects = [
  {
    idx: '01',
    name: 'Woundify',
    desc: 'Aplikasi digital health full-stack untuk mendeteksi bakteri & menilai risiko infeksi luka diabetes. Memakai klasifikasi RandomForest, Gemini Vision OCR, dan pemetaan wabah epidemiologi.',
    descEn: 'Full-stack digital health app to detect bacteria & assess diabetic wound infection risk. Uses RandomForest classification, Gemini Vision OCR, and epidemiological outbreak mapping.',
    tags: 'Flutter · Spring Boot · FastAPI · ML',
    image: '/images/woundify.jfif',
    link: 'https://github.com/zafiranurkamila/woundify',
  },
  {
    idx: '02',
    name: 'Finansialin',
    desc: 'Aplikasi web manajemen keuangan personal. Front-end React + TypeScript dengan back-end Laravel dan REST API.',
    descEn: 'Personal finance management web app. React + TypeScript front-end with a Laravel back-end and REST API.',
    tags: 'React · TypeScript · Laravel · MySQL',
    image: '/images/finansialin2.jfif',
    link: 'https://github.com/zafiranurkamila/finansialin-frontend',
  },
  {
    idx: '03',
    name: 'Booqu',
    desc: 'Platform buku full-stack dengan RESTful API. Back-end Java Spring Boot dan front-end JavaScript.',
    descEn: 'Full-stack book platform with a RESTful API. Java Spring Boot back-end and JavaScript front-end.',
    tags: 'Java · Spring Boot · REST API',
    image: '/images/booqu.jfif',
    link: 'https://github.com/zafiranurkamila/booqu-spring-restful-api',
  },
  {
    idx: '04',
    name: 'Smoking Detection',
    desc: 'Model deteksi rokok secara real-time menggunakan YOLOv8. Proyek computer vision berbasis deep learning.',
    descEn: 'Real-time cigarette detection model using YOLOv8. A deep-learning computer vision project.',
    tags: 'Python · YOLOv8 · Computer Vision',
    image: '/images/smoking-detection.jpg',
    link: 'https://github.com/zafiranurkamila/smoking-detection-yolov8',
  },
  {
    idx: '05',
    name: 'PVC Localization CNN',
    desc: 'Model deep learning berbasis Convolutional Neural Network untuk tugas lokalisasi. Dibangun dengan Python.',
    descEn: 'Deep-learning model based on a Convolutional Neural Network for localization tasks. Built with Python.',
    tags: 'Python · CNN · Deep Learning',
    image: '/images/pvc-cnn.png',
    link: 'https://github.com/zafiranurkamila/pvc-localization-cnn',
  },
  {
    idx: '06',
    name: 'TeluCup',
    desc: 'Back-end sistem untuk platform event/turnamen kampus. Dibangun dengan Laravel dan Blade.',
    descEn: 'Back-end system for a campus event/tournament platform. Built with Laravel and Blade.',
    tags: 'Laravel · Blade · MySQL',
    image: '/images/telucup.png',
    link: 'https://github.com/zafiranurkamila/telucup-backend',
  },
]

export const skills = [
  'Python', 'Java', 'Golang', 'C++', 'JavaScript', 'TypeScript',
  'React', 'HTML / CSS', 'PHP', 'Laravel', 'Spring Boot', 'MySQL',
  'Machine Learning', 'Computer Vision', 'UI/UX · Figma', 'MikroTik',
]

// Tech stack + logo (logo sudah disediakan di public/images/tech/)
export const tech = [
  { name: 'Python', logo: 'python' },
  { name: 'Java', emoji: '☕' },
  { name: 'Golang', logo: 'go' },
  { name: 'C++', logo: 'cplusplus' },
  { name: 'JavaScript', logo: 'javascript' },
  { name: 'TypeScript', logo: 'typescript' },
  { name: 'React', logo: 'react' },
  { name: 'HTML / CSS', logo: 'html5' },
  { name: 'PHP', logo: 'php' },
  { name: 'Laravel', logo: 'laravel' },
  { name: 'Spring Boot', logo: 'springboot' },
  { name: 'MySQL', logo: 'mysql' },
  { name: 'Machine Learning', emoji: '🧠' },
  { name: 'Computer Vision', emoji: '👁️' },
  { name: 'UI/UX · Figma', logo: 'figma' },
  { name: 'MikroTik', logo: 'mikrotik' },
]

export const journey = [
  {
    year: '2020',
    items: [
      { type: 'edu', text: 'Mulai SMK Telkom Sidoarjo — Teknik Jaringan Akses Telekomunikasi', textEn: 'Started SMK Telkom Sidoarjo — Telecom Access Network Engineering' },
    ],
  },
  {
    year: '2022',
    items: [
      { type: 'award', text: 'Juara 1 — Playbox Season 2 Start-Up Competition', textEn: '1st Place — Playbox Season 2 Start-Up Competition' },
      { type: 'award', text: 'Juara 3 — Business Plan Ganesha Business Fest (ITB)', textEn: '3rd Place — Business Plan, Ganesha Business Fest (ITB)' },
      { type: 'work', text: 'Vector Designer — Biro Reklame Surabaya', textEn: 'Vector Designer — Biro Reklame Surabaya' },
      { type: 'work', text: 'Intern Sales & Marketing — PLN Icon Plus', textEn: 'Sales & Marketing Intern — PLN Icon Plus' },
    ],
  },
  {
    year: '2023',
    items: [
      { type: 'edu', text: 'Lulus SMK → Masuk Telkom University (S1 Informatika)', textEn: 'Graduated → Enrolled at Telkom University (Informatics)' },
      { type: 'cert', text: 'MTCNA — MikroTik Certified Network Associate', textEn: 'MTCNA — MikroTik Certified Network Associate' },
    ],
  },
  {
    year: '2024',
    items: [
      { type: 'cert', text: 'Sertifikasi Web Development with AI', textEn: 'Web Development with AI certification' },
      { type: 'work', text: 'Mental Health Relationship — Tim Budi Pekerti Tel-U', textEn: 'Mental Health Relationship — Tim Budi Pekerti Tel-U' },
    ],
  },
  {
    year: '2025',
    items: [
      { type: 'award', text: 'Juara 1 — VISIONARY: Computer Vision Challenge (Digistar)', textEn: '1st Place — VISIONARY: Computer Vision Challenge (Digistar)' },
      { type: 'project', text: 'Woundify — aplikasi AI kesehatan (Clinical Microbiology)', textEn: 'Woundify — AI health app (Clinical Microbiology)' },
      { type: 'work', text: 'Operating Officer — Community Support Center Tel-U', textEn: 'Operating Officer — Community Support Center Tel-U' },
    ],
  },
  {
    year: '2026',
    items: [
      { type: 'work', text: 'Intern IT Digital Platforms — XLSMART', textEn: 'IT Digital Platforms Intern — XLSMART' },
      { type: 'cert', text: 'Microsoft Azure AI Fundamentals (AI-900)', textEn: 'Microsoft Azure AI Fundamentals (AI-900)' },
      { type: 'project', text: 'Community Contributor AI Engineer — Dicoding', textEn: 'AI Engineer Community Contributor — Dicoding' },
    ],
  },
]

export const achievements = [
  { place: 'Juara 1', placeEn: '1st Place', title: 'VISIONARY: Innovation through Computer Vision', org: 'Digistar Club, Telkom University · 2025' },
  { place: 'Juara 1', placeEn: '1st Place', title: 'Playbox Season 2 Student Start-Up Competition', org: 'Institut Teknologi Telkom Surabaya · 2022' },
  { place: 'Juara 3', placeEn: '3rd Place', title: 'Business Plan Competition (Ganesha Business Fest)', org: 'Institut Teknologi Bandung · 2022' },
]

export const certifications = [
  'Microsoft Azure AI Fundamentals (AI-900)',
  'Belajar Dasar Cloud & Gen AI di AWS — Dicoding',
  'Web Development with AI',
  'MTCNA — MikroTik Certified Network Associate',
]

// ——— Pendidikan ———
export const education = [
  {
    school: 'Telkom University',
    degree: 'S1 Teknik Informatika',
    degreeEn: 'B.Sc. Informatics Engineering',
    period: '2023 — Sekarang',
    periodEn: '2023 — Present',
    emoji: '🎓',
  },
  {
    school: 'SMK Telkom Sidoarjo',
    degree: 'Teknik Jaringan Akses Telekomunikasi',
    degreeEn: 'Telecom Access Network Engineering',
    period: '2020 — 2023',
    periodEn: '2020 — 2023',
    emoji: '🏫',
  },
]

// ——— String UI 2 bahasa ———
export const UI = {
  id: {
    role: profile.role,
    hint: '◀ ▶ / panah keyboard buat jalan · Spasi buat loncat',
    bubble: 'Hai, aku Zafira!',
    voice: 'Hai, aku Zafira, seorang web dan AI developer!',
    signAbout: 'TENTANG SAYA',
    signEducation: 'PENDIDIKAN',
    signTech: 'TEKNOLOGI',
    signWork: 'PROYEK SAYA',
    signJourney: 'PERJALANAN',
    signContact: 'KONTAK',
    stations: ['Beranda', 'Tentang', 'Pendidikan', 'Teknologi', 'Proyek', 'Perjalanan', 'Kontak'],
    bubbles: ['Hai, aku Zafira!', 'Hai, aku Zafira!', 'Ini pendidikanku!', 'Ini teknologiku!', 'Lihat proyekku!', 'Perjalananku!', 'Yuk ngobrol!'],
    certsLabel: 'sertifikasi',
    awardsLabel: 'penghargaan',
    welcome: 'SELAMAT DATANG',
    farewell: 'SAMPAI JUMPA!',
  },
  en: {
    role: profile.roleEn,
    hint: '◀ ▶ / arrow keys to walk · Space to jump',
    bubble: "Hai, I'm Zafira!",
    voice: "Hai, I'm Zafira, a web and AI developer!",
    signAbout: 'ABOUT ME',
    signEducation: 'EDUCATION',
    signTech: 'TECH STACK',
    signWork: 'MY PROJECTS',
    signJourney: 'MY JOURNEY',
    signContact: "LET'S TALK",
    stations: ['Home', 'About', 'Education', 'Tech', 'Work', 'Journey', 'Contact'],
    bubbles: ["Hai, I'm Zafira!", "Hai, I'm Zafira!", 'My education!', 'My tech stack!', 'Check my projects!', 'My journey!', "Let's connect!"],
    certsLabel: 'certifications',
    awardsLabel: 'awards',
    welcome: 'WELCOME',
    farewell: 'SEE YOU!',
  },
}
