import { NgModule } from '@angular/core';

import {
  Ng4FilesService,
  Ng4FilesUtilsService
} from './services';

import {
  Ng4FilesClickComponent,
  Ng4FilesDropComponent
} from './components';

@NgModule({
  declarations: [
    Ng4FilesClickComponent,
    Ng4FilesDropComponent
  ],
  exports: [
    Ng4FilesClickComponent,
    Ng4FilesDropComponent
  ],
  providers: [
    Ng4FilesService,
    Ng4FilesUtilsService
  ]
})
export class Ng4FilesModule {
  // todo: except exports Ng4FilesUtilsService
}
