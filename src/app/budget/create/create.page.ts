import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AlertController, LoadingController } from "@ionic/angular";
import { QoreService } from "../../service/qore.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  loading:any
  constructor(
    private api: QoreService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async createData(form){
    this.loading = await this.loadingController.create({
      message: "Loading data from api",
    });
    this.api
      .createData(`allBudgets`, form.value)
      .then((res: any) => {
        this.alert('Success', 'Created Your Data');
        this.closeModal();
        this.loading.dismiss();
      })
      .catch((err) => {
        this.loading.dismiss();
        this.alert('ERROR', 'Silahkan Coba lagi');
      });
    this.loading.present();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async alert(status, ress) {
    const alert = await this.alertController.create({
      header: status,
      message: ress,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
