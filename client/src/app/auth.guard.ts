import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(!localStorage.getItem('token')) {
    return false;
  }
      
  return true;
};
