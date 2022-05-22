import { MealsComponent } from './../components/meals/meals.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.component';
import { PlanComponent } from '@shared/components/plan/plan.component';
import { PreferencesComponent } from '../components/preferences/preferences.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'plan',
        component: PlanComponent
      },
      {
        path: 'preferences',
        component: PreferencesComponent
      },
      {
        path: 'meals',
        component: MealsComponent
      },
      {
        path: '',
        redirectTo: '/tabs/plan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
