import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Custodian, FileUploadProgressData } from '../../types';
import UploadProgress from '../UploadProgress/UploadProgress';

interface CustodianProps {
    custodian: Custodian
}

const CustodianDisplay = ({
    custodian,
}: CustodianProps) => {

    const [custodianName, setCustodianName] = useState('');

    const [fileUploadProgressData, setFileUploadProgressData] = useState<FileUploadProgressData>({
        currentFileLength: 0,
        currentFilename: '',
        currentFileTransferredSoFar: 0,
        totalFilesToBeTransferred: custodian.files.length,
    });

    const [totalCompleted, setTotalCompleted] = useState(0);

    const uploadFiles = async () => {
        // we will mock this
        // for simplicity we will use 10000 for each file as its length
        // and a random setInterval

        let completed = 1;

        for await (const file of custodian.files) {
            const interval = Math.floor(Math.random() * 500) + 200;
            let transferredData = 0;

            do {

                await new Promise((resolve) => setTimeout(resolve, interval));
                transferredData += 500;

                setFileUploadProgressData({
                    ...fileUploadProgressData,
                    currentFileLength: 10000,
                    currentFilename: file.name,
                    currentFileTransferredSoFar: transferredData,
                });

            } while (transferredData <= 10000);

            // we're using a separate state as our mock upload doesn't play nicely with our 
            // fileUploadProgressData state
            setTotalCompleted(completed++);
        }

    }

    return (
        <div className="w-[650px] py-4 px-4 bg-slate-600 rounded-lg mt-1 text-white">
            <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center justify-center">
                <div className="w-36">
                    Custodian name:
                </div>

                <div>
                    <input type="text"
                        className="w-full p-1 rounded text-black"
                        placeholder="Must be at least 3 characters"
                        value={custodianName}
                        readOnly={fileUploadProgressData.currentFilename !== ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCustodianName(e.target.value)}
                    />
                </div>

                <div>
                    <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ` +
                        `${custodianName.length > 2 && fileUploadProgressData.currentFilename === '' ? '' : 'opacity-50 pointer-events-none'}`}
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            uploadFiles();
                        }}>
                        Upload
                    </button>
                </div>

            </div>

            <div className="mt-2 truncate text-ellipsis">
                {
                    custodian.files.map((file, index) => {
                        return (
                            <span key={index}>
                                {`${index > 0 ? ', ' : ''}${file.name}`}
                            </span>
                        )
                    })
                }
            </div>

            <div className="mt-6">
                {
                    totalCompleted !== custodian.files.length &&
                    <UploadProgress
                        uploadProgress={fileUploadProgressData}
                        totalCompleted={totalCompleted}
                    />
                }
                {
                    totalCompleted === custodian.files.length &&
                    <div className="grid grid-cols-[auto_auto] font-bold w-full justify-center gap-x-2">
                        <div>
                            {
                                custodian.files.length > 1 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>

                            }
                        </div>
                        <div>
                            Upload{custodian.files.length > 1 ? 's' : ''} completed
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default CustodianDisplay
