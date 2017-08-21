import {
  Component,
  DoCheck,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';

import {
  Ng4FilesService,
  Ng4FilesUtilsService
} from '../../services';

import { Ng4FilesSelected } from '../../declarations';

@Component({
    selector: 'ng4-files-drop',
    templateUrl: './ng4-files-drop.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ng4FilesDropComponent implements DoCheck {

  @Input() private configId = 'shared';

  @Output() filesSelect: EventEmitter<Ng4FilesSelected> = new EventEmitter<Ng4FilesSelected>();

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: DragEvent) {
    this.preventEvent(event);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    this.preventEvent(event);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    this.preventEvent(event);

    if (!event.dataTransfer || !event.dataTransfer.files) {
      return;
    }

    this.dropFilesHandler(event.dataTransfer.files);
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private ng4FilesUtilsService: Ng4FilesUtilsService
  ) {}

  ngDoCheck() {
    this.changeDetector.detectChanges();
  }

  private dropFilesHandler(files: FileList) {
    this.filesSelect.emit(
      this.ng4FilesUtilsService.verifyFiles(files, true, this.configId)
    );
  }

  private preventEvent(event: DragEvent): void {
      event.stopPropagation();
      event.preventDefault();
  }

}
