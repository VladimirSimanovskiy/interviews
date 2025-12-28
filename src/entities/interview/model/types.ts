export interface IInterview {
  id: string
  company: string
  vacancyLink: string
  hrName: string
  contactTelegram?: string
  contactWhatsApp?: string
  contactPhone?: string
  createdAt: Date
  updatedAt: Date
}

export type IInterviewData = Omit<IInterview, 'id' | 'createdAt' | 'updatedAt'>


