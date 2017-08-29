import { Ng4FilesDropComponent } from './ng4-files-drop.component';

describe('Ng4FilesDropComponent', () => {

    let sut: Ng4FilesDropComponent, mockChangeDetector, mockNg4FilesUtilsService, mockEvent;

    beforeEach(() => {
        mockNg4FilesUtilsService = {
            verifyFiles: jasmine.createSpy('verifyFiles')
                .and.returnValue('VERIFIED')
        };

        mockChangeDetector = {
            detectChanges: jasmine.createSpy('detectChanges')
        };

        mockEvent = {
            stopPropagation: jasmine.createSpy('stopPropagation'),
            preventDefault: jasmine.createSpy('preventDefault')
        };

        sut = new Ng4FilesDropComponent(mockChangeDetector, mockNg4FilesUtilsService);
    });

    it('should set default configId value', () => {
        expect((sut as any).configId).toBe('shared');
    });

    describe('onDragEnter', () => {

        it('should prevent event default behavior', () => {
            const spy = spyOn((sut as any), 'preventEvent');

            sut.onDragEnter(<any>mockEvent);

            expect(spy).toHaveBeenCalledWith(mockEvent);
        });

    });

    describe('onDragOver', () => {

        it('should prevent event default behavior', () => {
            const spy = spyOn((sut as any), 'preventEvent');

            sut.onDragOver(<any>mockEvent);

            expect(spy).toHaveBeenCalledWith(mockEvent);
        });

    });

    describe('onDrop', () => {

        it('should prevent event default behavior', () => {
            const spy = spyOn((sut as any), 'preventEvent');

            sut.onDrop(<any>mockEvent);

            expect(spy).toHaveBeenCalledWith(mockEvent);
        });

        it('should handle files', () => {
            mockEvent.dataTransfer = {
                files: ['MOCK-FILE']
            };
            const spy = spyOn((sut as any), 'dropFilesHandler');

            sut.onDrop(<any>mockEvent);

            expect(spy).toHaveBeenCalledWith(['MOCK-FILE']);
        });

        it('should not handle files if no attachments', () => {
            mockEvent.dataTransfer = {
                files: null
            };
            const spy = spyOn((sut as any), 'dropFilesHandler');

            sut.onDrop(<any>mockEvent);

            expect(spy).not.toHaveBeenCalledWith();
        });

    });

    describe('ngDoCheck', () => {

        it('should emit change detection', () => {
            sut.ngDoCheck();

            expect(mockChangeDetector.detectChanges).toHaveBeenCalled();
        });

    });

    describe('dropFilesHandler', () => {

        it('should emit selected and verified files', () => {
            sut.filesSelect.emit = jasmine.createSpy('emit');

            (sut as any).dropFilesHandler(<any>'MOCK-FILES');

            expect(sut.filesSelect.emit).toHaveBeenCalledWith('VERIFIED');
        });

    });

    describe('preventEvent', () => {

        it('should stop event propagation', () => {
            (sut as any).preventEvent(mockEvent);

            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });

        it('should prevent default', () => {
            (sut as any).preventEvent(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

    });

});
