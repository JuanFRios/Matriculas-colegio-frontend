import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  mySwiper: Swiper;
  images: string[]=["/assets/images/carousel/slide1.jpg", "/assets/images/carousel/slide2.jpg", "/assets/images/carousel/slide3.jpg"];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container');
  }
}
