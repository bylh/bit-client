import { ToolsService } from './../tools.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: Array<Object> = [];
  newsTypes: Array<Object> = [];
  currentId: String  = null;
  showMore: Boolean = false;

  constructor(private toolsService: ToolsService, private location: Location) { }

  async ngOnInit() {
    this.newsTypes = await this.toolsService.getNewsTypes();
    await this.getNews((this.newsTypes[0] as any) .id);
    console.log('this.news', this.news);
  }

  async getNews(id: String) {
    this.currentId = id;
    this.news = await this.toolsService.getNews(id);
  }

  controlPanel() {
    this.showMore = !this.showMore;
  }

  back() {
    // this.router.navigate(['tabs/home']);
    this.location.back();
  }
}
