import { Injectable } from '@angular/core';

import { Ng4FilesConfig } from '../declarations';

@Injectable()
export class Ng4FilesService {

  private _config: Ng4FilesConfig;

  public get config(): Ng4FilesConfig {
      return this._config;
  };

  public init(config: Ng4FilesConfig) {
      this._config = config;
  }

}
