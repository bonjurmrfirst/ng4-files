import { Injectable } from '@angular/core';

import { Ng4FilesService } from './ng4-files.service';

import {
  Ng4FilesConfig,
  Ng4FilesSelected,
  Ng4FilesStatus
} from '../declarations';

@Injectable()
export class Ng4FilesUtilsService {

  constructor(
    private ng4FilesService: Ng4FilesService
  ) {}

  public verifyFiles(files: FileList, verifyExtensions = false): Ng4FilesSelected {
    const filesArray = Array.from(files);

    const maxFilesCount = this.ng4FilesService.maxFilesCount;
    const totalFilesSize = this.ng4FilesService.totalFilesSize;
    const acceptExtensions = this.ng4FilesService.acceptExtensions;

    if (filesArray.length > maxFilesCount) {
      return <Ng4FilesSelected> {
        status: Ng4FilesStatus.STATUS_MAX_FILES_COUNT_EXCEED,
        files: filesArray
      };
    }

    const filesWithExceedSize = filesArray.filter((file: File) => file.size > this.ng4FilesService.maxFileSize);
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

    if (verifyExtensions) { // todo: trow when init config if extension is empty
      const filesNotMatchExtensions = filesArray.filter((file: File) => {
        const fileName = file.name.toLowerCase();
        const extensionsList = acceptExtensions
          .split(', ')
          .map(extension => extension.slice(1))
          .join('|');

        const regexp = new RegExp(`(.*?)\.(${extensionsList})$`);

        return !regexp.test(file.name);
      });

      if (filesNotMatchExtensions.length) {
        return <Ng4FilesSelected> {
          status: Ng4FilesStatus.STATUS_NOT_MATCH_EXTENSIONS,
          files: filesNotMatchExtensions
        };
      }
    }

    return <Ng4FilesSelected> {
      status: Ng4FilesStatus.STATUS_SUCCESS,
      files: filesArray
    };
  }

}
