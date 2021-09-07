import { Component, OnInit } from '@angular/core';
import { PokerApiService } from 'src/app/service/poker-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public getAllPokemons: any;
  public setAllPokemons: any;

  public apiError: boolean = false;

  constructor(private pokerApiService: PokerApiService) {}

  totalLength: any;
  page:number = 1;

  ngOnInit(): void {
    this.pokerApiService.apiListAllPokemons.subscribe((res) => {
      this.setAllPokemons = res.results;
      this.getAllPokemons = this.setAllPokemons;    
      this.totalLength =   res.results.length;
    }, 
    error =>{
      this.apiError = true
    }
    );
  }

  public getSearch(value: string){
    const filterPokemons = this.setAllPokemons.filter(
      (res: any)=> {
        return !res.name.indexOf(value.toLocaleLowerCase())
      }
    )

    this.getAllPokemons = filterPokemons
  }
}
