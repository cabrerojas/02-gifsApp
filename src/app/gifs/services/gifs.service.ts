
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey    : string ="57d4NEX8O2IOigO3MTDDiVurxVcDC971";

  //TODO: Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {
    
    return [...this._historial ];
  }

  constructor( private http: HttpClient){}

  buscarGifs( query:string = ''){

    query = query.trim().toLowerCase();
    
    if ( !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=57d4NEX8O2IOigO3MTDDiVurxVcDC971&q=
    ${ query }&limit=10`)
      .subscribe( ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
        
      });

    
    
  }




}
