import { Routes } from '@angular/router';
import { TodoListComponent } from './layout/todo-list/todo-list.component';
import { CurriculumComponent } from './layout/curriculum/curriculum.component';

export const routes: Routes = [
    {
        path:'angular/curriculum',
        component: CurriculumComponent
    },
    {
        path:'angular/to-do',
        component: TodoListComponent
    }
];
