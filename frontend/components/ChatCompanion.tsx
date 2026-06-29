import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, RefreshCw, ShieldAlert, Sparkles, User } from 'lucide-react';
import { ChatMessage, TrackType } from '../types';
import { TRACKS, TRANSLATIONS } from '../constants';
import { sendChatMessage } from '../services/geminiService';

interface ChatCompanionProps {
  activeTrack: TrackType;
  fontSizeClass: string;
  isAudioEnabled: boolean;
  language: 'id' | 'en';
}

export const ChatCompanion: React.FC<ChatCompanionProps> = ({
  activeTrack,
  fontSizeClass,
  isAudioEnabled,
  language
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const trackInfo = TRACKS(language).find(t => t.id === activeTrack)!;
  const t = TRANSLATIONS[language];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initialize chat with a warm welcome message based on the selected track and language
  useEffect(() => {
    let welcomeText = '';
    if (language === 'id') {
      if (activeTrack === 'CHRONIC') {
        welcomeText = "Halo! Saya CareAura, pendamping gizi Anda. Di jalur Pencegahan Sekunder ini, saya siap membantu Anda mengatur pola makan sehat untuk mengontrol Diabetes Tipe-2, Hipertensi, atau pemulihan pasca-Stroke menggunakan bahan pangan lokal yang murah dan mudah didapat. Apa yang ingin Anda tanyakan hari ini?";
      } else if (activeTrack === 'MCH') {
        welcomeText = "Selamat datang Ibu hebat! Saya CareAura. Di jalur Kesehatan Ibu & Anak ini, mari kita diskusikan gizi terbaik untuk Ibu hamil, menyusui, panduan MP-ASI, serta cara mencegah stunting pada buah hati menggunakan bahan lokal bergizi tinggi seperti Daun Kelor dan Telur. Ada yang bisa saya bantu?";
      } else {
        welcomeText = "Halo teman muda! Di sini adalah ruang aman, privat, dan bebas dari penghakiman untukmu. Kita bisa mengobrol santai tentang gizi remaja, perkembangan tubuh, kesehatan kulit, atau tips menjaga energi saat sekolah dengan makanan lokal yang murah meriah. Tanyakan apa saja, rahasiamu aman bersama saya!";
      }
    } else {
      if (activeTrack === 'CHRONIC') {
        welcomeText = "Hello! I am CareAura, your nutrition companion. In this Secondary Prevention track, I am ready to help you manage a healthy diet to control Type-2 Diabetes, Hypertension, or post-Stroke recovery using affordable and easily accessible local ingredients. What would you like to ask today?";
      } else if (activeTrack === 'MCH') {
        welcomeText = "Welcome, amazing mother! I am CareAura. In this Maternal & Child Health track, let's discuss the best nutrition for pregnant or breastfeeding mothers, complementary feeding (MP-ASI) guides, and how to prevent stunting in your little one using highly nutritious local ingredients like Moringa and Eggs. How can I help you?";
      } else {
        welcomeText = "Hello young friend! This is a safe, private, and completely non-judgmental space for you. We can chat casually about youth nutrition, physical development, skin health, or tips to maintain energy at school with cheap and healthy local foods. Ask anything, your secrets are safe with me!";
      }
    }

    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: welcomeText,
        timestamp: new Date()
      }
    ]);
  }, [activeTrack, language]);

  // Handle Text-to-Speech (TTS)
  const speakText = (text: string, messageId: string) => {
    if ('speechSynthesis' in window) {
      if (speakingMessageId === messageId) {
        window.speechSynthesis.cancel();
        setSpeakingMessageId(null);
        return;
      }

      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const cleanText = text.replace(/[#*`]/g, ''); // Clean markdown characters
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language === 'id' ? 'id-ID' : 'en-US';
      
      utterance.onend = () => {
        setSpeakingMessageId(null);
      };

      utterance.onerror = () => {
        setSpeakingMessageId(null);
      };

      setSpeakingMessageId(messageId);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(language === 'id' ? 'Fitur pembaca suara tidak didukung di peramban Anda.' : 'Voice reader feature is not supported in your browser.');
    }
  };

  // Handle Speech-to-Text (STT) Simulation / Web Speech API
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'id' ? 'id-ID' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setInputValue(speechResult);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      // Fallback simulation for browsers without Web Speech API
      setIsListening(true);
      setTimeout(() => {
        setInputValue(language === 'id' ? "Bagaimana cara mengolah daun kelor yang benar?" : "How to cook moringa leaves properly?");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Format history for Gemini API
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await sendChatMessage(textToSend, history, language);

    const modelMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text,
      timestamp: new Date(),
      isSafetyTriggered: response.isSafetyTriggered
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);

    // Auto-speak if global audio is enabled
    if (isAudioEnabled) {
      speakText(response.text, modelMessage.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCC3AA] shadow-sm overflow-hidden flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-[#F1E2D1]/50 border-b border-[#DCC3AA]/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#810B38] text-[#F1E2D1] p-2 rounded-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#541A1A] text-sm sm:text-base">{t.aiAssistantTitle}</h3>
            <p className="text-xs text-[#810B38] font-semibold">{trackInfo.title}</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm(language === 'id' ? 'Apakah Anda ingin memulai ulang percakapan? Riwayat obrolan saat ini akan dihapus.' : 'Do you want to restart the conversation? Current chat history will be cleared.')) {
              setMessages([messages[0]]);
            }
          }}
          className="text-xs text-[#810B38] hover:text-[#541A1A] flex items-center gap-1 font-bold"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          {t.restartChat}
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F1E2D1]/20">
        {messages.map((msg) => {
          const isModel = msg.role === 'model';
          return (
            <div
              key={msg.id}
              className={`flex ${isModel ? 'justify-start' : 'justify-end'} items-start gap-3`}
            >
              {isModel && (
                <div className="bg-[#810B38] text-[#F1E2D1] p-1.5 rounded-lg mt-1 shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div className="max-w-[85%] sm:max-w-[75%]">
                {msg.isSafetyTriggered ? (
                  /* Safety Banner Interception UI */
                  <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-5 text-slate-900 shadow-sm">
                    <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
                      <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600" />
                      <span>{t.safetyTitle}</span>
                    </div>
                    <p className={`${fontSizeClass} leading-relaxed font-medium text-slate-800`}>
                      {msg.text}
                    </p>
                  </div>
                ) : (
                  /* Regular Message Bubble */
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      isModel
                        ? 'bg-white border border-[#DCC3AA] text-[#541A1A]'
                        : 'bg-[#810B38] text-[#F1E2D1]'
                    }`}
                  >
                    <p className={`${fontSizeClass} leading-relaxed whitespace-pre-line`}>
                      {msg.text}
                    </p>
                    
                    {/* Audio Playback Button for Model Responses */}
                    {isModel && (
                      <div className="mt-2 pt-2 border-t border-[#DCC3AA]/30 flex justify-end">
                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md transition-all ${
                            speakingMessageId === msg.id
                              ? 'bg-amber-500 text-slate-950 animate-pulse'
                              : 'bg-[#F1E2D1] text-[#810B38] hover:bg-[#DCC3AA]/30'
                          }`}
                        >
                          {speakingMessageId === msg.id ? (
                            <>
                              <VolumeX className="h-3.5 w-3.5" />
                              {t.stopVoice}
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3.5 w-3.5" />
                              {t.listenAnswer}
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <span className="text-[10px] text-[#541A1A]/60 mt-1 block px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {!isModel && (
                <div className="bg-[#DCC3AA] text-[#541A1A] p-1.5 rounded-lg mt-1 shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[#810B38] text-[#F1E2D1] p-1.5 rounded-lg shrink-0">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="bg-white border border-[#DCC3AA] rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex space-x-1.5 items-center py-1">
                <div className="h-2 w-2 bg-[#810B38] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-[#810B38] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 bg-[#810B38] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-3 bg-[#F1E2D1]/30 border-t border-[#DCC3AA]/50">
          <p className="text-xs font-bold text-[#541A1A]/80 mb-2">{t.faqTitle}</p>
          <div className="flex flex-wrap gap-2">
            {trackInfo.quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-xs bg-white hover:bg-[#F1E2D1] border border-[#DCC3AA] hover:border-[#810B38] text-[#541A1A] hover:text-[#810B38] px-3 py-2 rounded-xl transition-all text-left font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#DCC3AA]/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={startSpeechRecognition}
            className={`p-3 rounded-xl border transition-all shrink-0 ${
              isListening
                ? 'bg-red-600 border-red-500 text-white animate-pulse'
                : 'bg-[#F1E2D1] border-[#DCC3AA] text-[#810B38] hover:bg-[#DCC3AA]/30'
            }`}
            title={language === 'id' ? "Bicara langsung dengan suara" : "Speak directly with voice"}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isListening ? t.listening : t.inputPlaceholder}
            className={`flex-1 bg-[#F1E2D1]/30 border border-[#DCC3AA] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#810B38] focus:bg-white transition-all ${fontSizeClass}`}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-[#810B38] hover:bg-[#541A1A] text-[#F1E2D1] p-3 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-[#810B38] shrink-0"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="text-[10px] text-[#541A1A]/60 text-center mt-2">
          {t.privacyNotice}
        </p>
      </div>
    </div>
  );
};
