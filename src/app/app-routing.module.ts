import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {BestComponent} from './main-menu/best/best.component';
import {TestComponent} from './main-menu/test/test.component';
import {InfoComponent} from './main-menu/info/info.component';
import {MyhouseComponent} from './main-menu/myhouse/myhouse.component';
import {StudyComponent} from './main-menu/study/study.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/main/study', pathMatch: 'full'},
  // { path: 'main', component: MainMenuComponent, data: { state: 'main-menu' }},
  { path: 'main', component: MainMenuComponent, data: { state: 'main-menu' }, children: [
      { path: 'study', component: StudyComponent, data: { state: 'main-menu-study' } },
      { path: 'test', component: TestComponent, data: { state: 'main-menu-test' } },
      { path: 'info', component: InfoComponent, data: { state: 'main-menu-info' } },
      { path: 'best', component: BestComponent, data: { state: 'main-menu-best' } },
      { path: 'myhouse', component: MyhouseComponent, data: { state: 'main-menu-myhouse' } }
    ] },

  { path: 'page-not-found', component: PageNotFoundComponent },

  // routes get parsed from top to bottom so  always put this double asterisk at the end
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true, paramsInheritanceStrategy: 'always', preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
