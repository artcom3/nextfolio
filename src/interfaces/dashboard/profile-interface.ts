export interface ProfileInterface {
  id: string;
  userId: string;
  fullName: string;
  professionalTitle?: string;
  bio?: string;
  location?: string;
  pronouns?: string;
  funFact?: string;
  motto?: string;
  profilePicture?: string;
  phoneNumber?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LanguageInterface {
  id: number;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'NATIVE';
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
} 