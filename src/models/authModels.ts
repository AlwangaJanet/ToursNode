export interface User {
    id: string
    email: string
    name: string
    password: string
    isAdmin: number
    isDeleted: number
    isEmailSent: number
  }
  
  export interface Payload {
    id: string
    name: string
    isAdmin: number
  }
  