import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {GlobalConstants} from "../common/GlobalConstants";

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css']
})
export class ExportFileComponent {

  apiUrl: string = GlobalConstants.apiUrl;


  exportUrl: string = this.apiUrl + `/transaction_export`;

  constructor(private httpClient: HttpClient) {
  }

  downloadService() {

    const auth_headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.httpClient.get<any>(this.exportUrl, {responseType:"blob" as 'json',headers: auth_headers}).subscribe((data) => {

      saveAs(data,'transaction_history.csv');

      }
    );

  }

}
