import { Component } from '@angular/core';
import { MoviedatabaseService } from '../api/moviedatabase.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  jsonObj: any
  favouriteList: Array<string>
  constructor(private movieDatabaseService: MoviedatabaseService) {
    this.getFavourite();
    this.btnSearchFavouriteMovie();
  }
  public async getFavourite() {
    const { value } = await Storage.get({ key: 'favourite' });
    this.favouriteList = value.split(",").filter(String);
  };

  public async btnSearchFavouriteMovie(): Promise<void> {
    await this.getFavourite();
    var dat = [];
    if (this.favouriteList.length > 0) {
      for(let i=0; i<this.favouriteList.length;i++){
        this.movieDatabaseService
          .searchMovieById(this.favouriteList[i], true)
          .subscribe((data) => {
            dat.push(data['data']);
          });
      }
    }
    this.jsonObj = dat;
  }

  public reload(){
    this.getFavourite();
    this.btnSearchFavouriteMovie();
  }

  async delFavouriteItem(delFavouriteItem: string) {
    const { value } = await Storage.get({ key: 'favourite' });
    let favouriteList: any;
    let favouriteListArr: any;
    if (value != null) {
      favouriteList = value;
    }
    if (delFavouriteItem != null) {
      favouriteListArr = favouriteList.toString().split(",").filter(String);
      favouriteListArr.forEach((value,index)=>{
        if(value==delFavouriteItem) favouriteListArr.splice(index,1);
      });
      await Storage.set({
        key: 'favourite',
        value: favouriteListArr,
      });
    }
  };

}