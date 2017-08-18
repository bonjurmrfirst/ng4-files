import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public ng4FilesConfig = {
    maxFilesCount: 1
  };
  
  public files: FileList;
  
  public set maxFilesCount(value: string) {
    this.createNg4FilesConfig('maxFilesCount', +value);
  };

  public get maxFilesCount(): string {
    return this.ng4FilesConfig.maxFilesCount.toString();
  };
  
  private createNg4FilesConfig(property: string, value: any): void {
    this.ng4FilesConfig = {
      maxFilesCount: 1
    };

    this.ng4FilesConfig[property] = value;
  };
  
  public onUploadSuccess(files: FileList):void {
    this.files = files;
    console.log(files);
  }

}
