[![https://nodei.co/npm/angular4-files-upload.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/angular4-files-upload.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/angular4-files-upload)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/angular4-files-upload.svg)](https://badge.fury.io/js/angular4-files-upload)
[![Build Status](https://travis-ci.org/bonjurmrfirst/ng4-files.svg?branch=master)](https://travis-ci.org/bonjurmrfirst/ng4-files)

[Project is not supported]

# angular4-files-upload

Upload files by clicking or dragging.

### Table of contents

* [Getting started](#getting-started)
* [Files Upload Config](#files-upload-config)
  + [Shared Config](#shared-config)
  + [Private Config](#private-config)
* [API](#api)
    - [`<ng4-files-click>`](#ng4-files-click)
    - [`filesSelect: (Ng4FilesSelected) => void`](#filesselect-ng4filesselected-void)
    - [`configId?: string`](#configid-string)
  + [Ng4FilesConfig](#ng4filesconfig)
    - [`acceptExtensions: string[]`](#acceptextensions-string)
    - [`maxFilesCount: number`](#maxfilescount-number)
    - [`maxFileSize: number`](#maxfilesize-number)
    - [`totalFilesSize: number`](#totalfilessize-number)
  + [Ng4FilesStatus](#ng4filesstatus)
    - [STATUS_SUCCESS](#status_success)
    - [STATUS_MAX_FILES_COUNT_EXCEED](#status_max_files_count_exceed)
    - [STATUS_MAX_FILE_SIZE_EXCEED](#status_max_file_size_exceed)
    - [STATUS_MAX_FILES_TOTAL_SIZE_EXCEED](#status_max_files_total_size_exceed)
    - [STATUS_NOT_MATCH_EXTENSIONS](#status_not_match_extensions)
* [Warning: `button` usage within the component](#warning-button-usage-within-the-component)
* [License](#license)

## Getting started

`npm i -save angular4-files-upload`

1. Add the file upload module in your **main module:**

```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { Ng4FilesModule } from 'angular4-files-upload';

@NgModule({
  imports: [ Ng4FilesModule ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```


2. Add file upload to your **component template:**


* For click-upload use `ng4-files-click`:

```html
<ng4-files-click (filesSelect)="filesSelect($event)">
  <span>Upload a file</span>
</ng4-files-click>
```

* For drag-and-drop-upload use `ng4-files-drop`:

```html
<ng4-files-drop (filesSelect)="filesSelect($event)">
  <div>
    {{selectedFiles}}
  </div>
</ng4-files-drop>
```


3. Finally, add the upload handler to your **component:**
 
```typescript
import { Component, OnInit } from '@angular/core';
import { Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';

@Component({
  selector: 'app-my-file-uploader',
  templateUrl: './my-file-uploader.html',
  styleUrls: ['./my-file-uploader.scss'],
})
export class MyFileUploaderComponent implements OnInit {
  ngOnInit() {}

  filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      console.error(`Files upload error: ${selectedFiles.status}`);
      console.error('Files could not be uploaded.');
    } else {
      console.info(`Files uploaded: ${selectedFiles.files}`);
    }
  }
}
```

## Files Upload Config

You can specify additional configuration for files upload via `Ng4FilesService`: 

### Shared Config

You can specify a shared config to be used by all file upload components in your application.

```typescript
import { Component, OnInit } from '@angular/core';
import { Ng4FilesService, Ng4FilesConfig} from 'angular4-files-upload';

@Component({
  selector: 'app-my-file-uploader',
  templateUrl: './my-file-uploader.html',
  styleUrls: ['./my-file-uploader.scss'],
})
export class MyFileUploaderComponent implements OnInit {
  public sharedConfig: Ng4FilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };

  constructor(
    private n4FilesService: Ng4FilesService
  ) {}

  ngOnInit() {
    this.setFilesUploadSharedConfig();
  }

  setFilesUploadSharedConfig(): void {
    this.n4FilesService.addConfig(this.sharedConfig);
  }
}
```

### Private Config

To limit a config's scope component, use a ***private config***. You can add a private config by adding a ***configId*** to both config declaration, and then to the file upload component in your templates.

```html
<ng4-files-click
  (filesSelect)="filesSelect($event)"
  [configId]="'my-private-config'"
>
  <span>Upload a file</span>
</ng4-files-click>
```  

```typescript
import { Component, OnInit } from '@angular/core';
import { Ng4FilesService, Ng4FilesConfig} from 'angular4-files-upload';

@Component({
  selector: 'app-my-file-uploader',
  templateUrl: './my-file-uploader.html',
  styleUrls: ['./my-file-uploader.scss'],
})
export class MyFileUploaderComponent implements OnInit {
  public myPrivateConfig: Ng4FilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };

  constructor(
    private n4FilesService: Ng4FilesService
  ) {}

  ngOnInit() {
    this.setFilesUploadPrivateConfig();
  }

  filesSelect(): void {}

  setFilesUploadPrivateConfig(): void {
    this.n4FilesService.addConfig(this.myPrivateConfig, 'my-private-config');
  }
}
```
  
  
## API

#### `<ng4-files-click>`

#### `filesSelect: (Ng4FilesSelected) => void`

> Upload event handler. Fired after all of the files are uploaded or an upload interrupt occurs.

#### `configId?: string`

> Optional, private config id.

### Ng4FilesConfig

#### `acceptExtensions: string[]`

> A list of accepted file extensions.

#### `maxFilesCount: number`

> Max amount of accepted files.

#### `maxFileSize: number`

> Max uploaded filesize (in bytes).

#### `totalFilesSize: number`

> Max combined uploaded files size (in bytes).

### Ng4FilesStatus

> Files upload status enum

#### STATUS_SUCCESS

> Upload succeeded.

#### STATUS_MAX_FILES_COUNT_EXCEED

> Uploaded files exceeded maximum allowed files number.

#### STATUS_MAX_FILE_SIZE_EXCEED

> Uploaded file exceeded maximum allowed filesize.

#### STATUS_MAX_FILES_TOTAL_SIZE_EXCEED

> Uploaded files exceeded maximum allowed total files size.

#### STATUS_NOT_MATCH_EXTENSIONS

> Uploaded file has an unallowed extension.


## Warning: `button` usage within the component

Since the `<ng4-files-click>` upload component is constructed using a `<label>` element,
you ***should not*** use `<button>` elements within the `<ng4-files-click>`. 

Use `<span>` or another alternative:

```html
<ng4-files-click>
  <span role="button" style="styled-button">
    Upload a file
  </button>
</ng4-files-click>``
```

## License

[MIT](https://opensource.org/licenses/MIT)
