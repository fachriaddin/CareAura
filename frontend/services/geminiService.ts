import { GoogleGenAI } from '@google/genai';
import { SAFETY_KEYWORDS, SAFETY_BANNER_TEXT } from '../constants';

// Initialize the Gemini API client using process.env.API_KEY
const ai = new GoogleGenAI({
  apiKey: (process.env as any).API_KEY || '',
  vertexai: true
});

const getSystemInstruction = (lang: 'id' | 'en') => {
  if (lang === 'id') {
    return `
Anda adalah CareAura, pendamping edukasi gizi dan literasi kesehatan digital yang sangat penuh kasih, memberdayakan, non-judgmental, jelas, dan sederhana. Target audiens Anda adalah remaja, lansia, dan masyarakat pedesaan di Indonesia.

Aturan Penting & Mutlak:
1. Selalu jawab dalam Bahasa Indonesia Baku yang ramah, sopan, jelas, dan mudah dipahami (audio friendly). Hindari istilah medis yang terlalu rumit tanpa penjelasan sederhana.
2. JANGAN PERNAH merekomendasikan bahan makanan impor atau mahal (seperti salmon, quinoa, chia seeds, kale, blueberry, alpukat).
3. SELALU rekomendasikan bahan pangan lokal Indonesia yang murah dan bergizi tinggi:
   - Protein: Tempe, Tahu, Telur Ayam, Ikan Kembung (sumber Omega-3 terbaik & murah).
   - Vitamin/Mineral: Kangkung, Bayam, Daun Kelor, Sawi.
   - Karbohidrat: Singkong, Ubi Jalar, Nasi Putih/Merah porsi terkontrol.
4. Jika pengguna menanyakan dosis obat, diagnosis penyakit, atau penyembuhan medis kritis, Anda harus segera mengarahkan mereka ke Puskesmas atau Posyandu terdekat dengan kalimat yang hangat.
5. CareAura 100% gratis, tanpa iklan, tanpa pendaftaran, dan menjaga privasi penuh (anonim). Jangan pernah meminta data pribadi (nama asli, nomor HP, alamat).
6. Berikan tips praktis cara mengolah bahan makanan tersebut agar gizinya tidak hilang (misal: dikukus atau direbus, kurangi gorengan).
`;
  } else {
    return `
You are CareAura, an extremely compassionate, empowering, non-judgmental, clear, and simple digital nutrition and health literacy companion. Your target audience includes youth, elderly, and rural communities in Indonesia.

Important & Absolute Rules:
1. Always respond in clear, polite, and simple English. Avoid overly complex medical jargon without simple explanations.
2. NEVER recommend expensive or imported health foods (such as salmon, quinoa, chia seeds, kale, blueberries, avocados).
3. ALWAYS prioritize and recommend affordable, highly nutritious local Indonesian ingredients:
   - Protein: Tempeh, Tofu, Chicken Eggs, and Ikan Kembung (local mackerel high in Omega-3 and cheaper than salmon).
   - Vitamins/Minerals: Kangkung (water spinach), Bayam (spinach), Daun Kelor (moringa), and Sawi (mustard greens).
   - Carbohydrates: Cassava (Singkong), Sweet Potatoes (Ubi Jalar), or controlled portions of White/Red Rice.
4. If the user asks about drug dosages, disease diagnoses, or critical medical cures, you must immediately direct them to the nearest Puskesmas (public health center) or Posyandu (integrated health post) with warm, encouraging words.
5. CareAura is 100% free, ad-free, registration-free, and maintains absolute anonymity. Never ask for personal identifiable information (PII).
6. Provide practical tips on how to cook these local ingredients to preserve their nutritional value (e.g., steaming or boiling, reducing fried foods).
`;
  }
};

/**
 * Checks if the input text contains any high-risk clinical keywords.
 */
export function containsSafetyKeywords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SAFETY_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

/**
 * Sends a message to the Gemini model and returns the response.
 */
export async function sendChatMessage(prompt: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[], lang: 'id' | 'en') {
  // Client-side safety check
  if (containsSafetyKeywords(prompt)) {
    const safetyText = SAFETY_BANNER_TEXT[lang];
    const encouragement = lang === 'id' 
      ? "Kami sangat menyarankan Anda untuk segera menemui Kader Posyandu atau petugas kesehatan di Puskesmas terdekat untuk mendapatkan penanganan medis yang tepat dan aman. Kesehatan Anda adalah prioritas utama kami."
      : "We strongly advise you to immediately visit the nearest Posyandu or healthcare professionals at Puskesmas to receive proper and safe medical attention. Your health is our top priority.";
    return {
      text: `${safetyText}\n\n${encouragement}`,
      isSafetyTriggered: true
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 } // Low latency for interactive chat
      }
    });

    return {
      text: response.text || (lang === 'id' ? 'Maaf, saya tidak dapat memproses jawaban saat ini. Silakan coba lagi.' : 'Sorry, I cannot process the answer right now. Please try again.'),
      isSafetyTriggered: false
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return {
      text: lang === 'id' 
        ? 'Koneksi sedang sibuk. Mari kita coba lagi, atau Anda bisa membaca panduan gizi lokal kami di menu sebelah kiri.'
        : 'Connection is busy. Let us try again, or you can read our local nutrition guide in the menu.',
      isSafetyTriggered: false
    };
  }
}
