import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then((module) => module.HomePage), title: 'PaySmart | Your money, with more peace of mind' },
  { path: 'login', loadComponent: () => import('./components/login/login').then((module) => module.LoginPage), title: 'Log in | PaySmart' },
  { path: '**', redirectTo: '' },
];
