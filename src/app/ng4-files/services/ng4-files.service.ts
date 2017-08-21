import { Injectable } from '@angular/core';

import {
  Ng4FilesConfig,
  ng4FilesConfigDefault
} from '../declarations';

@Injectable()
export class Ng4FilesService {

  private config: { [key: string]: Ng4FilesConfig } = {};

  public addConfig(config: Ng4FilesConfig, configId = 'shared'): void {
    this.setDefaultProperties(config);

    if (config.maxFilesCount < 1) {
      const MAX_FILES_COUNT_MIN_VALUE = 1;
      const MAX_FILES_COUNT_MAX_VALUE = Infinity;

      throw new RangeError(
        `ng4Files: maxFilesCount must be between ${MAX_FILES_COUNT_MIN_VALUE} and ${MAX_FILES_COUNT_MAX_VALUE}`
      );
    }

    // string and !== '*'

    // empty accept extension

    // total < filesize

    if (config.acceptExtensions === '*' || config.acceptExtensions.indexOf('*') !== -1) {
        config.acceptExtensions = '*/*';
    } else {
        config.acceptExtensions = (config.acceptExtensions as string[])
          .map(extension => '.' + extension.toLowerCase()).join(', ');
    }

    this.config[configId] = config;
  }

  public getConfig(configId = 'shared'): Ng4FilesConfig {
    return this.config[configId];
  }

  private setDefaultProperties(config: Ng4FilesConfig): void {
    config.acceptExtensions = config.acceptExtensions || ng4FilesConfigDefault.acceptExtensions;
    config.maxFilesCount = config.maxFilesCount || ng4FilesConfigDefault.maxFilesCount;
    config.maxFileSize = config.maxFileSize || ng4FilesConfigDefault.maxFileSize;
    config.totalFilesSize = config.totalFilesSize || ng4FilesConfigDefault.totalFilesSize;
  }

}
