import { Routes } from '@angular/router';
import { ExamplesComponent } from './layout/examples/examples.component';

export const routes: Routes = [
    // {
    //     path: 'angular',
    //     redirectTo: 'angular/examples',
    //     pathMatch: 'full'
    // },
    {
        path:'angular/examples',
        component: ExamplesComponent
    }
];
