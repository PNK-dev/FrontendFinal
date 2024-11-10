import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NotasComponent } from './component/notas/notas.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Pagina Principal'
    },
    {
        path:'notas',
        component: NotasComponent,
        title:'Soy notas'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
