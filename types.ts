
export enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher'
}

export enum Language {
    ENGLISH = 'en',
    HINDI = 'hi',
    BENGALI = 'bn',
    TELUGU = 'te'
}

export interface User {
  name: string;
  role: Role;
  avatar: string;
  ecoPoints: number;
  streak: number;
  rank: number;
}

export interface Challenge {
    id: number;
    title: string;
    description: string;
    points: number;
    submitted: boolean;
    verified: boolean | null;
}

export interface StudentSubmission {
    id: number;
    studentName: string;
    challengeTitle: string;
    submissionDate: string;
    status: 'pending' | 'approved' | 'rejected';
}
