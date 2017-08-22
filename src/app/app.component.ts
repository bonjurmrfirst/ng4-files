import {Component, OnInit} from '@angular/core';

import {
  Ng4FilesService,
  Ng4FilesConfig,
  Ng4FilesStatus,
  Ng4FilesSelected
} from './ng4-files';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public selectedFiles;

  private testConfig0: Ng4FilesConfig = {};

  private testConfig1: Ng4FilesConfig = {
    acceptExtensions: '*'
  };

  private testConfig2: Ng4FilesConfig = {
    acceptExtensions: ['txt', 'jpg']
  };

  private testConfig3: Ng4FilesConfig = {
    acceptExtensions: ['jpg'],
    maxFilesCount: 5
  };

  private testConfig4: Ng4FilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 512000,
    totalFilesSize: 1012000
  };

  constructor(
      private ng4FilesService: Ng4FilesService
  ) {}

  ngOnInit() {
    this.ng4FilesService.addConfig(this.testConfig3);
    this.ng4FilesService.addConfig(this.testConfig4, 'another-config');
  }

  public filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  }

}
