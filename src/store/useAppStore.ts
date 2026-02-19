import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  AppState, 
  User, 
  Subscription, 
  SubscriptionTier,
  UIState
} from '@/types';
import { mockRoadmapSteps, mockArticles } from '@/data/mockData';

const initialUIState: UIState = {
  isEligibilityModalOpen: false,
  isAuthModalOpen: false,
  isPaymentModalOpen: false,
  selectedPricingTier: null,
  currentArticleId: null,
  activeTab: 'roadmap',
};

const initialSubscription: Subscription = {
  tier: 'free',
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      subscription: initialSubscription,
      roadmapSteps: mockRoadmapSteps,
      currentStepId: 1,
      overallProgress: 0,
      articles: mockArticles,
      ui: initialUIState,

      // Actions
      setUser: (user: User | null) => set({ user }),
      
      setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      
      setSubscription: (subscription: Subscription) => set({ subscription }),
      
      upgradeSubscription: (tier: SubscriptionTier) => {
        const now = new Date();
        const expiresAt = new Date(now);
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        
        set({
          subscription: {
            tier,
            purchasedAt: now,
            expiresAt,
          },
        });
        
        // Unlock steps based on tier
        const { roadmapSteps } = get();
        const updatedSteps = roadmapSteps.map(step => ({
          ...step,
          isLocked: tier === 'free' ? step.id > 1 : tier === 'simple' ? step.id > 3 : false,
        }));
        
        set({ roadmapSteps: updatedSteps });
      },
      
      completeStep: (stepId: number) => {
        const { roadmapSteps } = get();
        const updatedSteps = roadmapSteps.map(step =>
          step.id === stepId
            ? { ...step, isCompleted: true, completedAt: new Date() }
            : step
        );
        
        set({ roadmapSteps: updatedSteps });
        get().calculateProgress();
        
        // Auto-advance to next step
        const nextStep = updatedSteps.find(s => s.id === stepId + 1);
        if (nextStep && !nextStep.isLocked) {
          set({ currentStepId: nextStep.id });
        }
      },
      
      markArticleAsRead: (articleId: string) => {
        const { articles } = get();
        const updatedArticles = articles.map(article =>
          article.id === articleId
            ? { ...article, isRead: true, readAt: new Date() }
            : article
        );
        
        set({ articles: updatedArticles });
        get().calculateProgress();
      },
      
      setCurrentStep: (stepId: number) => set({ currentStepId: stepId }),
      
      setUIState: (ui: Partial<UIState>) => set(state => ({ 
        ui: { ...state.ui, ...ui } 
      })),
      
      openEligibilityModal: () => set(state => ({ 
        ui: { ...state.ui, isEligibilityModalOpen: true } 
      })),
      
      closeEligibilityModal: () => set(state => ({ 
        ui: { ...state.ui, isEligibilityModalOpen: false } 
      })),
      
      openAuthModal: () => set(state => ({ 
        ui: { ...state.ui, isAuthModalOpen: true } 
      })),
      
      closeAuthModal: () => set(state => ({ 
        ui: { ...state.ui, isAuthModalOpen: false } 
      })),
      
      openPaymentModal: (tier: SubscriptionTier) => set(state => ({ 
        ui: { 
          ...state.ui, 
          isPaymentModalOpen: true,
          selectedPricingTier: tier 
        } 
      })),
      
      closePaymentModal: () => set(state => ({ 
        ui: { 
          ...state.ui, 
          isPaymentModalOpen: false,
          selectedPricingTier: null 
        } 
      })),
      
      setActiveTab: (tab) => set(state => ({ 
        ui: { ...state.ui, activeTab: tab } 
      })),
      
      calculateProgress: () => {
        const { roadmapSteps, articles } = get();
        
        const completedSteps = roadmapSteps.filter(s => s.isCompleted).length;
        const readArticles = articles.filter(a => a.isRead).length;
        const totalArticles = articles.length;
        
        const stepProgress = (completedSteps / roadmapSteps.length) * 50;
        const articleProgress = (readArticles / totalArticles) * 50;
        
        set({ overallProgress: Math.round(stepProgress + articleProgress) });
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          subscription: initialSubscription,
          roadmapSteps: mockRoadmapSteps,
          currentStepId: 1,
          overallProgress: 0,
          articles: mockArticles,
          ui: initialUIState,
        });
      },
    }),
    {
      name: 'allemagne2026-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        subscription: state.subscription,
        roadmapSteps: state.roadmapSteps,
        currentStepId: state.currentStepId,
        overallProgress: state.overallProgress,
        articles: state.articles,
      }),
    }
  )
);

export default useAppStore;
