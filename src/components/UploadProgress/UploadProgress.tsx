import React, { useEffect, useState } from 'react';
import { FileUploadProgressData } from '../../types';

interface UploadProgressProps {
    uploadProgress: FileUploadProgressData;
    totalCompleted: number;
}

const UploadProgress = (props: UploadProgressProps) => {

    const [currentFilePercent, setCurrentFilePercent] = useState(0);
    const [totalPercent, setTotalPercent] = useState(0);

    useEffect(() => {
        let percent = (props.uploadProgress.currentFileTransferredSoFar * 100) / props.uploadProgress.currentFileLength;
        if (percent > 100) {
            percent = 100;
        }
        setCurrentFilePercent(percent);
    }, [props.uploadProgress.currentFileTransferredSoFar, props.uploadProgress.currentFileLength]);

    useEffect(() => {
        let percent = (props.totalCompleted * 100) / props.uploadProgress.totalFilesToBeTransferred;
        if (percent > 100) {
            percent = 100;
        }
        setTotalPercent(percent);
    }, [props.totalCompleted, props.uploadProgress.totalFilesToBeTransferred]);

    return (
        <div className={`grid grid-cols-[auto_1fr] gap-x-3 gap-y-4 w-full ${props.uploadProgress.currentFilename !== '' ? '' : 'invisible'}`}>
            <div className="w-36 truncate text-ellipsis">
                <span>
                    {props.uploadProgress.currentFilename}
                </span>
            </div>

            <div className="flex w-full bg-slate-300 rounded-lg overflow-hidden">
                <div className="bg-blue-500"
                    style={{
                        width: props.uploadProgress.currentFilename === '' ? 0 : `${currentFilePercent}%`,
                    }}>

                </div>
            </div>

            <div className={`${(props.uploadProgress.totalFilesToBeTransferred === 1 && props.uploadProgress.currentFilename !== '') ? 'hidden' : ''} ` +
                `w-36 truncate text-ellipsis`}>
                {
                    `${props.totalCompleted.toString()} / ${props.uploadProgress.totalFilesToBeTransferred.toString()} files`
                }
            </div>

            <div className={`${(props.uploadProgress.totalFilesToBeTransferred === 1 || props.uploadProgress.currentFilename === '') ? 'hidden' : ''} ` +
                `flex w-full bg-slate-300 rounded-lg overflow-hidden`}>
                <div className="bg-blue-500"
                    style={{
                        width: `${totalPercent}%`,
                    }}>

                </div>
            </div>

        </div >
    )
};

export default UploadProgress
