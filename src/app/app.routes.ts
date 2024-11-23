import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then((m) => m.HomeComponent)
        },
    },
    { path: 'category/:category', component: CategoryComponent }, 
    { path: 'about', component: AboutComponent }, 

];
