import { Routes } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { IncidentListComponent } from './pages/incident-list/incident-list.component';
import { NewIncidentComponent } from './pages/new-incident/new-incident.component';
import { IncidentResponseComponent } from './pages/incident-response/incident-response.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:"login",
        pathMatch:'full'
    },
    {
        path:"login",
        component: LogInPageComponent
    },
    {
        path:"create-account",
        component: CreateAccountPageComponent
    },
    {
        path:"incident-list",
        component: IncidentListComponent
    },
    {
        path:"create-new-incident",
        component: NewIncidentComponent
    },
    {
        path:"edit-incident/:id",
        component: NewIncidentComponent
    },
    {
        path:"respond-to-incident/:id",
        component: IncidentResponseComponent
    }
];
