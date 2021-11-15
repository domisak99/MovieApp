import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviedatabaseService {

  constructor(private http: HttpClient) { }
  
  getHeaders(authorized: boolean) {
    let userToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOiIiLCJhcGlrZXkiOiJkZGRhMGNlMS1hNmQ1LTQzNDctOWE2Yy0xYjg4OTUyNzk3MzAiLCJjb21tdW5pdHlfc3VwcG9ydGVkIjp0cnVlLCJleHAiOjE2MzkyNzQ4OTcsImdlbmRlciI6IiIsImlkIjoiMjM1OTg4NyIsImlzX21vZCI6ZmFsc2UsImlzX3N5c3RlbV9rZXkiOmZhbHNlLCJwaW4iOiJHS1FIV1lTRiIsInV1aWQiOiIifQ.cBznN_UA7YxfijSFoHUM44JoRrMlCYuEgl4dTtSO536qE0LX6EmSj_vw0mrUSNwQSDLUy6QN24G78zS_VRTK_8q1U8i7a69t0_TgG56YQn39aHeYdIZ-htZEGdxQkdpWh0NqT-U9Jl-MPO6uYmjJ5rvxJAMhFKPdtcpWZXsIpQWyeSEF4ikoqwk5SgTCTNbCGKv3Tfrn9nzcLsTcv_3cU98W4I1AxcOnZ_FU3ci13OFJtDRx3sQFFqEBdJamXyI91AhyVIODUuDtcic7-yBvbQ2edEyvUJ7BfJ7hDTDnTo0r8xu3-T81Bsjxt1I7N2YHEOCYxi9zTtSZzfgH1T7sjuYOPSszq3X-EsWxvYlGlzZW6juTNpAapAl-mPRcvAk58rv6-eB9rIxIqS1OE6LcgjG1m02uzptaZbcu2ifr217wE4g2DN3DxAw9nqvoa_Qjsxbjt4yLIzpGdtZBUU7GgOO0ZcpqufypzrrcyQVD9ZU-TvAv6EaRDPxN1tP-87jv_hwX4XtKB04KuuuLhcIlODoUNJvHyuMmdBLHhaLzqzHS2J4Q0Y28GQXPSpuOZuOef6I4SxuRTDdlKm09Ko16jMNbBPlkgL1i-poaqYNE9tEiajgx8kdix8Pxl_a2RAJdSnKiNcIP-RnSi5Xn2SlslLYp1I7Om4YBunqIOk0mOes';
    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (authorized) {
        headers = headers.append('Authorization', 'Bearer ' + userToken);
    } 
    return headers;

}

  public SearchInDatabase(text: String, authorized: boolean = false )
  {
    return this.http.get('https://api4.thetvdb.com/v4/search?q='+text, { headers: this.getHeaders(authorized) });
  }
  public getMovieInfo(text: String, authorized: boolean = false )
  {
    return this.http.get('https://api4.thetvdb.com/v4/search?q='+text+'&type=movie', { headers: this.getHeaders(authorized) });
  }

}