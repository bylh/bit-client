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

  constructor(private toolsService: ToolsService, private location: Location) { }

  async ngOnInit() {
    this.news = await this.toolsService.getNews();
    console.log('this.news', this.news);
  }

  back() {
    // this.router.navigate(['tabs/home']);
    this.location.back();
  }
}
