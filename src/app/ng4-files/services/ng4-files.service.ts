import {Injectable} from '@angular/core';

import {Ng4FilesConfig, Ng4FilesErrors} from '../declarations';

@Injectable()
export class Ng4FilesService {

    private _config: Ng4FilesConfig;

    public get config(): Ng4FilesConfig {
        return this._config;
    };

    public init(config: Ng4FilesConfig) {
        this._config = config;
    }

    /**
     * Convert extensions to <input> accept format
     *
     * @returns {string}
     */
    public get acceptedExtensions(): string {
        const acceptExt = this._config.acceptedExtensions;
        if (acceptExt.indexOf('*') !== -1 || acceptExt.indexOf('**') !== -1) {
            return '*/*'
        }

        return this.config.acceptedExtensions.map(extension => '.' + extension).join(', ');
    }

    /**
     * Verify that single file doesn't exceed max size and verify total files size
     *
     * @param {FileList} files
     * @returns {boolean}
     */
    public verifyUpload(files: FileList): Ng4FilesErrors | true {
        // Check if file exceed max size
        const filesNotVerified = Array.from(files).filter(file => file.size > this.config.maxFileSize);

        if (filesNotVerified.length) {
            return Ng4FilesErrors.EXCEEDED_FILE_SIZE;
        }

        // Check if total size exceed maxTotalSize
        let totalFileSize = 0;
        Array.from(files).forEach(file => totalFileSize += file.size);

        return totalFileSize > this.config.maxTotalSize ? Ng4FilesErrors.EXCEEDED_TOTAL_SIZE : true;
    }

}
