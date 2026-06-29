export type TrackType = 'CHRONIC' | 'MCH' | 'YOUTH';

export interface Ingredient {
  id: string;
  name: string;
  category: 'PROTEIN' | 'VEGETABLE' | 'CARB';
  alternativeTo: string;
  benefits: string[];
  cost: 'Sangat Murah' | 'Murah' | 'Terjangkau';
  nutrients: {
    protein: number; // scale 1-10
    vitamins: number; // scale 1-10
    fiber: number; // scale 1-10
    omega3?: number; // scale 1-10
    iron?: number; // scale 1-10
  };
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isSafetyTriggered?: boolean;
}

export interface TrackDetail {
  id: TrackType;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  quickPrompts: string[];
}
