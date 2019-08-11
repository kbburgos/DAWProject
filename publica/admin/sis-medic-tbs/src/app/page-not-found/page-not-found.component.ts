import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*function principal(){
      window.open('./home/home.component', 'Diseño Web', "width=300, height=200")
    };
*/
    $('#diente').on('click', function() {
      window.open('./home/home.component' , 'Diseño Web', "width=300, height=200")
    });
  }

}
