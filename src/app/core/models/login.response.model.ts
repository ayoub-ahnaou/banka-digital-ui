import {AuthPrincipal} from '../services/auth.service';

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: AuthPrincipal;

    accessToken: string;
    createdAt: string;
    expiresIn: string;
    tokenType: string;
  };

  timestamp: string;
}
