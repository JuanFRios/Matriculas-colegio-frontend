import { Component, OnInit } from '@angular/core';
import { Degree } from 'src/app/models/degree.model';

import { DegreeService } from 'src/app/services/degree.service';

@Component({
  selector: 'app-gestion-grados',
  templateUrl: './gestion-grados.component.html',
  styleUrls: ['./gestion-grados.component.css']
})
export class GestionGradosComponent implements OnInit {

  public degreesCont: any[] = [];
  public degrees: Degree[];

  constructor(private degreeService: DegreeService) { }

  ngOnInit(): void {
    this.degreeService.getDegrees().subscribe(resp => {
      this.degrees = resp.degrees;
      let degreeObj: {
        degree: Degree;
        imgRoute: string;
      };
      this.degrees.map(degree => {
        degreeObj = {
          degree: new Degree,
          imgRoute: ''
        };
        degreeObj.degree = degree;
        degreeObj.imgRoute = `/assets/images/cards/${ degree.degree }.png`;
        this.degreesCont.push(degreeObj);
        console.log(degree);
      });
    });
  }

}
