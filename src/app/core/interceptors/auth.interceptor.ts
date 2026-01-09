import {inject, Injectable} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {TokenService} from '../services/token.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).get();

  if (token)
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  return next(req);
}
