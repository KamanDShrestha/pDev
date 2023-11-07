export type JourneyData = {
  _id: string;
  name: string;
  description: string;
  length: number;
  imageLinks: { dark: string; light: string };
  importance: string[];
  learningQuotes: string[];
  usages: string[];
  actionSteps: {
    [key: string]: ActionStep;
  };
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
