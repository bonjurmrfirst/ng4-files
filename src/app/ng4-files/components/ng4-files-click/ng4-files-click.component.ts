import {
  Component,
  OnInit,
  DoCheck,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  Ng4FilesService,
  Ng4FilesUtilsService
} from '../../services';

import { Ng4FilesSelected } from '../../declarations/ng4-files-selected';

@Component({
    selector: 'ng4-files-click',
    templateUrl: './ng4-files-click.component.html',
    styleUrls: ['./ng4-files-click.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ng4FilesClickComponent implements OnInit, DoCheck {

  @Output() filesSelect: EventEmitter<Ng4FilesSelected> = new EventEmitter<Ng4FilesSelected>();

  public maxFilesCount: number;
  public acceptExtensions: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private ng4FilesService: Ng4FilesService,
    private ng4FilesUtilsService: Ng4FilesUtilsService
  ) {}

  ngDoCheck() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.maxFilesCount = this.ng4FilesService.maxFilesCount;
    this.acceptExtensions = this.ng4FilesService.acceptExtensions;
  }

  public onChange(files: FileList): void {
    this.filesSelect.emit(
      this.ng4FilesUtilsService.verifyFiles(files)
    );
  }

}
