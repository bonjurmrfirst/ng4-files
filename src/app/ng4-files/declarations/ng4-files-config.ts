export interface Ng4FilesConfig {
  acceptExtensions?: string[] | string;
  maxFilesCount?: number;
  maxFileSize?: number;
  totalFilesSize?: number;
}

export const ng4FilesConfigDefault: Ng4FilesConfig = {
  acceptExtensions: '*',
  maxFilesCount: Infinity,
  maxFileSize: Infinity,
  totalFilesSize: Infinity
};
