
import { DBService } from './../../db.service';

import { Location } from '@angular/common';
import { HomeService, Article } from './../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PreviewEditorComponent } from '../preview-editor/preview-editor.component';

import Viewer from 'tui-editor/dist/tui-editor-Viewer';
// import Editor from 'tui-editor';
import { MediaMatcher } from '@angular/cdk/layout';

import 'tui-editor/dist/tui-editor-contents.css'; // editor content
import 'highlight.js/styles/github.css'; // code block highlight

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('preview', {static: false}) preview: ElementRef;

  public id: number;
  public articleId: string;
  public link: string;
  public article: Article;

  // public previewEdit: Editor;
  public viewerMd: Viewer;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  styleSelected = {
    fontSize: null,
    backgroundColor: null
  };

  constructor(
    private homeService: HomeService,
    private dbService: DBService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public snackBar: MatSnackBar,

    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,

    public editDialog: MatDialog) {
    this.route.paramMap.subscribe((params => {
      this.id = +params.get('id');
      console.log('detail id: ', this.id);

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

    }));
    this.route.queryParamMap.subscribe(params => {
      this.link = params.get('link');
      this.articleId = params.get('articleId');
      console.log('articleId: ', this.articleId);
    });
  }

  async ngOnInit() {
    try {
      this.article = await this.homeService.getArticle(this.articleId);
      console.log(this.article);
      // this.previewEdit = Editor.factory({
      //   el: this.preview.nativeElement,
      //   viewer: true,
      //   initialValue: this.article.md,
      //   height: '100%',
      //   width: '100%'
      // });
      // this.previewEdit = new Editor({
      //   el: this.preview.nativeElement,
      //   initialValue: this.article.md,
      //   height: '100%',
      //   // width: '100%'
      // });
      this.viewerMd = new Viewer({
        el: this.preview.nativeElement,
        initialValue: this.article.html
    });
      // if(this.article.md == null && this.article.html != null) { // md 为null但是html存在则显示
      //   (this.preview.nativeElement as Element).innerHTML = this.article.html;
      // }
      // this.previewEdit.setHtml(this.article.html);

    } catch (err) {
    }
  }

  async ngAfterViewInit() {
    if (this.articleId != null) {
      const styleSelected = await this.dbService.get('detail-page-style');
      if (styleSelected != null) {
        this.styleSelected = styleSelected;
      }
      this.changeStyle(); // 不选择不会触发，所以手动调用一次
    }

  }

  back() {
    // this.router.navigate(['tabs/home']);
    this.location.back();
  }
  goPage(url: string) {
    this.router.navigate([url]);
  }

  canDeactivate(): Observable<boolean> | boolean {
    return confirm('确定离开？');
  }

  edit(): void {

    const dialogRef = this.editDialog.open(PreviewEditorComponent, {
      height: '100%',
      width: '100%',
      data: this.article
    });

    dialogRef.afterClosed().subscribe((article: Article) => {
      if (article != null) { // 取消返回null
        // (this.preview.nativeElement as Element).innerHTML = result;
        this.article = article;
        this.viewerMd.setValue(this.article.html);
        // this.previewEdit.setMarkdown(this.article.md);
      }
    });
  }
  async removeArticle(event: Event) {
    // 避免默认处理和向外扩散
    event.stopPropagation();
    event.preventDefault();
    if (!window.confirm('确定删除')) { return; }
    try {
      await this.homeService.removeArticle(this.articleId);
      this.snackBar.open('删除文章成功');
      this.back();
    } catch (err) {
      console.log('错误', err);
      this.snackBar.open('删除文章');
    }
  }

  changeStyle() {
    console.log(this.styleSelected);

    this.preview.nativeElement.children[0].style.fontSize = this.styleSelected.fontSize + 'px';

    this.preview.nativeElement.children[0].style.backgroundColor = this.styleSelected.backgroundColor;

    this.dbService.set('detail-page-style', this.styleSelected);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
