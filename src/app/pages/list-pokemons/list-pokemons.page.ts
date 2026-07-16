import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  LoadingController,
  InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';
import { Pokemons } from '../../../../services/pokemons';
import { Router } from '@angular/router';
import { IPokemon } from '../../../../models/pokemon.model';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ]
})
export class ListPokemonsPage {

  private pokemonService: Pokemons = inject(Pokemons);
  private loadingController: LoadingController = inject(LoadingController);  //se crea para mostrar el cargando ver https://ionicframework.com/docs/api/loading
  private router = inject(Router)

  // pokemons a mostrar
  public pokemons: IPokemon[] = [];
  
  //realiza el llamado para traer más pokemones de la lista
  ionViewWillEnter() {
    this.morePokemon();
  }

  /**
   * Pedimos y recogemos mas pokemons, por eso se crea el metodo de forma asincrona, 
   * @param event Evento de scroll
   */
  async morePokemon(event?: InfiniteScrollCustomEvent){

    // Obtengo la promesa
    const promisePokemons = this.pokemonService.getPokemons();

    // si hay mas pokemons, ejecuto la promesa
    if(promisePokemons){

      let loading: any;
      if(!event){
        // Muestro el mensaje de carga
        loading = await this.loadingController.create({
          message: 'Cargando...'
        });
        loading.present();
      }
    
      promisePokemons.then( (pokemons: IPokemon[]) => {
        console.log(pokemons);
        this.pokemons = this.pokemons.concat(pokemons);
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        // Cerramos el mensaje de carga y completamos el scroll
        loading?.dismiss();
        event?.target.complete();
      })

    }else{
      event?.target.complete();
    }

  }
 
 
 //Se llama la pantalla de detalle con el pokemon seleccionado
  goToDetail(pokemon: IPokemon){
    this.router.navigate(['detail-pokemons', pokemon.id])
  }



}
