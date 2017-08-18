import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Ng4FilesConfig } from '../declarations';

@Component({
  selector: 'ng4-files-button',
  templateUrl: './ng4files-button.component.html',
  styleUrls: ['./ng4files-button.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ng4FilesButtonComponent {

    @Input() config: Ng4FilesConfig;

    @Output() public uploadSuccess: EventEmitter<FileList> = new EventEmitter<FileList>();

    public onChange(files: FileList): void {
      this.uploadSuccess.emit(files);
    }

}
