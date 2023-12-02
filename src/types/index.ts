export type QhpDetails = {
  userId: string;
  workingLicense: string;
  qualifications: string[];
  experiences: string[];
  proficientFields: string[];
  additionalSkills: string[];
  additionalInformation: string;
  employerName: string;
  jobTitle: string;
};

export type UpdateApplicationStatusData = {
  id: string;
  status: 'Approved' | 'Rejected' | 'Pending';
};

export type ApplicationData = {
  _id: string;
  userId: string;
  workingLicense: string;
  qualifications: string[];
  experiences: string[];
  proficientFields: string[];
  additionalSkills: string[];
  status: 'Approved' | 'Rejected' | 'Pending';
  additionalInformation: string;
  appliedDate: Date;
};

export type EmbarkedJourney = {
  _id: string;
  userId: string;
  journeyId: string;
  keyLearning: [string];
  reflection: [string];
  isJourneyCompleted: boolean;
  dateCompleted: Date;
  currentDay: string;
  actionSteps: {
    [key: string]: {
      actionStep: string;
      description: string;
      evidences: string[];
      additionalSteps: string[];
      isCompleted: boolean;
      status: 'idle' | 'completed' | 'due' | 'blocked' | 'ongoing';
    };
  };
};

export type UpdateActionCompletionData = {
  journeyId: string;
  userId: string;
  day: string;
};

export type GetEmbarkedJourneyData = {
  success: boolean;
  message: string;
  embarkedJourney: EmbarkedJourney;
};

export type AddEmbarkedJourneyData = {
  userId: string;
  journeyId: string;
};

export type JourneyData = {
  _id: string;
  name: string;
  description: string;
  length: number;
  imageLinks: { dark: string; light: string };
  importance: string[];
  learningQuotes: string[];
  usages: string[];
  isVerified: boolean;
  actionSteps: {
    [key: string]: ActionStep;
  };
};

export type DeleteJourneyData = {
  id: string;
};

export type AddJourneyData = {
  name: string;
  description: string;
  length: number;
  imageLinks: { dark: string; light: string };
  importance: string[];
  learningQuotes: string[];
  usages: string[];
  actionSteps: object;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
};

export type ProfileCompletionData = {
  challenges: string[];
  goals: string[];
  values: string[];
};

export type ActionStep = {
  actionStep: string;
  description: string;
  evidences: string[];
  additionalSteps: string[];
};

export type ActionSteps = {
  [key: string]: ActionStep;
};

export type ErrorResponse = {
  success: false;
  message: string;
  [key: string]: unknown;
};

export type User = {
  _id: string;
  challenges: string[];
  completedJourney: string[];
  createdAt: string;
  dateOfBirth: string;
  email: string;
  embarkedJourney: string;
  firstName: string;
  goals: string[];
  hasSubscribed: boolean;
  isNewUser: boolean;
  lastName: string;
  preferredJourney: string;
  role: string;
  updatedAt: string;
  values: string[];
  __v: number;
};

export type UpdateUserRoleData = {
  userId: string;
  role: string;
};

export type DeleteUserData = {
  id: string;
};
