import { Routes } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { DatabaseComponent } from './components/database/database.component';

export const routes: Routes = [
    { path: '', component: GameScreenComponent},
    { path: 'database', component: DatabaseComponent}
];
