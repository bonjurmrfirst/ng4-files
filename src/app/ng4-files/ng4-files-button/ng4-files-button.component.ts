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

import {Ng4FilesService} from '../services';
import {Ng4FilesConfig, Ng4FilesErrors} from '../declarations';

@Component({
    selector: 'ng4-files-button',
    templateUrl: './ng4-files-button.component.html',
    styleUrls: ['./ng4-files-button.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ng4FilesButtonComponent implements OnInit, DoCheck {

    @Input() public caption: string;
    @Input() public addClass: string;

    @Output() public uploadSuccess: EventEmitter<FileList> = new EventEmitter<FileList>();
    @Output() public uploadFailed: EventEmitter<Ng4FilesErrors> = new EventEmitter<Ng4FilesErrors>();

    public config: Ng4FilesConfig;
    public acceptedExtensions: string;

    constructor(private ng4FilesService: Ng4FilesService,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.config = this.ng4FilesService.config;
        this.acceptedExtensions = this.ng4FilesService.acceptedExtensions;
    }

    ngDoCheck() {
        this.changeDetector.detectChanges();
    }

    public onChange(files: FileList) {
        console.log(this.ng4FilesService.verifyUpload(files));
        console.log(event);
        // todo: error

        const isVerified = this.ng4FilesService.verifyUpload(files);

        return isVerified ? this.uploadSuccess.emit(files) : isVerified
    }

}
