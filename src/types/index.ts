export type SavedContentCountData = {
  posts: number;
  qas: number;
  podcasts: number;
  videos: number;
};

export type GetSavedContentData = {
  videos: (LearningVideo & { videoCategory: string })[];
  podcasts: (LearningPodcast & { podcastCategory: string })[];
  posts: PostData[];
  qas: QAsData[];
};

export type AddSavedContentData = {
  category: string;
  contentType: string;
  contentId: string;
  userId: string;
};

export type LearningPodcast = {
  _id: string;
  url: string;
  embedUrl: string;
  title: string;
  host: string;
  podcastTitle: string;
  podcastDescription: string;
};

export type LearningPodcastDocument = {
  _id: string;
  category: string;
  podcasts: {
    _id: string;
    url: string;
    embedUrl: string;
    title: string;
    host: string;
    podcastTitle: string;
    podcastDescription: string;
  }[];
};

export type AddLearningPodcastData = {
  category: string;
  title: string;
  url: string;
  embedUrl: string;
  host: string;
  podcastTitle: string;
  podcastDescription: string;
};

export type UpdateLearningPodcastData = {
  category: string;
  podcastId: string;
  podcast: {
    url: string;
    embedUrl: string;
    title: string;
    host: string;
    podcastTitle: string;
    podcastDescription: string;
  };
};

export type UpdateLearningVideoData = {
  category: string;
  videoId: string;
  video: {
    url: string;
    embedUrl: string;
    title: string;
    author: string;
  };
};

export type LearningVideo = {
  _id: string;
  url: string;
  embedUrl: string;
  title: string;
  author: string;
};

export type LearningVideoDocument = {
  _id: string;
  category: string;
  videos: {
    _id: string;
    url: string;
    embedUrl: string;
    title: string;
    author: string;
  }[];
};

export type AddLearningVideoData = {
  category: string;
  title: string;
  url: string;
  embedUrl: string;
  author: string;
};

export type UpdateQuoteData = {
  category: string;
  quoteId: string;
  quote: {
    quote: string;
    author: string;
  };
};

export type DeleteQuoteData = {
  category: string;
  quoteId: string;
};

export type Quote = {
  _id: string;
  quote: string;
  author: string;
};

export type AddQuoteData = {
  category: string;
  quote: string;
  author: string;
};

export type QuotesByCategory = {
  _id: string;
  category: string;
  quotes: {
    _id: string;
    quote: string;
    author: string;
  }[];
};

export type AddPaymentData = {
  userId: string;
  userName: string;
  subscription: {
    subscriptionId: string;
    subscriptionPlan: string;
    subscriptionDate: Date;
  };
  payment: {
    transactionId: string;
    paymentGateway: string;
    currency: string;
    amount: number;
    paymentStatus: string;
    lastPaymentDate: Date;
  };
};

export type KhaltiSubscriptionData = {
  pidx: string;
};

// export type EsewaSubscriptionData = {};

export type PayViaEsewaDetails = {
  amount: string;
  failure_url: string;
  product_delivery_charge?: string;
  product_service_charge?: string;
  product_code: string;
  signature: string;
  signed_field_names: string;
  success_url: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
};

export type PayViaKhaltiDetails = {
  return_url: string;
  website_url: string;
  amount: number | undefined;
  purchase_order_id: string;
  purchase_order_name: string | undefined;
  customer_info: {
    name: string | undefined;
    email: string | undefined;
  };
  // amount_breakdown: {
  //   label: string;
  //   amount: number | undefined;
  // }[];
};

export type SubscriptionPlan = {
  _id: string;
  subscriptionPlan: string;
  subscriptionPrice: number;
  subscriptionDescription: string;
  subscriptionDuration: string;
  subscriptionFeatures: string[];
  isActive: boolean;
};

export type AddSubscriptionPlanData = {
  subscriptionPlan: string;
  subscriptionPrice: number;
  subscriptionDescription: string;
  subscriptionDuration: string;
  subscriptionFeatures: string[];
};

export type UpdateSubscriptionPlanData = {
  planId: string;
  newSubscriptionPlan: AddSubscriptionPlanData;
};

export type PromptFeedback = {
  _id: string;
  promptId: string;
  userId: string;
  feedback: string;
  feedbackStatus: 'pending' | 'resolved' | 'rejected';
  feedbackDate: Date;
};

export type AddPromptFeedbackData = {
  userId: string;
  promptId: string;
  feedback: string;
  feedbackDate: Date;
};

export type DeletePromptEntry = {
  promptId: string;
};

export type QuestionPromptEntry = {
  _id: string;
  userId: string;
  promptTitle: string;
  entryDate: Date;
  entries: {
    prompt: string;
    answer: string;
  }[];
};

export type AddQuestionPromptEntryData = {
  userId: string;
  promptTitle: string;
  entryDate: Date;
  entries: {
    prompt: string;
    answer: string;
  }[];
};

export type UpdateQuestionPromptStatusData = {
  questionPromptId: string;
  verificationStatus: boolean;
  verifiedBy: string;
};

export type AddQuestionPromptData = {
  title: string;
  description: string;
  questions: {
    prompt: string;
    placeholder: string;
    tag: string;
  }[];
};

export type QuestionPrompt = {
  _id: string;
  title: string;
  description: string;
  questions: {
    _id: string;
    prompt: string;
    placeholder: string;
    tag: string;
  }[];
  isVerified: boolean;
  verifiedBy: string;
};

export type DeleteGratitudeJournalData = {
  userId: string;
  entryId: string;
};

export type GratitudeJournals = {
  _id: string;
  journals: {
    prompt: string;
    answer: string;
  }[];
  entryDate: Date;
};

export type AddGratitudeJournalData = {
  userId: string;
  journalEntry: {
    journals: {
      prompt: string;
      answer: string;
    }[];
    entryDate: Date;
  };
};

export type GratitudeJournalPrompt = {
  prompt: string;
  placeholder: string;
  category: string;
};

export type GetGratitudePromptsData = {
  _id: string;
  prompt: string;
  placeholder: string;
  category: string;
};

export type DeleteJournalData = {
  userId: string;
  journalId: string;
};

export type Journal = {
  _id: string;
  entryDate: string;
  journalCategory: string;
  journalContent: string;
  journalTitle: string;
};

export type AddJournalEntryData = {
  userId: string;
  journalEntry: {
    journalTitle: string;
    entryDate: Date;
    journalContent: string;
    journalCategory: string;
  };
};

export type AddAnswerData = {
  qhpId: string;
  answer: string;
  questionId: string;
};

export type QAsData = {
  _id: string;
  userId: string;
  userName: string;
  userRole: string;
  image: string;
  communityId: string;
  questionTitle: string;
  question: string;
  answers: [
    {
      userId: string;
      answer: string;
      answerDate: Date;
      userName: string;
      userRole: string;
      image: string;
    }
  ];

  likes: [
    {
      userId: string;
      likedDate: Date;
    }
  ];
  isAnonymous: boolean;
  createdAt: Date;
};

export type AddQAData = {
  userId: string;
  communityId: string;
  questionTitle: string;
  question: string;
};

export type AddQALikeData = {
  QAId: string;
  userId: string;
};

export type AddPostLikeData = {
  postId: string;
  userId: string;
};

export type AddPostCommentData = {
  postId: string;
  userId: string;
  comment: string;
  isAnonymous: boolean;
};

export type PostData = {
  _id: string;
  userId: string;
  userName: string;
  communityId: string;
  postTitle: string;
  post: string;
  image: string;
  userRole: string;
  postCategory: string;
  postComments: [
    {
      userId: string;
      comment: string;
      image: string;
      commentDate: Date;
      userName: string;
      userRole: string;
      isAnonymous: boolean;
    }
  ];
  postLikes: [
    {
      userId: string;
      likedDate: Date;
    }
  ];
  isAnonymous: boolean;
  createdAt: Date;
};

export type PostCountData = {
  [key: string]: {
    communityId: string;
    count: number;
    communityName: string;
  };
};

export type AddPostData = {
  userId: string;
  communityId: string;
  postTitle: string;
  post: string;
  postCategory: string;
  isAnonymous: boolean;
};

export type AddCommunityMemberData = {
  communityId: string;
  userId: string;
};

export type CommunityMemberData = {
  _id: string;
  communityId: string;
  users: [
    {
      userId: string;
      joinedDate: Date;
    }
  ];
};

export type MembersCount = {
  [key: string]: {
    memberCount: number;
    communityName: string;
  };
};

export type AddCommunityData = {
  journeyId: string;
  communityName: string;
  communityDescription: string;
  communityIcon: {
    dark: string;
    light: string;
  };
};

export type CommunityData = {
  _id: string;
  journeyId: string;
  communityName: string;
  communityDescription: string;
  communityIcon: {
    dark: string;
    light: string;
  };
  createdDate: Date;
};

export type EditCommunityData = {
  communityId: string;
  communityFields: {
    communityName: string;
    communityDescription: string;

    // journeyId: string;
  };
};

export type UpdateJourneyFeedbackStatusData = {
  feedbackDocumentId: string;
  feedbackId: string;
  status: 'pending' | 'resolved' | 'rejected';
};

export type JourneyFeedback = {
  _id: string;
  feedback: string;
  feedbackStatus: 'pending' | 'resolved' | 'rejected';
};

export type ActionStepFeedback = {
  _id: string;
  actionStepDay: string;
  feedback: string;
  feedbackStatus: 'pending' | 'resolved' | 'rejected';
};

export type JourneyFeedbacks = {
  _id: string;
  userId: string;
  journeyId: string;
  journeyFeedbacks: {
    _id: string;
    feedback: string;
    feedbackStatus: 'pending' | 'resolved' | 'rejected';
  }[];
  actionStepFeedbacks: {
    _id: string;
    actionStepDay: string;
    feedback: string;
    feedbackStatus: 'pending' | 'resolved' | 'rejected';
  }[];
};

export type AddJourneyFeedbackData = {
  userId: string;
  journeyId: string;
  journeyFeedbacks: { feedback: string };
  actionStepFeedbacks: {
    actionStepDay: string;
    feedback: string;
  };
};

export type LogMoodData = {
  userId: string;
  mood: {
    mood: number;
    reasoning: string;
    loggedDate: Date;
  };
};
export type Mood = {
  _id: string;
  mood: number;
  reasoning: string;
  loggedDate: Date;
};

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

export type UpdateQhpDetailsData = {
  userId: string;
  updatedQhpFields: {
    workingLicense?: string;
    qualifications?: string[];
    experiences?: string[];
    proficientFields?: string[];
    additionalSkills?: string[];
    additionalInformation?: string;
    employerName?: string;
    jobTitle?: string;
  };
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

export type ApplyingApplicationData = {
  userId: string;
  workingLicense: string;
  qualifications: string[];
  experiences: string[];
  proficientFields: string[];
  additionalSkills: string[];
  additionalInformation: string;
};

export type EmbarkedJourney = {
  _id: string;
  userId: string;
  journeyId: string;
  journeyName: string;
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
  journeyStatus: 'ongoing' | 'completed' | 'discontinued';
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

export type EmbarkedJourneyCount = {
  [key: string]: {
    journeyName: string;
    count: number;
  };
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

export type EditJourneyData = {
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

export type UsersCountInJourney = {
  [key: string]: {
    journeyName: string;
    userCount: number;
  };
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
  loggedMood: boolean;
  role: string;
  image: string;
  updatedAt: string;
  values: string[];
  __v: number;
};

export type UpdateUserDetailsData = {
  userId: string;
  updatedUserFields: {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    dateOfBirth?: Date;
    challenges?: string[];
    goals?: string[];
    values?: string[];
    preferredJourney?: string;
    embarkedJourney?: string;
    completedJourney?: string[];
  };
};

export type UpdateUserRoleData = {
  userId: string;
  role: string;
};
export type UpdateUserDOBData = {
  userId: string;
  dob: Date;
};

export type UpdateSubscriptionStatusData = {
  userId: string;
  subscriptionStatus: boolean;
};

export type DeleteUserData = {
  id: string;
};
