import { Component, OnInit } from '@angular/core';

import { DegreeService } from 'src/app/services/degree.service';

@Component({
  selector: 'app-gestion-grados',
  templateUrl: './gestion-grados.component.html',
  styleUrls: ['./gestion-grados.component.css']
})
export class GestionGradosComponent implements OnInit {

  public degrees;
  constructor(private degreeService: DegreeService) { }

  ngOnInit(): void {
    this.degreeService.getDegrees().subscribe(resp => {
      this.degrees = resp.degrees
    });
  }

}
