import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApiServiceProvider {

  api: string = "https://carlab.azurewebsites.net/";
  get_services: string = "get_services";
  get_categories: string = "get_categories/";
  create_user: string = "create_user";
  update_user: string = "update_user/";
  get_user: string = "get_user/";
  publish_order: string = "create_order";
  get_orders: string = "get_orders/"

  constructor(public http: HttpClient) {  }

  //<!--[Fetch Services From API]-->//
  getServices(){

    return this.http.get( this.api + this.get_services );

  }

  //<!--[Ferch Service Categories]-->//
  getCategories(service_id: string){

    return this.http.get( this.api + this.get_categories + service_id);

  }

  //<!--[Ferch Service Categories]-->//
  createUser(new_user: object){

    return this.http.post(  this.api + this.create_user, new_user);

  }

  //<!--[Update User.]-->//
  updateUser(fireID: string, new_user: object){

    return this.http.post( this.api + this.update_user + fireID, new_user  );

  }

  //<!--[Get User.]-->//
  getUser(fireID: string){

    return this.http.get( this.api + this.get_user + fireID  );

  }

  //<!--[Get Orders By User.]-->//
  getOrders(fireID: string){

    return this.http.get( this.api + this.get_orders + fireID );

  }

  //<!--[Create Order.]-->//
  publishOrder(new_order: object){

    return this.http.post( this.api + this.publish_order, new_order  );

  }

}
