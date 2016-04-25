import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the YoutubeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class YoutubeService {
  static get parameters(){
    return [[Http]]
  }  

  constructor(http) {
    this.http = http;
    this.data = null;
  }

  load(pageToken) {

    return new Promise(resolve => {

      var waitApi = setInterval(function(){

        if (typeof gapi !== "undefined" && gapi.client && gapi.client.youtube) {

          clearInterval(waitApi);

          var query = {
            part: 'snippet',
            channelId: 'UCc-2P5tCezbxegb7gxp6EXg'
          };

          if (pageToken) {
            query.pageToken = pageToken;
          }

          gapi.client.youtube.search.list(query)
            .execute(function(response){
              resolve(response);
            });

        }

      }, 10);
    });

  }
}

