
export interface Custodian {
    id: string;
    name: string;
    files: File[];
}

export interface FileUploadProgressData {
    currentFilename: string;
    currentFileLength: number;
    currentFileTransferredSoFar: number;
    totalFilesToBeTransferred: number;
}

