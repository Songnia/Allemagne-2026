// User Types
export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  country?: string;
  city?: string;
  createdAt: Date;
  lastLoginAt: Date;
}

// Subscription Tier Types
export type SubscriptionTier = 'free' | 'simple' | 'complete';

export interface Subscription {
  tier: SubscriptionTier;
  purchasedAt?: Date;
  expiresAt?: Date;
  paymentMethod?: 'wave' | 'orange_money';
  transactionId?: string;
}

// Roadmap Step Types
export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  isLocked: boolean;
  requiredTier: SubscriptionTier;
  articles: Article[];
  isCompleted: boolean;
  completedAt?: Date;
}

// Article Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: number;
  isRead: boolean;
  readAt?: Date;
  stepId: number;
  requiredTier: SubscriptionTier;
  icon: string;
}

// Eligibility Check Types
export interface EligibilityQuestion {
  id: number;
  question: string;
  options: EligibilityOption[];
}

export interface EligibilityOption {
  id: string;
  label: string;
  points: number;
}

export interface EligibilityResult {
  score: number;
  maxScore: number;
  isEligible: boolean;
  message: string;
  details: string;
}

// Navigation Types
export type NavigationTab = 'roadmap' | 'articles' | 'profile';

// Payment Types
export interface PaymentMethod {
  id: 'wave' | 'orange_money';
  name: string;
  icon: string;
  color: string;
}

export interface PricingTier {
  id: SubscriptionTier;
  name: string;
  price: number;
  currency: string;
  period?: string;
  description: string;
  features: string[];
  recommended: boolean;
  buttonText: string;
  checkoutUrl?: string;
}

// UI State Types
export interface UIState {
  isEligibilityModalOpen: boolean;
  isAuthModalOpen: boolean;
  isPaymentModalOpen: boolean;
  selectedPricingTier: SubscriptionTier | null;
  currentArticleId: string | null;
  activeTab: NavigationTab;
}

// App State Types
export interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;

  // Subscription
  subscription: Subscription;

  // Roadmap
  roadmapSteps: RoadmapStep[];
  currentStepId: number;
  overallProgress: number;

  // Articles
  articles: Article[];

  // UI State
  ui: UIState;

  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setSubscription: (subscription: Subscription) => void;
  upgradeSubscription: (tier: SubscriptionTier) => void;
  completeStep: (stepId: number) => void;
  markArticleAsRead: (articleId: string) => void;
  setCurrentStep: (stepId: number) => void;
  setUIState: (ui: Partial<UIState>) => void;
  openEligibilityModal: () => void;
  closeEligibilityModal: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openPaymentModal: (tier: SubscriptionTier) => void;
  closePaymentModal: () => void;
  setActiveTab: (tab: NavigationTab) => void;
  calculateProgress: () => void;
  logout: () => void;
}
