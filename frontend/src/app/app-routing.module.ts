import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './comps/game/game.component';

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: '', pathMatch: 'full', redirectTo: 'game'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
