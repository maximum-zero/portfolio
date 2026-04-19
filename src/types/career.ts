export interface CareerItem {
  id: string
  type?: 'work' | 'education'
  company: string
  role: string
  period: string
  duration?: string
  tasks?: string[]
  stack?: string[]
}

export interface CertItem {
  name: string
  issuedAt: string
  org: string
}
