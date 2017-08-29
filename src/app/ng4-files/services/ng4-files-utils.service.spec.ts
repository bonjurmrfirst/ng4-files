import { Ng4FilesUtilsService } from './ng4-files-utils.service';

import {
    Ng4FilesStatus,
    Ng4FilesConfig
} from '../declarations';

describe('Ng4FilesUtilsService', () => {

    let sut: Ng4FilesUtilsService, mockNg4FilesService, mockFiles;

    beforeEach(() => {
        mockFiles = [
            { name: 'name.py' },
            { name: 'name.py.tpl' },
            { name: '.gitignore' }
        ];

        const mockConfig: Ng4FilesConfig = {
            maxFilesCount: 5,
            maxFileSize: 1111,
            totalFilesSize: 2222,
            acceptExtensions: 'py, py.tpl, gitignore'
        };

        mockNg4FilesService = {
            getConfig: jasmine.createSpy('getConfig')
                .and.returnValue(mockConfig)
        };

        sut = new Ng4FilesUtilsService(mockNg4FilesService);
    });

    describe('getRegExp', () => {

        it('should return proper regExp', () => {
            const result = (Ng4FilesUtilsService as any).getRegExp('MOCK-EXTENSION');

            expect(result).toEqual(/(.*?).(MOCK-EXTENSION)$/);
        });

    });

    describe('verifyFiles', () => {

        it('should get default config if configId is not present', () => {
            sut.verifyFiles(mockFiles);

            expect(mockNg4FilesService.getConfig).toHaveBeenCalledWith('shared');
        });

        it('should get proper config by id', () => {
            sut.verifyFiles(mockFiles, 'MOCK-CONFIG-ID');

            expect(mockNg4FilesService.getConfig).toHaveBeenCalledWith('MOCK-CONFIG-ID');
        });

        it('should return proper status if attached files count > maxFilesCount', () => {
            mockFiles = mockFiles.concat([{}, {}, {}]);

            const result = sut.verifyFiles(mockFiles);

            expect(result).toEqual({
                status: Ng4FilesStatus.STATUS_MAX_FILES_COUNT_EXCEED,
                files: jasmine.objectContaining([...mockFiles])
            });
        });

        it('should return proper status and invalid files if size exceed maxFileSize', () => {
            mockFiles[0].size = 2222;

            const result = sut.verifyFiles(mockFiles);

            expect(result).toEqual({
                status: Ng4FilesStatus.STATUS_MAX_FILE_SIZE_EXCEED,
                files: jasmine.objectContaining([{
                    name: 'name.py',
                    size: 2222
                }])
            });
        });

        it('should return proper status and all files if total size exceed maxTotalSize', () => {
            mockFiles[0].size = 1111;
            mockFiles[1].size = 1111;
            mockFiles[2].size = 1111;

            const result = sut.verifyFiles(mockFiles);

            expect(result).toEqual({
                status: Ng4FilesStatus.STATUS_MAX_FILES_TOTAL_SIZE_EXCEED,
                files: jasmine.objectContaining(mockFiles)
            });
        });

        it('should return proper status and invalid files if not match extensions', () => {
            mockFiles.push({
                name: 'invalid-file.exe'
            });

            const result = sut.verifyFiles(mockFiles);

            expect(result).toEqual({
                status: Ng4FilesStatus.STATUS_NOT_MATCH_EXTENSIONS,
                files: jasmine.objectContaining([{
                    name: 'invalid-file.exe'
                }])
            });
        });

        it('should return proper status and files on success', () => {
            const result = sut.verifyFiles(mockFiles);

            expect(result).toEqual({
                status: Ng4FilesStatus.STATUS_SUCCESS,
                files: jasmine.objectContaining(mockFiles)
            });
        });

    });

});
