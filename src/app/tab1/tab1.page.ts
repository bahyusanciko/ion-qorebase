import { Component, OnInit } from '@angular/core';
import { QoreService } from "../service/qore.service";
import {
  ModalController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { CreatePage } from "./create/create.page";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  listData: any
  loading: any
  constructor(
    private api: QoreService,
    public alertController: AlertController,
    public modalController: ModalController,
    private loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.getData()
  }

  async getData(){
    await this.api.getData('allBlogs').then((res) => {
      this.listData = res.nodes
    }).catch((err) => {
      this.alert('ERROR', 'Silahkan Coba lagi');
    });
  }

  async addTodo(){
    const modal = await this.modalController.create({
      component: CreatePage,
    });
    modal.onDidDismiss().then((modalData) => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.ngOnInit()
    }, 2000);
  }

  async alert(status, message) {
    const alert = await this.alertController.create({
      header: status,
      // subHeader: "Subtitle",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

}
