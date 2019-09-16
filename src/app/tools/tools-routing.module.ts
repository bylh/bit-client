import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { ToolsComponent } from './tools.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {
    path: '',
    component: ToolsComponent,
    children: [{
      path: 'movie',
      component: MovieComponent
    }, {
      path: 'news',
      component: NewsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
