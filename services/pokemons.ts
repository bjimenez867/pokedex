import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IPokemon } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root',
})
export class Pokemons {
  private readonly URL_BASE = 'https://pokeapi.co/api/v2/pokemon';
  private nextUrl = `${this.URL_BASE}?limit=20&offset=0`;

  getPokemons(){

    // Comprobamos si hay una siguiente url
    if(this.nextUrl){

      
      const options = {
        url: this.nextUrl,
        params: {}
      }

      // Hacemos una peticion
      return CapacitorHttp.get(options).then( async (response: HttpResponse) => {

        console.log(response);
        const pokemons: IPokemon[] = [];
        
        // Datos de la respuesta
        if(response.data){

          // Resultados
          const results = response.data.results;
          // Actualizamos la URL siguiente
          this.nextUrl = response.data.next;

          // Guardamos todas las promesas de las pokemons
          const promises: Promise<HttpResponse>[] = [];

          // Obtenemos cada una de las promesas
          for (const result of results) {
            const urlPokemon = result.url;
            const optionsPokemon = {
              url: urlPokemon,
              params: {}
            }
            promises.push(CapacitorHttp.get(optionsPokemon))
          }

          // Ejecutamos y procesamos todas las promesas
          await Promise.all(promises).then( (responses: HttpResponse[]) => {

            console.log(responses);
            for (const response of responses) {
              // Procesamos un pokemon
              const pokemon = this.processPokemon(response.data);
              pokemons.push(pokemon);
            }
            

          })

        }

        return pokemons;

      })

    }
    return null;
  }

  /**
   * Obtenemos un pokemon
   * @param id 
   * @returns 
   */
  getPokemon(id: number){
    const options = {
      url: `${this.URL_BASE}/${id}`,
      params: {}
    }
    // Hacemos una peticion get
    return CapacitorHttp.get(options).then( (response: HttpResponse) => this.processPokemon(response.data))
  }

  /**
   * Procesa los datos crudos de la PokeApi y los transforma a nuestro modelo IPokemon
   * @param data
   * @returns
   */
  private processPokemon(data: any): IPokemon {

    const pokemon: IPokemon = {
      id: data.id,
      name: data.name,
      type1: data.types[0].type.name,
      type2: data.types[1]?.type.name,
      sprite: data.sprites.front_default,
      height: data.height / 10,
      weight: data.weight / 10,
      abilities: data.abilities
        .filter((a: any) => !a.is_hidden)
        .map((a: any) => a.ability.name),
      hiddenAbility: data.abilities.find((a: any) => a.is_hidden)?.ability.name,
      stats: data.stats.map((s: any) => ({
        base_stat: s.base_stat,
        name: s.stat.name
      }))
    }

    return pokemon;
  }
}
