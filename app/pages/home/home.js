import {Page} from 'ionic-angular';
import {YoutubeService} from '../../providers/youtube-service/youtube-service';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [YoutubeService]
})
export class HomePage {

	static get parameters() {
    return [[YoutubeService]];
  }

  constructor(youtubeService) {
    this.videos = [];
  	this.youtubeService = youtubeService;
  	this.load();
  }

  load(pageToken, infiniteScroll) {

    this.youtubeService.load(pageToken)
      .then(response => {
        
        this.nextPageToken = response.nextPageToken;

        console.log(response.items);
        
        for (var i = 0; i < response.items.length; i++) {
          this.videos.push(response.items[i]);
        };

        if (infiniteScroll) {
          infiniteScroll.complete();
        }

      });

  }

  more(infiniteScroll) {

    if (!this.nextPageToken) {
      return;
    }

    this.load(this.nextPageToken, infiniteScroll);

  }

}
