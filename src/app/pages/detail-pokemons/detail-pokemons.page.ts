import { Component, inject, Input, OnInit } from '@angular/core';
import { IonContent, IonImg, IonText, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Pokemons } from '../../../../services/pokemons';
import { IPokemon } from '../../../../models/pokemon.model';

@Component({
  selector: 'app-detail-pokemons',
  templateUrl: './detail-pokemons.page.html',
  styleUrls: ['./detail-pokemons.page.scss'],
  standalone: true,
  imports: [IonContent, IonImg, IonText, IonList, IonItem, IonLabel]
})
export class DetailPokemonsPage implements OnInit {

  private pokemonService: Pokemons = inject(Pokemons);

  @Input() id!: number;

  public pokemon?: IPokemon;

  ngOnInit() {
    this.pokemonService.getPokemon(this.id).then((pokemon: IPokemon) => {
      this.pokemon = pokemon;
    });
  }

}
