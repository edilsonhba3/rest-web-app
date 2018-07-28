import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})

export class MessageService 
{

  URL_ENDPOIT = 'http://localhost:8087/api';
 
  constructor(private http: HttpClient) 
  { 
  }

  get()
  {
    return this.http.get(this.URL_ENDPOIT + '/message/getAll');      
  }

  add(msg: Message)
  {
    return this.http.post(this.URL_ENDPOIT + '/message/add', msg);      
  }

  update(msg: Message)
  {
    return this.http.post(this.URL_ENDPOIT + '/message/add', msg);      
  }

  find(id: number)
  {
    return this.http.get(this.URL_ENDPOIT + '/message/fin/' + id);      
  }

  delete(msg: Message)
  {
    return this.http.delete(this.URL_ENDPOIT + '/message/delete/' + msg.id);      
  }
}
