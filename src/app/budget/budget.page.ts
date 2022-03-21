import { Component, OnInit } from '@angular/core';
import { QoreService } from "../service/qore.service";
import {
  ModalController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { CreatePage } from "./create/create.page";

@Component({
  selector: 'app-budget',
  templateUrl: 'budget.page.html',
  styleUrls: ['budget.page.scss']
})
export class BudgetPage implements OnInit {
  listData: any
  loading: any
  TotalIncome:number = 0
  TotalExpense: number = 0
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
    const loading = await this.loadingController.create({
      duration: 2000,
    });
    await loading.present();
    await loading.onDidDismiss();
    await this.api.getData('allBudgets').then((res) => {
      this.listData = res.nodes
      this.listData.forEach(element => {
        if (element.type === 'income') {
          this.TotalIncome += element.price * element.amount
        }else{
          this.TotalExpense += element.price * element.amount
        }
      });
      console.log(this.listData)
    }).catch((err) => {
      this.alert('ERROR', 'Silahkan Coba lagi');
    });
  }

  async addTodo(){
    const modal = await this.modalController.create({
      component: CreatePage,
    });
    modal.onDidDismiss().then((modalData) => {
      this.listData = []
      this.TotalIncome = 0
      this.TotalExpense = 0
      this.getData();
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
