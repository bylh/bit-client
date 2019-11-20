import {Injectable} from '@angular/core';
import axios from '../../common/rewrite/axios';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() {
  }
  getDeviceType() {
    const ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      console.log('mobile');
      return 'mobile';
    } else if (/Chrome/i.test(ua)) {
      console.log('chrome');
      return 'chrome';
    } else {
      console.log('desktop-other');
      return 'desktop-other';
    }
  }
  // 获取网站类型
  async getNewsTypes() {
    try {
      const res = await axios.request({
        url: `${environment.NestServerUrl}/news/types`,
        method: 'get',
        params: {}
      });
      const filters = ['知乎', '知乎日报', 'V2EX', 'Segmentfault', 'GitHub', 'ReadHub', '虎扑', '豆瓣'].reverse();
      return (res.data as Array<Object>).sort((a, b) => filters.indexOf((b as any).title) -
        filters.indexOf((a as any).title));
    } catch (err) {
      throw err;
    }
  }

  // 获取各网站头条
  async getNews(id: String) {
    try {
      const res = await axios.request({
        url: `${environment.NestServerUrl}/news`,
        method: 'get',
        params: {id}
      });
      console.log('res.data', res.data);
      return res.data as Array<Object>;
    } catch (err) {
      throw err;
    }
  }

  async getMovies() {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-movie`,
        method: 'get',
        params: {
          count: 20
        }
      });
      console.log('res:', res.data);
      // return res.data.map(value => {
      //   return {

      //   };
      // });
      return res.data.subjects;
    } catch (err) {
      console.log('err:', err);
      throw err;
    }
  }


  async getMarkerList() {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-gate-marketlist`,
        method: 'get',
      });
      console.log('res:', res);
      return res.data.map(coin => {
        return {
          symbol: coin.symbol,
          pair: coin.pair,
          rate: coin.rate,
          rate_percent: coin.rate_percent
        };
      });
    } catch (err) {
      console.log('err:', err);
      throw err;
    }
  }

  async getGateBalances(key: string, secret: string) {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-gate-balances`,
        method: 'post',
        params: {
          gateKey: key,
          gateSecret: secret
        }
      });
      console.log('res:', res, res.data);
      // 从数组迭代出对象
      return Object.entries(res.data.available).map((item => {
        return {coinName: item[0], count: item[1]};
      }));
    } catch (err) {
      console.log('err:', err);
      throw err;
    }
  }

  async getGateCoinAdress(key: string, secret: string, coinName: string) {
    try {
      const res = await axios.request({
        url: `${environment.BaseServerUrl}/get-gate-coinadress`,
        method: 'post',
        params: {
          gateKey: key,
          gateSecret: secret,
          currency: coinName
        }
      });
      console.log('res:', res);
      return res.data.addr;
    } catch (err) {
      console.log('err:', err);
      throw err;
    }
  }
}
