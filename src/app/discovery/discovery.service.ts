
import { Injectable } from '@angular/core';
import axios from '../../common/rewrite/axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {

  constructor() { }

  async getSeg(count: number = 10) {
    try {
      const res = await axios.get(`${environment.BaseServerUrl}/get-seg`, {
        params: {
          count: count
        }
      });
      return res.data;
    } catch(err) {

    }
  }
  // 获取网站类型
  async getNewsTypes() {
    try {
      const res = await axios.request({
        url: `${environment.GoServerUrl}/newsTags`,
        method: 'get',
        params: {},
        // withCredentials: false // https://segmentfault.com/a/1190000011811117  https://enable-cors.org/server_nginx.html
      });
      const filters = ['ZhiHu', 'ZHDaily', 'V2EX', 'Segmentfault', 'GitHub', 'ReadHub', 'HuPu', 'DouBan'].reverse();
      return (res.data.data as Array<Object>).sort((a, b) => filters.indexOf((b as any).title) -
        filters.indexOf((a as any).title));
    } catch (err) {
      throw err;
    }
  }

  // 获取各网站头条
  async getNews(name: string) {
    try {
      const res = await axios.request({
        url: `${environment.GoServerUrl}/news`,
        method: 'get',
        params: {tag: name},
        // withCredentials: false
      });
      console.log('res.data', res.data);
      return res.data.data as Array<Object>;
    } catch (err) {
      throw err;
    }
  }
}
