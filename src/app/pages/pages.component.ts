import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { Swiper } from 'swiper';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit, AfterViewInit {

  public year = new Date().getFullYear().toString();
  mySwiper: Swiper;
  constructor( private settingsService: SettingsService ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container');
  }

}
