import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Ng4FilesModule } from './ng4-files';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng4FilesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
