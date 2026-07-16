import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list-pokemons',
    loadComponent: () => import('./pages/list-pokemons/list-pokemons.page').then((m) => m.ListPokemonsPage),
  },
  {
    path: '',
    redirectTo: 'list-pokemons',
    pathMatch: 'full',
  },
  {
    path: 'detail-pokemons/:id',
    loadComponent: () => import('./pages/detail-pokemons/detail-pokemons.page').then( m => m.DetailPokemonsPage)
  },
];
