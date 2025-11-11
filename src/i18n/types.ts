/**
 * Supported languages
 */
export type Language = 'en' | 'zh' | 'vi';

/**
 * Translation keys structure
 */
export interface Translations {
  common: {
    resume: string;
    home: string;
  };
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    keywords: string;
  };
  navigation: {
    about: string;
    experience: string;
    work: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    cta: string;
    button: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    technologiesTitle: string;
    technologies: string[];
  };
  experience: {
    title: string;
    jobs: Array<{
      company: string;
      position: string;
      period: string;
      responsibilities: string[];
    }>;
  };
  work: {
    title: string;
    projects: Array<{
      title: string;
      subtitle: string;
      descriptions: string[];
      technologies: string[];
    }>;
  };
  contact: {
    title: string;
    description: string;
    dropMessage: string;
    giveCall: string;
    thankYou: string;
  };
  footer: {
    copyright: string;
    inspiration: string;
  };
  streamer: {
    live: string;
    reviewingPortfolio: string;
    portfolioReviewer: string;
    watching: string;
    liveChat: string;
    viewers: string;
    muteAudio: string;
    enableAudio: string;
    muteStreamingAudio: string;
    enableStreamingAudio: string;
    welcomeMessages: string[];
    sectionMessages: {
      hero: string[];
      about: string[];
      experience: string[];
      work: string[];
      contact: string[];
    };
    genericMessages: string[];
  };
}
