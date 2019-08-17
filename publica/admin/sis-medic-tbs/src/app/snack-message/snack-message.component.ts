import { Component, OnInit,Inject } from '@angular/core';
import {MatSnackBarRef,MAT_SNACK_BAR_DATA} from '@angular/material';
@Component({
  selector: 'app-snack-message',
  templateUrl: './snack-message.component.html',
  styleUrls: ['./snack-message.component.css']
})
export class SnackMessageComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<SnackMessageComponent>,@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {


  }
  
  

}
