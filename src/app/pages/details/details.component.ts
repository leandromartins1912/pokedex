import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//Services
import { PokerApiService } from 'src/app/service/poker-api.service';
import { urlPokemon, urlPokemonName } from '../../../app.api'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'], 
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [
      style({ transform: 'translateY(-100%)' }), animate('0.5s 300ms ease-in')])      
    ]), 
    trigger('EnterLeave', [
        transition(':enter', [
        style({ transform: 'translateX(-180%)' }),
        animate('0.5s 250ms ease-in')
      ])
    ]),
    trigger('Enter', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s 300ms ease-out')
      ])
    ])
  ]
})
export class DetailsComponent implements OnInit {

 /* private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';*/

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokerApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(`${urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${urlPokemonName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error => {
        this.apiError = true;
      }
    );
  }
}