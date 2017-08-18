import { Component, OnInit } from '@angular/core';

import { Ng4FilesService } from './ng4-files/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public ng4FilesConfig = {
    maxFilesCount: 1
  };

  public files: FileList;

  constructor(private ng4FilesService: Ng4FilesService) {
  }

  ngOnInit() {
      this.ng4FilesService.init(this.ng4FilesConfig);
  }

  public onUploadSuccess(files: FileList): void {
    this.files = files;
    console.log(files);
  }

}
