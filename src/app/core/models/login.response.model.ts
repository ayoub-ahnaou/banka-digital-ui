import {AuthPrincipal} from '../services/auth.service';

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    email: string;
    username: string;
    role: string;

    accessToken: string;
    createdAt: string;
    expiresIn: string;
    tokenType: string;
  };

  timestamp: string;
}
