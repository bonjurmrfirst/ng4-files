import { Injectable } from '@angular/core';

import { Ng4FilesService } from './ng4-files.service';

import {
    Ng4FilesSelected,
    Ng4FilesStatus
} from '../declarations';

@Injectable()
export class Ng4FilesUtilsService {

    private static getRegExp(extensions: string): RegExp {
        return new RegExp(`(.*?)\.(${extensions})$`);
    }

    constructor(private ng4FilesService: Ng4FilesService) {
    }

    public verifyFiles(files: FileList, configId = 'shared'): Ng4FilesSelected {
        const filesArray = Array.from(files);

        const config = this.ng4FilesService.getConfig(configId);
        const maxFilesCount = config.maxFilesCount;
        const totalFilesSize = config.totalFilesSize;
        const acceptExtensions = config.acceptExtensions;

        if (filesArray.length > maxFilesCount) {
            return <Ng4FilesSelected> {
                status: Ng4FilesStatus.STATUS_MAX_FILES_COUNT_EXCEED,
                files: filesArray
            };
        }

        const filesWithExceedSize = filesArray.filter((file: File) => file.size > config.maxFileSize);
        if (filesWithExceedSize.length) {
            return <Ng4FilesSelected> {
                status: Ng4FilesStatus.STATUS_MAX_FILE_SIZE_EXCEED,
                files: filesWithExceedSize
            };
        }

        let filesSize = 0;
        filesArray.forEach((file: File) => filesSize += file.size);
        if (filesSize > totalFilesSize) {
            return <Ng4FilesSelected> {
                status: Ng4FilesStatus.STATUS_MAX_FILES_TOTAL_SIZE_EXCEED,
                files: filesArray
            };
        }

        const filesNotMatchExtensions = filesArray.filter((file: File) => {
            const extensionsList = (acceptExtensions as string)
                .split(', ')
                .map(extension => extension.slice(1))
                .join('|');

            const regexp = Ng4FilesUtilsService.getRegExp(extensionsList);

            return !regexp.test(file.name);
        });

        if (filesNotMatchExtensions.length) {
            return <Ng4FilesSelected> {
                status: Ng4FilesStatus.STATUS_NOT_MATCH_EXTENSIONS,
                files: filesNotMatchExtensions
            };
        }

        return <Ng4FilesSelected> {
            status: Ng4FilesStatus.STATUS_SUCCESS,
            files: filesArray
        };
    }

}
