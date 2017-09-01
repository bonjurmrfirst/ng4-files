[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/angular4-files-upload.svg)](https://badge.fury.io/js/angular4-files-upload)
[![Build Status](https://travis-ci.org/bonjurmrfirst/ng4-files.svg?branch=master)](https://travis-ci.org/bonjurmrfirst/ng4-files)

# angular4-files-upload

Upload files by clicking or dragging


## Getting started

`npm i --save angular4-files-upload`

Add following lines into your

**module:**

```typescript
import { Ng4FilesModule } from './ng4-files';
```

add Ng4FilesModule to your module imports section<br/>
```typescript
imports: [ Ng4FilesModule ]
```

<br/>

**component template:**

Upload by click:
```html
<ng4-files-click (filesSelect)="filesSelect($event)">
  <span>Click me to upload</span>
</ng4-files-click>
```

Upload with drag'n'drop:
```html
<ng4-files-drop (filesSelect)="filesSelect($event)">
  <div style="display: inline-block; height: 100px; width: 100px; background-color: gray">
    {{selectedFiles}}
  </div>
</ng4-files-drop>
```

<br/>

**component ts:**
 
```typescript
import {
  Ng4FilesStatus,
  Ng4FilesSelected
} from './ng4-files';
 
...
 
public selectedFiles;
 
public filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
      
      // Hnadle error statuses here
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  }

```

##Configure

To pass config to angular4-files-upload add following lines to you component.ts file:

### Shared Config

```typescript
import {
  Ng4FilesService,
  Ng4FilesConfig,
} from './ng4-files';
 
...
 
constructor(
      private ng4FilesService: Ng4FilesService
  ) {}
 
private testConfig: Ng4FilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };
   
ngOnInit() {
    this.ng4FilesService.addConfig(this.testConfig);
}
```

### Private configs

Config added this way <br>
`this.ng4FilesService.addConfig(this.testConfig);`<br>
is shared config. All components will use it.

But you can add multiple configs for your upload components.<br>
Let's say, you have two upload components and you want to allow user upload just one video and 5(max) images.<br>
To do this create 2 configs and pass it to upload components as named configs.

.ts

```typescript
import {
  Ng4FilesService,
  Ng4FilesConfig,
  Ng4FilesStatus,
  Ng4FilesSelected
} from './ng4-files';
 
 ...
 
public selectedFiles; 
 
private configImage: Ng4FilesConfig = {
    acceptExtensions: ['jpg', 'jpeg'],
    maxFilesCount: 5,
    totalFilesSize: 101200000
  };
  
private configVideo: Ng4FilesConfig = {
    acceptExtensions: ['mp4', 'avi'],
    maxFilesCount: 1
  };  
 
constructor(
      private ng4FilesService: Ng4FilesService
  ) {}

  ngOnInit() {
    this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
    this.ng4FilesService.addConfig(this.configVideo, 'my-video-config');
  }

  public filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }
 
    // Handle error statuses here
 
    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  } 
 
```

.html

```html
<ng4-files-click (filesSelect)="filesSelect($event)" [configId]="'my-image-config'">
  <span>Upload</span>
</ng4-files-click>
 

<ng4-files-drop (filesSelect)="filesSelect($event)" [configId]="'my-video-config'">
  <div style="display: inline-block; height: 100px; width: 100px; background-color: gray">
    {{selectedFiles}}
  </div>
</ng4-files-drop>
```  
  
  
## API

### Config

_acceptExtensions_ <br/>
values: string[] or \'\*\' <br/>
examples: ['ts', 'spec.ts'], ['js'], '*'

_maxFilesCount_: <br/>
values: [number] <br/>

_maxFileSize:_ <br/>
values: [number] (bytes)
 
_totalFilesSize:_ <br/>
values: [number] (bytes)

### Template

<ng4-files-click _(filesSelect)_="YOUR_HANDLER($event)" _[configId]_="YOUR_CONFIG">

_filesSelect_<br> 
emit when files attached and pass Ng4FilesSelected object to YOUR_HANDLER:

```
export enum Ng4FilesStatus {
    STATUS_SUCCESS,
    STATUS_MAX_FILES_COUNT_EXCEED,
    STATUS_MAX_FILE_SIZE_EXCEED,
    STATUS_MAX_FILES_TOTAL_SIZE_EXCEED,
    STATUS_NOT_MATCH_EXTENSIONS
}

export interface Ng4FilesSelected {
  status: Ng4FilesStatus;
  files: File[];
}
```

_! Note on statuses STATUS_MAX_FILE_SIZE_EXCEED or STATUS_NOT_MATCH_EXTENSIONS you get files not passed validation, so you shouldn't filter it manually to find all invalid files._

_configId_<br>
Pass your named config with configId
<br>

## Caveat
Please don't use button tag in template inside ng4-files-click<br>
Don't: ```html
<ng4-files-click>
    <button></button>
</ng4-files-click>```
<br><br>
ng4-files-click content is wrapped in label tag, so prefer something like
````html
<ng4-files-click>
    <span role="button" style="btn">Give me file ^.^</button>
</ng4-files-click>```
````
