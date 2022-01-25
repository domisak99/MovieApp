import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviedatabaseService {

  constructor(private http: HttpClient) { }

  getHeaders(authorized: boolean) {
    let userToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOiIiLCJhcGlrZXkiOiJkZGRhMGNlMS1hNmQ1LTQzNDctOWE2Yy0xYjg4OTUyNzk3MzAiLCJjb21tdW5pdHlfc3VwcG9ydGVkIjp0cnVlLCJleHAiOjE2NDU2ODQ3MDIsImdlbmRlciI6IiIsImlkIjoiMjM1OTg4NyIsImlzX21vZCI6ZmFsc2UsImlzX3N5c3RlbV9rZXkiOmZhbHNlLCJpc190cnVzdGVkIjpmYWxzZSwicGluIjoiR0tRSFdZU0YiLCJ1dWlkIjoiIn0.tIwONm7FgobAcdTXeD0SaKhJ8bNeJ89gsuI1CgijTMNM3lwL5VCL8Ku0kNszDJo8vu5Q4Cs4__VytqGvwsAkBGLjNk1NNzKKnJ3fMDFZAREpuMr1FoFajC4YEjz6ByOCCLkK_h4flgEEelY4cRmY5ZuBwZM3EaK27wk0bvwSr66Wue3l2X_12k0R3ZfhyePHyg8LG6DdWdoR7mZJIsc30yl5eM0fRlYwRoJI6II-Hv5K-av77TgrGkOfprEALKBFR8DFUOtvKys8aRSj3aamHPqGtjmyw8GNJcgNDtgWXdVBs9sxEfiyfQLHsY5FkBbVynZEyPNf0dnKhYkxVAkfGZdJP9EEvnxexjzgJRujv5ZzbrPavBMlz_SSEg9gqsLbgJFEdpCrNm7TeNP5zvwJI02H4unefWT6oBa4Pn4UGX21u995Ceu7Rw1AKmKS01Lm4rkF2b6p7dYwoaTERfdjK81UCHVBvvGxQYrE3u6eZJ3599ZU_La0Q5MaA4COW253D1LyccyvoOb6wfk1EGSRtWZ9jvCULk1Mp6H8M4vy24eldXN1vfCeUAMl9-Li79edSQK3kUXgQT8DUTwzU1KHDX4Bm_PqgXChXuASMOXElqnHXXYT0A4FGD_oGKpJU8ON_njSbE5sU8BeFjoCBDhP-HJ-LR0Z3ryBIEB8qKPtZws';

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (authorized) {
      headers = headers.append('Authorization', 'Bearer ' + userToken);
    }
    return headers;

  }
  
  public searchInDatabase(text: string, type: string, year: number, authorized: boolean = false) {
    if (!isNaN(year) && type == null) {
      return this.http.get('https://api4.thetvdb.com/v4/search?q=' + text + '&year=' + year, { headers: this.getHeaders(authorized) });
    }
    if (isNaN(year) && type != null) {
      return this.http.get('https://api4.thetvdb.com/v4/search?q=' + text + '&type=' + type, { headers: this.getHeaders(authorized) });
    }
    if (!isNaN(year) && type != null) {
      return this.http.get('https://api4.thetvdb.com/v4/search?q=' + text + '&type=' + type + '&year=' + year, { headers: this.getHeaders(authorized) });
    }
    if (isNaN(year) && type == null) {
      return this.http.get('https://api4.thetvdb.com/v4/search?q=' + text, { headers: this.getHeaders(authorized) });
    }
  }

  public getGenres(authorized: boolean = false) {
    return this.http.get('https://api4.thetvdb.com/v4/genres' , { headers: this.getHeaders(authorized) });
  }

  public getGenresByName(id: string, authorized: boolean = false) {
    return this.http.get('https://api4.thetvdb.com/v4/genres/' + id , { headers: this.getHeaders(authorized) });
  }

  public searchMovieById(id: string, authorized: boolean = false) {
    return this.http.get('https://api4.thetvdb.com/v4/movies/' + id + '/extended' , { headers: this.getHeaders(authorized) });
  }

  public getRand(item: string, idSerie:number, min:number, max:number, authorized: boolean = false) {
    if(item=="series"){
      id=idSerie;
    }
    else{
    var id = this.randomIntFromInterval(min, max);
    }
    return this.http.get('https://api4.thetvdb.com/v4/'+ item +'/' + id + '/extended' , { headers: this.getHeaders(authorized) });
  }



  public searchInDatabaseT(text: string, type: string, year: number, authorized: boolean = false) {
    if(type==null){
      type="";
    }
    if(type==null){
      //year="";
    }
    return this.http.get('https://api4.thetvdb.com/v4/search?q=' + text + '&type=' + type + '&year=' + year, { headers: this.getHeaders(authorized) });
  }
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}