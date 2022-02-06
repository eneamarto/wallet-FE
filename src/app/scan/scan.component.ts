import {Component, Inject, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  date: string;
  amount: number;
}

@Component({
  selector: 'app-scan-component',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  @ViewChild(ZXingScannerComponent) scanner: ZXingScannerComponent | undefined;

  qrResultString: string = '';

  constructor(public dialogRef: MatDialogRef<ScanComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.scanner?.scanStop()

    this.parseURL(resultString)


  }

  parseURL(url: string) {

    url = url.replace(/\s/g, "").trim();

    let regex = RegExp('(?<=&)(.*?)(?=&)|(?<=&)(.*?)(?=$)', 'gmi');

    let result = [...url.matchAll(regex)];

    let objMap = new Map();

    if (result) {

      result.forEach((x) => {

        let parsed_arr = String(x[0]).split('=');

        objMap.set(parsed_arr[0], parsed_arr[1]);

      });

    }

    if (objMap.has('prc')) {

      this.data.amount = Number(objMap.get('prc'));

    }

    if (objMap.has('crtd')) {

      this.data.date = String(objMap.get('crtd').split('T')[0]);

    }

  }

  onNoClick(): void {
    this.scanner?.scanStop();
    this.dialogRef.close();
  }


}
