import { Component } from '@angular/core';
import { MoviedatabaseService } from '../api/moviedatabase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private movieDatabaseService: MoviedatabaseService) {
    this.selectItem="movies";
    this.randMovieList = this.rand10Items("movies")
    this.randSeriesList = this.rand10Items("series")
    //this.randPeopleList = this.rand10Items("people")
    //this.randCompanyList = this.rand10Items("companies")
  }
  randMovieList: any
  randSeriesList: any
  randPeopleList: any
  randCompanyList: any
  selectItem: string
  public rand10Items(item){
    var dat = [];
    var serie = [121361,343253,347648,360893];
    for (let i = 0; i < 10; i++) {
      if(item=="movies"){
        this.movieDatabaseService.getRand(item,0,1,100000,true).subscribe((data) => {
          dat.push(data['data']);
        });
      }
      if(item=="series"){
        if(serie[i]!=null){
          this.movieDatabaseService
            .getRand(item, serie[i], 1, 50000, true)
            .subscribe((data) => {
                dat.push(data['data']);
            });
        }
      }
      /*if(item=="people"){
        this.movieDatabaseService.getRand(item,1,10000,true).subscribe((data) => {
          dat.push(data['data']);
        });
      }
      if(item=="companies"){
        this.movieDatabaseService.getRand(item,1,1000,true).subscribe((data) => {
          dat.push(data['data']);
        });
      }*/
    }
    return dat;
  }
  public reload(){
    this.randMovieList = this.rand10Items("movies")
    this.randSeriesList = this.rand10Items("series")
  }

}
