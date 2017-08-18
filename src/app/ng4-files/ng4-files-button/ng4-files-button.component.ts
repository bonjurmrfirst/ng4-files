import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnInit,
  DoCheck
} from '@angular/core';

import { Ng4FilesService } from '../services';
import { Ng4FilesConfig } from '../declarations';

@Component({
  selector: 'ng4-files-button',
  templateUrl: './ng4files-button.component.html',
  styleUrls: ['./ng4files-button.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ng4FilesButtonComponent implements OnInit, DoCheck {

    @Input() public caption: string;
    @Input() public addClass: string;

    @Output() public uploadSuccess: EventEmitter<FileList> = new EventEmitter<FileList>();

    public config: Ng4FilesConfig;

    constructor(
      private ng4FilesService: Ng4FilesService,
      private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.config = this.ng4FilesService.config;
    }

    ngDoCheck() {
      this.changeDetector.detectChanges();
    }

    public onChange(event) {
      // todo: error
      this.uploadSuccess.emit(event);
    }

}
