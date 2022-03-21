import { Injectable } from '@angular/core';
import { QoreClient, ProjectSchema } from "@feedloop/qore-client";
import { BehaviorSubject } from "rxjs";
import config from "../qore.config.json";
// import schema from "./qore-schema.json";

const client = new QoreClient<ProjectSchema>(config);
// client.init(schema as any);

@Injectable({
  providedIn: 'root'
})
export class QoreService {
  authSubject = new BehaviorSubject(false);
  constructor() { }

  async getData(table) {
    return await client
      .view(table)
      .readRows({ offset: 0, updatedAt: "desc" })
      .toPromise().then((res) => {
        this.authSubject.next(true);
        console.log(res)
        return res.data
      }).catch((err) => {
        this.authSubject.next(false);
        return err
      });
  }

  async createData(table,data){
    return await client.view(table).insertRow({ ...data }).then((res) => {
      this.authSubject.next(true);
      console.log(res)
      return res.data
    }).catch((err) => {
      this.authSubject.next(false);
      return err
    });
  }

}
