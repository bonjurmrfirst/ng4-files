import { NgModule } from '@angular/core';

import { Ng4FilesButtonComponent } from './ng4-files-button';
import { Ng4FilesService } from './services';

@NgModule({
  declarations: [
    Ng4FilesButtonComponent
  ],
  exports: [
    Ng4FilesButtonComponent
  ],
  providers: [
    Ng4FilesService
  ]
})
export class Ng4FilesModule { }
