export type Empresa = 'Multired' | 'Servired' | 'MultiredYServired'

export interface User {
  id: string
  names: string
  lastnames: string
  username: string
  email: string
  company: string
  process: string
  sub_process: string
}
