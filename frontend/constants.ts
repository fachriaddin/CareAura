import { Ingredient, TrackDetail } from './types';

export const SAFETY_KEYWORDS = [
  'dosis', 'insulin', 'obat', 'resep', 'sembuh kanker', 'takaran obat', 
  'paracetamol', 'metformin', 'amlodipin', 'diagnosa', 'penyembuhan medis', 
  'kanker', 'tumor', 'resep dokter', 'dosis obat', 'sembuh total', 'terapi medis',
  'dosage', 'prescription', 'cure cancer', 'heart medication'
];

export const SAFETY_BANNER_TEXT = {
  id: "CareAura adalah pendamping edukasi gizi umum berdasarkan panduan resmi, bukan alat diagnosis klinis. Kami tidak dapat meresepkan terapi medis atau menghitung dosis obat. Silakan kunjungi Puskesmas terdekat atau konsultasikan dengan tenaga kesehatan resmi.",
  en: "CareAura is a general nutrition education companion based on official guidelines, not a clinical diagnostic tool. We cannot prescribe medical therapies or calculate drug dosages. Please visit the nearest Puskesmas (public health center) or consult with official healthcare professionals."
};

export const LOCAL_INGREDIENTS: (lang: 'id' | 'en') => Ingredient[] = (lang) => [
  {
    id: 'ikan-kembung',
    name: 'Ikan Kembung',
    category: 'PROTEIN',
    alternativeTo: lang === 'id' ? 'Salmon Impor' : 'Imported Salmon',
    benefits: lang === 'id' 
      ? ['Tinggi Omega-3 (lebih tinggi dari Salmon)', 'Mendukung perkembangan otak anak', 'Menjaga kesehatan jantung']
      : ['High in Omega-3 (higher than Salmon)', 'Supports child brain development', 'Maintains heart health'],
    cost: lang === 'id' ? 'Murah' : 'Affordable',
    nutrients: { protein: 9, vitamins: 7, fiber: 1, omega3: 10 },
    description: lang === 'id'
      ? 'Ikan lokal yang sangat kaya akan Omega-3 dan protein berkualitas tinggi dengan harga yang sangat merakyat.'
      : 'A local fish extremely rich in Omega-3 and high-quality protein at a very affordable price.'
  },
  {
    id: 'tempe',
    name: 'Tempe',
    category: 'PROTEIN',
    alternativeTo: lang === 'id' ? 'Daging Sapi' : 'Beef',
    benefits: lang === 'id'
      ? ['Sumber protein nabati tinggi', 'Kaya serat & probiotik alami', 'Sangat baik untuk pencernaan']
      : ['High source of plant-based protein', 'Rich in fiber & natural probiotics', 'Excellent for digestion'],
    cost: lang === 'id' ? 'Sangat Murah' : 'Very Cheap',
    nutrients: { protein: 8, vitamins: 6, fiber: 8 },
    description: lang === 'id'
      ? 'Makanan super asli Indonesia hasil fermentasi kedelai yang kaya protein, serat, dan zat besi.'
      : 'An authentic Indonesian superfood made from fermented soybeans, rich in protein, fiber, and iron.'
  },
  {
    id: 'tahu',
    name: 'Tahu',
    category: 'PROTEIN',
    alternativeTo: lang === 'id' ? 'Keju / Daging Impor' : 'Imported Cheese / Meat',
    benefits: lang === 'id'
      ? ['Mudah dicerna lansia', 'Rendah lemak jenuh', 'Sumber kalsium yang baik']
      : ['Easy to digest for the elderly', 'Low in saturated fat', 'Good source of calcium'],
    cost: lang === 'id' ? 'Sangat Murah' : 'Very Cheap',
    nutrients: { protein: 7, vitamins: 5, fiber: 4 },
    description: lang === 'id'
      ? 'Protein lembut yang sangat ramah untuk pencernaan lansia dan anak-anak.'
      : 'Soft protein that is very gentle on the digestive systems of the elderly and children.'
  },
  {
    id: 'telur-ayam',
    name: 'Telur Ayam',
    category: 'PROTEIN',
    alternativeTo: lang === 'id' ? 'Daging Merah' : 'Red Meat',
    benefits: lang === 'id'
      ? ['Protein lengkap & mudah diserap', 'Kaya Kolin untuk otak janin/bayi', 'Sangat praktis diolah']
      : ['Complete & easily absorbed protein', 'Rich in Choline for fetal/infant brain', 'Highly practical to cook'],
    cost: lang === 'id' ? 'Murah' : 'Affordable',
    nutrients: { protein: 8, vitamins: 8, fiber: 1 },
    description: lang === 'id'
      ? 'Sumber protein hewani paling terjangkau dan serbaguna untuk mencegah stunting.'
      : 'The most affordable and versatile source of animal protein to prevent stunting.'
  },
  {
    id: 'daun-kelor',
    name: 'Daun Kelor',
    category: 'VEGETABLE',
    alternativeTo: lang === 'id' ? 'Kale / Bayam Jepang' : 'Kale / Japanese Spinach',
    benefits: lang === 'id'
      ? ['Superfood lokal', 'Sangat tinggi Zat Besi (cegah anemia)', 'Kaya antioksidan & Vitamin C']
      : ['Local superfood', 'Extremely high in Iron (prevents anemia)', 'Rich in antioxidants & Vitamin C'],
    cost: lang === 'id' ? 'Sangat Murah' : 'Very Cheap',
    nutrients: { protein: 5, vitamins: 10, fiber: 8, iron: 10 },
    description: lang === 'id'
      ? 'Daun ajaib yang tumbuh subur di pekarangan, memiliki nutrisi berkali-kali lipat dibanding sayuran biasa.'
      : 'A miracle leaf that grows abundantly in backyards, containing multiple times the nutrients of ordinary vegetables.'
  },
  {
    id: 'bayam',
    name: 'Bayam',
    category: 'VEGETABLE',
    alternativeTo: lang === 'id' ? 'Asparagus' : 'Asparagus',
    benefits: lang === 'id'
      ? ['Mencegah anemia pada ibu hamil', 'Tinggi asam folat', 'Menjaga kesehatan mata']
      : ['Prevents anemia in pregnant women', 'High in folic acid', 'Maintains eye health'],
    cost: lang === 'id' ? 'Sangat Murah' : 'Very Cheap',
    nutrients: { protein: 3, vitamins: 8, fiber: 6, iron: 8 },
    description: lang === 'id'
      ? 'Sayuran hijau favorit keluarga yang kaya zat besi dan sangat baik untuk pertumbuhan anak.'
      : 'A family-favorite green vegetable rich in iron and excellent for child growth.'
  },
  {
    id: 'kangkung',
    name: 'Kangkung',
    category: 'VEGETABLE',
    alternativeTo: lang === 'id' ? 'Brokoli Impor' : 'Imported Broccoli',
    benefits: lang === 'id'
      ? ['Membantu tidur lebih nyenyak', 'Kaya Vitamin A & C', 'Menjaga tekanan darah']
      : ['Helps improve sleep quality', 'Rich in Vitamins A & C', 'Maintains healthy blood pressure'],
    cost: lang === 'id' ? 'Sangat Murah' : 'Very Cheap',
    nutrients: { protein: 3, vitamins: 7, fiber: 7 },
    description: lang === 'id'
      ? 'Sayuran hijau yang sangat mudah didapat, kaya serat, dan membantu melancarkan pencernaan.'
      : 'An easily accessible green vegetable, rich in fiber, and helps smooth digestion.'
  },
  {
    id: 'singkong',
    name: 'Singkong',
    category: 'CARB',
    alternativeTo: lang === 'id' ? 'Quinoa / Gandum Impor' : 'Quinoa / Imported Wheat',
    benefits: lang === 'id'
      ? ['Bebas gluten alami', 'Energi tahan lama', 'Kaya serat pangan']
      : ['Naturally gluten-free', 'Long-lasting energy', 'Rich in dietary fiber'],
    cost: lang === 'id' ? 'Sangat Murah' : 'Very Cheap',
    nutrients: { protein: 2, vitamins: 4, fiber: 7 },
    description: lang === 'id'
      ? 'Sumber karbohidrat lokal yang memberikan energi stabil tanpa menaikkan gula darah secara drastis jika direbus.'
      : 'A local carbohydrate source that provides stable energy without drastically spiking blood sugar when boiled.'
  },
  {
    id: 'ubi-jalar',
    name: 'Ubi Jalar',
    category: 'CARB',
    alternativeTo: lang === 'id' ? 'Kentang Impor' : 'Imported Potatoes',
    benefits: lang === 'id'
      ? ['Indeks glikemik rendah (aman untuk diabetes)', 'Sangat tinggi Vitamin A (Beta-karoten)', 'Manis alami tanpa gula tambahan']
      : ['Low glycemic index (safe for diabetes)', 'Very high in Vitamin A (Beta-carotene)', 'Naturally sweet without added sugar'],
    cost: lang === 'id' ? 'Murah' : 'Affordable',
    nutrients: { protein: 2, vitamins: 9, fiber: 8 },
    description: lang === 'id'
      ? 'Pilihan karbohidrat terbaik untuk penderita diabetes tipe-2 karena tidak memicu lonjakan gula darah.'
      : 'The best carbohydrate choice for type-2 diabetes patients as it does not trigger blood sugar spikes.'
  }
];

export const TRACKS: (lang: 'id' | 'en') => TrackDetail[] = (lang) => [
  {
    id: 'CHRONIC',
    title: lang === 'id' ? 'Pencegahan Sekunder (Penyakit Kronis)' : 'Secondary Prevention (Chronic Care)',
    subtitle: 'Diabetes Tipe-2, Hipertensi, & Pasca-Stroke',
    description: lang === 'id'
      ? 'Pendampingan pola makan khusus untuk mengontrol tekanan darah dan kadar gula darah guna menekan risiko serangan susulan dalam 5 tahun.'
      : 'Tailored dietary accompaniment to control blood pressure and blood sugar levels, actively reducing 5-year disease recurrence rates.',
    icon: 'HeartPulse',
    color: 'maroon',
    quickPrompts: [
      'Bagaimana cara mengatur makan untuk penderita darah tinggi dengan bahan murah?',
      'Menu sarapan apa yang aman untuk penderita Diabetes Tipe-2 menggunakan Tempe?',
      'Makanan lokal apa yang baik untuk pemulihan pasca-stroke?'
    ]
  },
  {
    id: 'MCH',
    title: lang === 'id' ? 'Kesehatan Ibu & Anak (MCH)' : 'Maternal & Child Health (MCH)',
    subtitle: 'ASI Eksklusif, MP-ASI, & Cegah Stunting',
    description: lang === 'id'
      ? 'Panduan mikro-edukasi praktis bagi ibu hamil dan menyusui mengenai gizi seimbang, pencegahan anemia, dan tumbuh kembang balita.'
      : 'Structured micro-lessons and practical guidance for pregnant or breastfeeding mothers on balanced nutrition and stunting prevention.',
    icon: 'Baby',
    color: 'tan',
    quickPrompts: [
      'Apa makanan lokal terbaik untuk mencegah stunting pada bayi usia 8 bulan?',
      'Bagaimana cara mencegah anemia pada ibu hamil dengan sayuran murah?',
      'Tips memberikan MP-ASI pertama yang bergizi menggunakan bahan di pasar lokal.'
    ]
  },
  {
    id: 'YOUTH',
    title: lang === 'id' ? 'Pengembangan Remaja (13-18 Tahun)' : 'Youth Development (Ages 13-18)',
    subtitle: 'Kesehatan Tubuh, Gizi, & Ruang Aman',
    description: lang === 'id'
      ? 'Ruang konsultasi privat, aman, dan bebas penghakiman untuk remaja mengenai perkembangan fisik, kesehatan reproduksi, dan gizi seimbang.'
      : 'A completely safe, confidential, and non-judgmental sanctuary for adolescents to learn about physical development and nutrition.',
    icon: 'Sparkles',
    color: 'darkMaroon',
    quickPrompts: [
      'Bagaimana gizi yang baik untuk remaja yang sedang aktif berolahraga?',
      'Makanan apa yang bisa membantu mengurangi jerawat secara alami?',
      'Saya sering merasa lemas saat sekolah, makanan murah apa yang bisa menambah energi?'
    ]
  }
];

export const TRANSLATIONS = {
  id: {
    appName: "CareAura",
    companionBadge: "Pendamping Gizi",
    subTitle: "Infrastruktur Sosial Digital Preventif",
    anonymousBadge: "100% Anonim & Gratis",
    anonymousMobile: "100% Anonim, Tanpa Daftar, Tanpa Biaya",
    selectTrackTitle: "Pilih Jalur Edukasi Gizi Anda",
    selectTrackDesc: "CareAura dirancang khusus untuk mendampingi kebutuhan gizi Anda secara gratis, aman, dan sesuai dengan kondisi tubuh Anda.",
    startConsultation: "Mulai Konsultasi",
    activeTrack: "Jalur Aktif",
    changeTrack: "Ganti Jalur Edukasi",
    tabAiConsultation: "Konsultasi AI",
    tabLocalFoodMatrix: "Matriks Pangan Lokal",
    tabHealthyPlateBuilder: "Penyusun Piring Sehat",
    tabPuskesmasGuide: "Panduan Puskesmas",
    aiAssistantTitle: "Asisten Gizi CareAura",
    restartChat: "Mulai Ulang",
    faqTitle: "Pertanyaan yang sering ditanyakan:",
    listening: "Mendengarkan suara Anda...",
    inputPlaceholder: "Ketik pertanyaan Anda di sini (misal: gizi tempe)...",
    privacyNotice: "CareAura menjaga privasi Anda. Percakapan ini sepenuhnya anonim dan tidak disimpan di server kami.",
    stopVoice: "Hentikan Suara",
    listenAnswer: "Dengarkan Jawaban",
    safetyTitle: "Pemberitahuan Penting & Keselamatan",
    safetyEncouragement: "Kami sangat menyarankan Anda untuk segera menemui Kader Posyandu atau petugas kesehatan di Puskesmas terdekat untuk mendapatkan penanganan medis yang tepat dan aman. Kesehatan Anda adalah prioritas utama kami.",
    matrixTitle: "Matriks Pangan Lokal (Keadilan Finansial)",
    matrixDesc: "Kami berkomitmen pada keadilan sosial. Anda tidak perlu membeli bahan makanan impor yang mahal (seperti Salmon atau Quinoa) untuk hidup sehat. Di bawah ini adalah daftar bahan pangan lokal Indonesia yang murah, mudah didapat di pasar tradisional, namun memiliki nilai gizi yang setara atau bahkan lebih tinggi!",
    searchPlaceholder: "Cari bahan makanan...",
    all: "Semua",
    protein: "Protein",
    vegetables: "Sayuran",
    carbohydrates: "Karbohidrat",
    estimatedCost: "Estimasi Harga",
    healthyAlternative: "Alternatif Sehat Untuk",
    keyBenefits: "Manfaat Utama",
    mainNutritional: "Kandungan Nutrisi Utama",
    plateBuilderTitle: "Penyusun Piring Sehatku (Isi Piringku)",
    plateBuilderDesc: "Sesuai panduan Kementerian Kesehatan RI, piring makan yang sehat harus seimbang antara Karbohidrat, Protein, dan Sayuran. Pilih satu bahan dari setiap kategori di bawah ini untuk menyusun piring sehat Anda sendiri!",
    chooseCarb: "1. Pilih Karbohidrat Lokal",
    chooseProtein: "2. Pilih Protein Lokal",
    chooseVeg: "3. Pilih Sayuran Lokal",
    yourHealthyPlate: "Piring Sehat Anda",
    resetPlate: "Atur Ulang",
    notSelected: "Belum Pilih",
    nutritionAnalysis: "Analisis Gizi CareAura",
    nutritionAnalysisDesc: (carb: string, protein: string, veg: string) => `Kombinasi <strong>${carb}</strong>, <strong>${protein}</strong>, dan <strong>${veg}</strong> memberikan gizi seimbang yang sangat baik dengan biaya yang sangat terjangkau. Cocok untuk menjaga kesehatan keluarga Anda!`,
    plateIncomplete: "Silakan pilih satu bahan dari setiap kategori untuk melihat analisis gizi lengkap.",
    puskesmasGuideTitle: "Panduan Layanan Puskesmas & Posyandu",
    puskesmasGuideDesc: "CareAura adalah pendamping digital Anda, namun untuk pemeriksaan fisik, imunisasi, dan obat-obatan, fasilitas kesehatan fisik pemerintah adalah tempat terbaik yang aman, resmi, dan seringkali 100% gratis dengan BPJS Kesehatan.",
    puskesmasCardTitle: "Puskesmas (Pusat Kesehatan Masyarakat)",
    puskesmasCardSub: "Fasilitas Kesehatan Tingkat Pertama (FKTP)",
    puskesmasCardDesc: "Puskesmas menyediakan layanan medis dasar untuk seluruh warga di tingkat kecamatan. Sangat disarankan untuk mengunjungi Puskesmas jika Anda memerlukan pemeriksaan dokter atau resep obat.",
    puskesmasServicesTitle: "Layanan Utama Gratis (dengan BPJS):",
    puskesmasServices: [
      "Pemeriksaan Umum & Konsultasi Dokter",
      "Pemeriksaan Ibu Hamil (ANC) & KB",
      "Pengambilan Obat Kronis (Diabetes, Hipertensi)",
      "Laboratorium Sederhana (Cek Gula Darah, Kolesterol)"
    ],
    posyanduCardTitle: "Posyandu (Pos Pelayanan Terpadu)",
    posyanduCardSub: "Berbasis Masyarakat & Kader Desa",
    posyanduCardDesc: "Posyandu diadakan sebulan sekali di tingkat RW/dusun oleh Kader Kesehatan desa untuk memantau tumbuh kembang bayi, balita, dan kesehatan ibu hamil secara langsung.",
    posyanduServicesTitle: "Kegiatan Utama Posyandu:",
    posyanduServices: [
      "Penimbangan Berat & Pengukuran Tinggi Balita (Cegah Stunting)",
      "Pemberian Imunisasi Dasar Lengkap & Vitamin A",
      "Pemberian Makanan Tambahan (PMT) Berbasis Bahan Lokal",
      "Penyuluhan Gizi Ibu Hamil & Menyusui"
    ],
    bpjsTitle: "Apakah Anda Peserta BPJS Kesehatan?",
    bpjsDesc: "Seluruh layanan pemeriksaan gizi dan obat kronis di Puskesmas dijamin penuh tanpa biaya tambahan.",
    bpjsBadge: "100% Dijamin Pemerintah",
    footerText: "CareAura — Mewujudkan Keadilan Sosial & Kesehatan Preventif untuk Seluruh Rakyat Indonesia.",
    footerSub: "Aplikasi ini adalah infrastruktur publik digital yang 100% gratis, tanpa iklan, dan tanpa pelacakan data pribadi. Seluruh rekomendasi gizi didasarkan pada bahan pangan lokal yang terjangkau dan bergizi tinggi."
  },
  en: {
    appName: "CareAura",
    companionBadge: "Nutrition Companion",
    subTitle: "Preventive Digital Social Infrastructure",
    anonymousBadge: "100% Anonymous & Free",
    anonymousMobile: "100% Anonymous, No Registration, No Fees",
    selectTrackTitle: "Select Your Nutrition Track",
    selectTrackDesc: "CareAura is designed to accompany your nutritional needs safely, anonymously, and completely free of charge.",
    startConsultation: "Start Consultation",
    activeTrack: "Active Track",
    changeTrack: "Change Track",
    tabAiConsultation: "AI Consultation",
    tabLocalFoodMatrix: "Local Food Matrix",
    tabHealthyPlateBuilder: "Healthy Plate Builder",
    tabPuskesmasGuide: "Puskesmas Guide",
    aiAssistantTitle: "AI Nutrition Assistant",
    restartChat: "Restart Chat",
    faqTitle: "Frequently Asked Questions:",
    listening: "Listening to your voice...",
    inputPlaceholder: "Type your question here (e.g., tempeh nutrition)...",
    privacyNotice: "CareAura respects your privacy. This conversation is completely anonymous and never stored on our servers.",
    stopVoice: "Stop Voice",
    listenAnswer: "Listen to Answer",
    safetyTitle: "Important Notice & Safety Guardrail",
    safetyEncouragement: "We strongly advise you to immediately visit the nearest Posyandu or healthcare professionals at Puskesmas to receive proper and safe medical attention. Your health is our top priority.",
    matrixTitle: "Local Food Matrix (Financial Equity)",
    matrixDesc: "We are committed to social justice. You do not need to buy expensive imported health foods (such as Salmon or Quinoa) to live a healthy life. Below is a list of local Indonesian food ingredients that are cheap, easily available in traditional markets, yet have equivalent or even higher nutritional value!",
    searchPlaceholder: "Search ingredients...",
    all: "All",
    protein: "Protein",
    vegetables: "Vegetables",
    carbohydrates: "Carbohydrates",
    estimatedCost: "Estimated Cost",
    healthyAlternative: "Healthy Alternative For",
    keyBenefits: "Key Benefits",
    mainNutritional: "Main Nutritional Content",
    plateBuilderTitle: "Healthy Plate Builder (Isi Piringku)",
    plateBuilderDesc: "According to the Indonesian Ministry of Health guidelines, a healthy plate must be balanced between Carbohydrates, Protein, and Vegetables. Choose one ingredient from each category below to build your own healthy plate!",
    chooseCarb: "1. Choose Local Carbohydrate",
    chooseProtein: "2. Choose Local Protein",
    chooseVeg: "3. Choose Local Vegetables",
    yourHealthyPlate: "Your Healthy Plate",
    resetPlate: "Reset Plate",
    notSelected: "Not Selected",
    nutritionAnalysis: "Nutrition Analysis",
    nutritionAnalysisDesc: (carb: string, protein: string, veg: string) => `The combination of <strong>${carb}</strong>, <strong>${protein}</strong>, and <strong>${veg}</strong> provides an excellent balanced nutrition at a very affordable cost. Perfect for maintaining your family's health!`,
    plateIncomplete: "Please select one ingredient from each category to view the complete nutritional analysis.",
    puskesmasGuideTitle: "Puskesmas & Posyandu Guide",
    puskesmasGuideDesc: "CareAura is your digital companion, but for physical examinations, immunizations, and medications, government physical health facilities are the best places—safe, official, and often 100% free with BPJS Health.",
    puskesmasCardTitle: "Puskesmas (Public Health Center)",
    puskesmasCardSub: "First-Level Health Facility (FKTP)",
    puskesmasCardDesc: "Puskesmas provides basic medical services for all residents at the sub-district level. It is highly recommended to visit Puskesmas if you need a doctor's examination or prescription.",
    puskesmasServicesTitle: "Free Key Services (with BPJS):",
    puskesmasServices: [
      "General Examination & Doctor Consultation",
      "Maternal Care (ANC) & Family Planning",
      "Chronic Disease Medication (Diabetes, Hypertension)",
      "Simple Laboratory Tests (Blood Sugar, Cholesterol)"
    ],
    posyanduCardTitle: "Posyandu (Integrated Service Post)",
    posyanduCardSub: "Community-Based & Village Volunteers",
    posyanduCardDesc: "Posyandu is held once a month at the neighborhood level by village health volunteers (Kader) to monitor the growth of infants, toddlers, and pregnant mothers directly.",
    posyanduServicesTitle: "Key Posyandu Activities:",
    posyanduServices: [
      "Weighing & Height Measurement of Toddlers (Stunting Prevention)",
      "Provision of Complete Basic Immunization & Vitamin A",
      "Provision of Supplementary Feeding (PMT) Based on Local Ingredients",
      "Nutrition Counseling for Pregnant & Breastfeeding Mothers"
    ],
    bpjsTitle: "Are you a BPJS Health member?",
    bpjsDesc: "All nutritional examination services and chronic disease medications at Puskesmas are fully covered with no additional fees.",
    bpjsBadge: "100% Guaranteed by Government",
    footerText: "CareAura — Realizing Social Justice & Preventive Health for All Indonesian People.",
    footerSub: "This application is a digital public infrastructure that is 100% free, ad-free, and without personal data tracking. All nutritional recommendations are based on affordable and highly nutritious local ingredients."
  }
};
