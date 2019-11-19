import {MatSnackBar} from '@angular/material';
import {DiscoveryService} from './discovery.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolsService} from '../tools/tools.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {

  // TODO 待完善，指定页面功能，服务端开发
  public selectedId: number;
  public segs;
  isLoaded: Boolean = false;

  news: Array<Object> = [];
  newsTypes: Array<Object> = [];
  currentId: String = null;
  selectedIndex = 0;
  expand: Boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private toolsService: ToolsService,
    private discoveryService: DiscoveryService) {
    this.route.paramMap.subscribe(params => console.log('discovery: backId', params.get('backId')));
  }

  async ngOnInit() {
    console.log('disconvery init');
    this.route.paramMap.subscribe((params) => {
      this.selectedId = +params.get('backId');
      console.log(this.selectedId);
    });

    this.newsTypes = await this.toolsService.getNewsTypes();
    await this.getSeg();
  }

  log(args: any[]): void {
    console.log(args);
  }

  async getNews(id: String) {
    try {
      this.isLoaded = false;
      this.currentId = id;
      this.news = await this.toolsService.getNews(id);
      console.log('是否结束this.news', this.news, (this.news as any) === '');
    } catch (err) {
      console.log('getNews error', err);
      this.news = [];
    } finally {
      this.isLoaded = true;
      if (this.expand) {
        console.log('id: id', id);
        this.selectedIndex = this.newsTypes.findIndex(item => (item as any).id === id) + 1;
      }
      console.log('this.index', this.selectedIndex);
    }
  }

  async getSeg() {
    this.currentId = null;
    try {
      this.isLoaded = false;
      this.segs = await this.discoveryService.getSeg();
      console.log(this.segs);
      this.selectedIndex = 0;
    } catch (err) {
      console.log('getSeg(): error', err);
      this.snackBar.open('获取数据失败');
    } finally {
      this.isLoaded = true;
    }
    console.log('测试', this.selectedIndex);
  }

  changeTabPanel(expand) {
    this.expand = expand;
  }
}
