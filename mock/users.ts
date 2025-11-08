export type UserRole = 'admin' | 'researcher' | 'moderator' | 'viewer';
export type UserStatus = 'active' | 'suspended' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  verifiedClaims?: number;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Adeyemi Johnson',
    email: 'adeyemi.j@factcheckng.com',
    role: 'researcher',
    status: 'active',
    joinedDate: '2024-01-15',
    verifiedClaims: 87,
  },
  {
    id: '2',
    name: 'Dr. Fatima Abubakar',
    email: 'fatima.a@factcheckng.com',
    role: 'researcher',
    status: 'active',
    joinedDate: '2024-02-20',
    verifiedClaims: 134,
  },
  {
    id: '3',
    name: 'Musa Ibrahim',
    email: 'musa.i@factcheckng.com',
    role: 'researcher',
    status: 'active',
    joinedDate: '2024-03-10',
    verifiedClaims: 56,
  },
  {
    id: '4',
    name: 'Dr. Aisha Muhammad',
    email: 'aisha.m@factcheckng.com',
    role: 'researcher',
    status: 'active',
    joinedDate: '2024-04-05',
    verifiedClaims: 92,
  },
  {
    id: '5',
    name: 'Chinedu Okafor',
    email: 'chinedu.o@factcheckng.com',
    role: 'moderator',
    status: 'active',
    joinedDate: '2024-01-01',
  },
  {
    id: '6',
    name: 'Blessing Adebayo',
    email: 'blessing.a@factcheckng.com',
    role: 'admin',
    status: 'active',
    joinedDate: '2023-12-01',
  },
];
