import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message';
import { MessageService } from '../../service/message.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit
{
  messages : Message[];
  
  msgSelected : Message = {
    id : null,
    message : ""
  }

  msgDelete : Message = {
    id : null,
    message : null
  }

  frmAdd: FormGroup;

  constructor(private messageService : MessageService) 
  {
    this.getAll();
  }

  ngOnInit() { }

  getAll()
  {
    this.messageService
        .get()
        .subscribe((data : Message[]) => {
          this.messages = data;
        });
  }

  deleteYes()
  {
    this.messageService
        .delete(this.msgDelete)
        .subscribe((data) =>{
          console.log("ok : ");
          console.log(data);
          this.getAll();
        },
        (error) =>{
          console.log("error : ");
          console.log(error);
        });   
  }

  find(msg : Message)
  {
    this.msgSelected = msg;
  }

  delete(msg : Message)
  {
    this.msgDelete = msg;
  }

  add()
  {    
    if(this.msgSelected.id == null)
    {
      this.messageService
          .add(this.msgSelected)
          .subscribe((data) =>{
            console.log(data);
            this.getAll();
            this.cleanMsg();
          },(error) =>{
            console.log(error);
          });
    }
    else
    {
      this.messageService
          .update(this.msgSelected)
          .subscribe((data : Message) => {
            this.msgSelected = data;
            this.getAll();
            this.cleanMsg();
          },(error) =>{
            console.log(error);
          });
    }
    
  }  

  cleanMsg()
  {
    this.msgSelected.id = null;
    this.msgSelected.message = "";
  }  
}
