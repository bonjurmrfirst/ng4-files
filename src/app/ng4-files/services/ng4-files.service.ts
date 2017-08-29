import { Injectable } from '@angular/core';

import {
    Ng4FilesConfig,
    ng4FilesConfigDefault
} from '../declarations';

@Injectable()
export class Ng4FilesService {

    private static readonly ERROR_MSG_PREFIX = 'ng4Files:';

    private configs: { [key: string]: Ng4FilesConfig } = {};

    private static throwError(
        msg: string,
        type: 'default' | 'range' | 'syntax' | 'reference' = 'default'
    ): never {
        const fullMsg = `${Ng4FilesService.ERROR_MSG_PREFIX} ${msg}`;

        switch (type) {
            case 'default':
                throw new Error(fullMsg);
            case 'range':
                throw new RangeError(fullMsg);
            case 'syntax':
                throw new SyntaxError(fullMsg);
            case 'reference':
                throw new ReferenceError(fullMsg);
        }
    }

    public addConfig(config: Ng4FilesConfig, configId = 'shared'): void {
        this.newConfigVerifyPipeline(config);
        this.configs[configId] = config;
    }

    public getConfig(configId = 'shared'): Ng4FilesConfig {
        if (configId === 'shared' && !this.configs['shared']) {
            this.configs['shared'] = <Ng4FilesConfig>{};
            this.setDefaultProperties(this.configs['shared']);
        }

        if (!this.configs[configId]) {
            Ng4FilesService.throwError(`Config '${configId}' is not found`, 'reference');
        }

        return this.configs[configId];
    }

    private newConfigVerifyPipeline(config): void {
        this.isUnique(config)
            .setDefaultProperties(config)
            .isFilesCountValid(config)
            .isAcceptExtensionsValid(config)
            .isFileSizeRangesValid(config)
            .transformAcceptExtensions(config);
    }

    private isUnique(config): Ng4FilesService {
        const isConfigExist = Object.keys(this.configs).find((key: string) => this.configs[key] === config);
        if (isConfigExist) {
            Ng4FilesService.throwError('Avoid add the same config more than once');
        }

        return this;
    }

    private setDefaultProperties(config: Ng4FilesConfig): Ng4FilesService {
        config.acceptExtensions = config.acceptExtensions || ng4FilesConfigDefault.acceptExtensions;
        config.maxFileSize = config.maxFileSize || ng4FilesConfigDefault.maxFileSize;
        config.totalFilesSize = config.totalFilesSize || ng4FilesConfigDefault.totalFilesSize;
        config.maxFilesCount = config.maxFilesCount === 0 ?
            config.maxFilesCount :
            config.maxFilesCount || ng4FilesConfigDefault.maxFilesCount;

        return this;
    }

    private isFilesCountValid(config): Ng4FilesService {
        if (config.maxFilesCount < 1) {
            const FILES_COUNT_MIN = 1;
            const FILES_COUNT_MAX = Infinity;

            Ng4FilesService.throwError(`maxFilesCount must be between ${FILES_COUNT_MIN} and ${FILES_COUNT_MAX}`, 'range');
        }

        return this;
    }

    private isAcceptExtensionsValid(config): Ng4FilesService {
        if (typeof config.acceptExtensions === 'string' && config.acceptExtensions !== '*') {
            Ng4FilesService.throwError(`acceptanceExtensions type must be "*" or string[]`, 'syntax');
        }

        return this;
    }

    private isFileSizeRangesValid(config): Ng4FilesService {
        if (config.maxFileSize > config.totalFilesSize) {
            Ng4FilesService.throwError('maxFileSize must be less than totalFilesSize', 'range');
        }

        return this;
    }

    private transformAcceptExtensions(config): Ng4FilesService {
        if (
            config.acceptExtensions === '*' ||
            config.acceptExtensions.indexOf('*') !== -1 ||
            Array.isArray(config.acceptExtensions) && config.acceptExtensions.length === 0
        ) {
            config.acceptExtensions = '*/*';
        } else {
            config.acceptExtensions = (config.acceptExtensions as string[])
                .map(extension => '.' + extension.toLowerCase()).join(', ');
        }

        return this;
    }

}
