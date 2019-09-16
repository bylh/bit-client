
import { Coin } from './../../common/define';
import { ToolsService } from './tools.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ChatComponent } from './chat/chat.component';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  @ViewChild('bylhChat', {static: false}) chatInstance: ChatComponent;
  gateKey: string;
  gateSecret: string;
  coinName: string;
  address: string;
  displayedColumns: string[] = ['symbol', 'pair', 'rate', 'rate_percent'];
  coins: Array<Coin> = null;
  balances: any;

  chated: boolean = null; // 初次不赋值为null 之后便是true或者false，这样可以判断是不是页面刷新
  constructor(public toolsService: ToolsService, public snackBar: MatSnackBar, public chatDialog: MatDialog) {
  }

  ngOnInit() {
    setInterval(() => {
      if (this.chated === false && this.chatInstance.isOpened() !== false) {
        console.log('检查是否关闭');
        this.chatInstance.close();
      }
    }, 1000 * 60 * 30);


  }

  async getMarkerList() {
    try {
      this.coins = await this.toolsService.getMarkerList();
    } catch (err) {
      console.log('err:', err);
    }
  }

  async getGateBalances() {
    try {
      this.balances = await this.toolsService.getGateBalances(this.gateKey, this.gateSecret);
    } catch (err) {
      console.log('err:', err);
    }
  }

  async getGateCoinAdress() {
    if (this.coinName == null) {
      this.snackBar.open('请输入代币名称');
      return;
    }
    try {
      this.address = await this.toolsService.getGateCoinAdress(this.gateKey, this.gateSecret, this.coinName);
    } catch (err) {
      console.log('err:', err);
    }
  }

  chat() {
    if (this.chated != null && this.chated === false && this.chatInstance.isOpened() == false) {
      this.chatInstance.open();
    }
    this.chated = !this.chated;
  }
}
