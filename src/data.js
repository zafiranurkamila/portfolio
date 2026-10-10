// =====================================================================
//  KONTEN PORTFOLIO (2 bahasa: ID default + EN)
//  Data dari CV, LinkedIn, & GitHub (github.com/zafiranurkamila)
// =====================================================================

export const profile = {
  name: 'Zafira Nur Kamila',
  role: 'Mahasiswa Informatika · Tertarik di QA Engineering',
  roleEn: 'Informatics Student · Interested in QA Engineering',
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

// ——— Panggung "Sedang Dikerjakan" ———
// Repo yang terakhir di-push diambil otomatis dari GitHub.
// Tambahkan catatan di sini kalau mau judul/deskripsi khusus untuk repo tertentu.
export const repoNotes = {
  'pvc-localization-cnn': {
    title: 'Tugas Akhir',
    titleEn: 'Final Project (Thesis)',
    desc: 'Membandingkan fitur Higher-Order Statistics, Wavelet, dan Power Spectrum Density dalam model CNN untuk lokalisasi PVC (RVOT vs LVOT) dari sinyal EKG 12-lead.',
    descEn: 'Comparing Higher-Order Statistics, Wavelet, and Power Spectrum Density features in a CNN model to localize PVC origin (RVOT vs LVOT) from 12-lead ECG signals.',
    points: [
      'Data 329 pasien, 1.767 beat PVC, split per pasien',
      '8 skenario fitur, 5-fold CV per pasien + multi-seed',
      'Model utama PSD+Wavelet: Macro F1 0,876 di data test',
      'XAI (permutation importance & SHAP) untuk menjelaskan model',
    ],
    pointsEn: [
      '329 patients, 1,767 PVC beats, patient-level split',
      '8 feature scenarios, patient-level 5-fold CV + multi-seed',
      'Main model PSD+Wavelet: Macro F1 0.876 on the test set',
      'XAI (permutation importance & SHAP) to explain the model',
    ],
    tags: 'Python · PyTorch · CNN · Signal Processing · XAI',
  },
}

// Dipakai kalau GitHub tidak bisa diakses
export const repoFallback = [
  {
    name: 'pvc-localization-cnn',
    description: 'PVC localization with CNN',
    language: 'Python',
    url: 'https://github.com/zafiranurkamila/pvc-localization-cnn',
    pushedAt: '2026-10-07T14:03:37Z',
    topics: [],
  },
]

// ——— String UI 2 bahasa ———
export const UI = {
  id: {
    role: profile.role,
    stations: ['Panggung', 'Tentang', 'Pendidikan', 'Teknologi', 'Proyek', 'Perjalanan', 'Kontak'],
    bubbles: ['Hai, aku Zafira!', 'Ini sedikit tentangku!', 'Ini pendidikanku!', 'Ini teknologiku!', 'Lihat proyekku!', 'Perjalananku!', 'Yuk ngobrol!'],
    hint: 'Klik tanah untuk jalan · WASD/panah · klik bangunan untuk masuk · drag kiri memutar, drag kanan menggeser, scroll untuk zoom',
    hintTouch: 'Ketuk tanah untuk jalan · geser 1 jari untuk melihat-lihat · cubit 2 jari untuk zoom · ketuk bangunan untuk masuk',
    enter: 'Masuk',
    loading: 'Dunianya sudah siap!',
    waitTitle: 'Tunggu sebentar ya',
    loadingSub: 'Portofolioku lagi disiapkan · Getting my portfolio ready',
    chatWelcome: 'Hai! Selamat datang di desaku. Ajak aku jalan-jalan dan masuk ke tiap bangunan, ya!',
    chatTip: 'Tips: tekan angka 1–7, klik aku, dan cari 3 mini game di pojok desa!',
    advTitle: 'Pencapaian didapat!',
    advVisit: 'Mengunjungi',
    advAll: 'Penjelajah Sejati',
    stats: 'Statistik',
    awards: 'Penghargaan',
    certs: 'Sertifikasi',
    education: 'Pendidikan',
    page: 'Halaman',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    openRepo: 'Buka di GitHub',
    contactLead: 'Punya proyek atau mau kolaborasi? Yuk ngobrol.',
    sound: 'Suara',
    on: 'Nyala',
    off: 'Mati',
    close: 'Tutup',
    start: 'Mulai',
    music: 'Musik',
    // sapaan saat bangun, mengikuti mode waktu (jam pengunjung)
    wakeText: {
      pagi: 'Hoaam... pagi! Yuk mulai!',
      sore: 'Hoaam... ketiduran sampai sore! Yuk mulai!',
      malam: 'Hoaam... udah malam, tapi masih semangat! Yuk mulai!',
    },
    exploreText: 'Waktunya eksplor!',
    homeLabel: 'Rumah Zafira',
    timeLabel: 'Ganti waktu',
    times: { pagi: 'Pagi', sore: 'Sore', malam: 'Malam' },
    q: {
      title: 'Quest',
      tab1: 'Tahap 1',
      tab2: 'Tahap 2',
      explore: 'JELAJAHI DESA',
      games: 'MAIN DI TIAP POJOK',
      visit: 'Kunjungi',
      play: 'Mainkan',
      talk: 'Ngobrol dengan warga',
      done: 'Quest selesai!',
      stageDone: 'Tahap 1 selesai!',
      suggest: 'Desa sudah kamu jelajahi! Sekarang main game di setiap pojok duniaku.',
      lockedGames: 'Selesaikan tahap 1 untuk membuka quest berikutnya.',
      allDone: 'Semua quest selesai. Kamu sudah kenal seluruh duniaku!',
      where: { game_mine: 'Pojok tenggara', game_memory: 'Pojok barat daya', game_slime: 'Pojok barat laut' },
      finalText: 'Terima kasih sudah menjelajahi seluruh duniaku! Kalau mau ngobrol atau kolaborasi, mampir ke pondok Kontak ya.',
      thanks: 'Sama-sama',
    },
    villagers: [
      { name: 'Pak Tani', lines: ['Halo! Gandumku di sebelah barat lagi bagus-bagusnya.', 'Kalau mau lihat proyek Zafira, mampir ke galeri batu besar.', 'Sudah coba game Pukul Slime di pojok barat laut? Seru!'] },
      { name: 'Mbak Pustakawan', lines: ['Perpustakaan menyimpan cerita pendidikan Zafira.', 'Sertifikatnya juga ada di sana, lho.', 'Ssst... jangan berisik di perpustakaan ya!'] },
      { name: 'Mas Teknisi', lines: ['Bengkelku penuh alat. Di sana ada daftar teknologi yang Zafira kuasai.', 'Python, Java, Laravel, React... lengkap!', 'Coba Tambang di pojok tenggara, cari berliannya!'] },
      { name: 'Kak Pengelana', lines: ['Dari atas menara, kelihatan semua perjalanan Zafira.', 'Tiap tahun ada ceritanya sendiri.', 'Papan di panggung tengah selalu menampilkan proyek terbarunya.'] },
      { name: 'Bu Pandai Besi', lines: ['Hari ini panas, tungkuku menyala terus!', 'Mau ngobrol sama Zafira? Pondok biru itu tempat kontaknya.', 'Kios belang merah-putih punya game Memori Blok.'] },
      { name: 'Mas Kurir', lines: ['Aku antar surat ke pondok pos biru tiap hari.', 'Zafira lagi sibuk sama Tugas Akhirnya, tuh.', 'Tekan angka 1–7 kalau mau jalan cepat ke tiap bangunan.'] },
      { name: 'Mbak Peneliti', lines: ['Aku lagi baca soal sinyal EKG, mirip penelitian Zafira!', 'Katanya dia tertarik jadi QA Engineer. Teliti banget orangnya.', 'Selamat menjelajah!'] },
    ],
    play: 'Main',
    games: { game_mine: '⛏ Tambang', game_memory: '🃏 Memori Blok', game_slime: '🟩 Pukul Slime' },
    g: {
      play: 'Mulai main',
      again: 'Main lagi',
      time: 'Waktu',
      score: 'Skor',
      best: 'Terbaik',
      moves: 'Langkah',
      timeUp: 'WAKTU HABIS!',
      win: 'SEMUA COCOK!',
      mineHelp: 'Ketuk blok untuk menambang. Bijih yang lebih langka butuh lebih banyak ketukan tapi poinnya besar. Kamu punya 30 detik!',
      memoryHelp: 'Buka dua kartu, cari pasangan blok yang sama. Selesaikan dengan langkah sesedikit mungkin.',
      slimeHelp: 'Ketuk slime yang muncul dari lubang sebelum dia sembunyi lagi. Makin lama makin cepat!',
    },
    nowTitle: 'Sedang Dikerjakan',
    nowLead: 'Proyek yang paling baru aku kerjakan, diambil langsung dari GitHub.',
    updated: 'Terakhir diperbarui',
    recent: 'Repo lain yang baru diperbarui',
    clickDetail: 'Klik untuk detail',
    readPaper: 'Klik kertasnya untuk membaca',
    leave: 'Keluar',
    skip: 'Lewati',
    tapNext: 'Klik untuk lanjut',
    explore: 'Yuk, jelajahi duniaku!',
    introTitle: 'PERKENALAN',
    intro: [
      'Hai! Aku Zafira Nur Kamila.',
      'Aku mahasiswa Informatika di Telkom University, Bandung.',
      'Sekarang aku tertarik berkarier sebagai QA Engineer, memastikan aplikasi berjalan lancar sebelum dipakai pengguna.',
      'Di desa ini, tiap bangunan menyimpan ceritaku: proyek, perjalanan, sampai cara menghubungiku.',
    ],
  },
  en: {
    role: profile.roleEn,
    stations: ['Stage', 'About', 'Education', 'Tech', 'Work', 'Journey', 'Contact'],
    bubbles: ["Hai, I'm Zafira!", 'A little about me!', 'My education!', 'My tech stack!', 'Check my projects!', 'My journey!', "Let's connect!"],
    hint: 'Click the ground to walk · WASD/arrows · click a building to enter · left-drag rotates, right-drag pans, scroll to zoom',
    hintTouch: 'Tap the ground to walk · drag with one finger to look around · pinch to zoom · tap a building to enter',
    enter: 'Enter',
    loading: 'Building world',
    loadingSub: 'Placing blocks...',
    chatWelcome: 'Hi! Welcome to my village. Walk me around and step into each building!',
    chatTip: 'Tip: press keys 1–7, click me, and find 3 mini games at the village corners!',
    advTitle: 'Advancement made!',
    advVisit: 'Visited',
    advAll: 'True Explorer',
    stats: 'Stats',
    awards: 'Awards',
    certs: 'Certifications',
    education: 'Education',
    page: 'Page',
    prev: 'Previous',
    next: 'Next',
    openRepo: 'Open on GitHub',
    contactLead: "Got a project or want to collaborate? Let's talk.",
    sound: 'Sound',
    on: 'On',
    off: 'Off',
    close: 'Close',
    start: 'Start',
    music: 'Music',
    wakeText: {
      pagi: "Yawn... good morning! Let's go!",
      sore: "Yawn... I napped till the afternoon! Let's go!",
      malam: "Yawn... it's already night, but I'm still up for it! Let's go!",
    },
    exploreText: 'Time to explore!',
    homeLabel: "Zafira's Home",
    timeLabel: 'Change time of day',
    times: { pagi: 'Morning', sore: 'Evening', malam: 'Night' },
    q: {
      title: 'Quests',
      tab1: 'Stage 1',
      tab2: 'Stage 2',
      explore: 'EXPLORE THE VILLAGE',
      games: 'PLAY IN EVERY CORNER',
      visit: 'Visit',
      play: 'Play',
      talk: 'Talk to a villager',
      done: 'Quest complete!',
      stageDone: 'Stage 1 complete!',
      suggest: "You've explored the village! Now play the games in every corner of my world.",
      lockedGames: 'Finish stage 1 to unlock the next quests.',
      allDone: "All quests done. You've seen my whole world!",
      where: { game_mine: 'South-east corner', game_memory: 'South-west corner', game_slime: 'North-west corner' },
      finalText: 'Thanks for exploring my whole world! Want to chat or collaborate? Drop by the Contact cottage.',
      thanks: "You're welcome",
    },
    villagers: [
      { name: 'Farmer Joe', lines: ['Hello! My wheat to the west is looking great.', "Want to see Zafira's projects? Visit the big stone gallery.", 'Tried Whack-a-Slime in the north-west corner yet? So fun!'] },
      { name: 'The Librarian', lines: ["The library keeps Zafira's education story.", 'Her certifications are in there too.', 'Shh... please keep it quiet in the library!'] },
      { name: 'The Mechanic', lines: ["My workshop is full of tools, plus Zafira's tech stack.", 'Python, Java, Laravel, React... all of it!', 'Try the Mine in the south-east corner and find the diamonds!'] },
      { name: 'The Wanderer', lines: ["From the top of the tower you can see Zafira's whole journey.", 'Every year has its own story.', 'The board on the central stage always shows her latest project.'] },
      { name: 'The Smith', lines: ['Hot day today, my furnace never stops!', 'Want to reach Zafira? The blue cottage is where to find her contacts.', 'The red-and-white stall has the Block Memory game.'] },
      { name: 'The Courier', lines: ['I deliver letters to the blue post cottage every day.', "Zafira's busy with her final project right now.", 'Press keys 1–7 to walk quickly to each building.'] },
      { name: 'The Researcher', lines: ["I'm reading about ECG signals, just like Zafira's research!", "She says she's interested in becoming a QA Engineer. Very detail-oriented.", 'Happy exploring!'] },
    ],
    play: 'Play',
    games: { game_mine: '⛏ Mine', game_memory: '🃏 Block Memory', game_slime: '🟩 Whack-a-Slime' },
    g: {
      play: 'Start game',
      again: 'Play again',
      time: 'Time',
      score: 'Score',
      best: 'Best',
      moves: 'Moves',
      timeUp: "TIME'S UP!",
      win: 'ALL MATCHED!',
      mineHelp: 'Tap blocks to mine them. Rarer ores take more taps but score more. You have 30 seconds!',
      memoryHelp: 'Flip two cards and find matching blocks. Finish in as few moves as you can.',
      slimeHelp: 'Tap the slime popping out of the holes before it hides again. It gets faster!',
    },
    nowTitle: 'Currently Working On',
    nowLead: "The project I've been working on most recently, pulled live from GitHub.",
    updated: 'Last updated',
    recent: 'Other recently updated repos',
    clickDetail: 'Click for details',
    readPaper: 'Click the paper to read',
    leave: 'Leave',
    skip: 'Skip',
    tapNext: 'Click to continue',
    explore: "Let's explore my world!",
    introTitle: 'INTRODUCTION',
    intro: [
      "Hi! I'm Zafira Nur Kamila.",
      "I'm an Informatics student at Telkom University, Bandung.",
      "Right now I'm interested in a career as a QA Engineer, making sure apps run smoothly before people use them.",
      'In this village, every building holds a piece of my story: projects, journey, and how to reach me.',
    ],
  },
}
