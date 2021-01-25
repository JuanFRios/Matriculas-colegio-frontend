import { Component } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Mañana', 'Tarde'];
  public data1 = [];

  constructor(public enrollmentService: EnrollmentService) {
    Swal.fire({
      icon: 'info',
      title: '',
      text: 'Espere por favor...',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let mañana = 0;
    let tarde = 0;
    this.enrollmentService.getEnrollmentsPerDayShift().subscribe(({ enrollments }) => {
      enrollments.filter(m => {
        if (m.group.dayShift === "Mañana") {
          mañana++;
        }else{
          tarde++;
        }
      });
      this.data1 = [
        [mañana, tarde]
      ];
      console.log(this.data1)
      Swal.close();
    });
  }

}
