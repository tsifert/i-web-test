import React,
{ MouseEvent, useRef, ReactElement, DragEvent, ChangeEvent, useState } from 'react';
import CustodianDisplay from '../CustodianDisplay';
import { getRandomId } from '../../lib/utils';
import { Custodian } from '../../types';

enum DragPrompt {
    notDragging = 'Drag and drop files here OR click to select',
    draggingFile = 'DROP FILES HERE',
    draggingInvalid = 'Only files may be dropped!',
}

const FileDrop = (): ReactElement => {

    const hiddenFileInputRef = useRef<HTMLInputElement>(null);

    const [custodians, setCustodians] = useState<Custodian[]>([]);

    const [dragMessage, setDragMessage] = useState<DragPrompt>(DragPrompt.notDragging);

    const handleFilesSelected = (files: File[]): void => {
        // create a new Custodian entry and add to our state
        const newCustodianEntry: Custodian = {
            id: getRandomId(),
            name: '',
            files: files,
        };

        setCustodians([
            ...custodians, newCustodianEntry
        ]);
    };

    return (
        <div>
            <div className="grid grid-rows-[1fr] w-[650px] h-20 cursor-pointer bg-slate-300 hover:bg-slate-400 rounded-lg 
            items-center justify-center"
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.preventDefault();
                    hiddenFileInputRef.current?.click();
                }}
                onDragEnter={(e: DragEvent) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setDragMessage(
                        e.dataTransfer?.types?.indexOf('Files') === 0 ?
                            DragPrompt.draggingFile :
                            DragPrompt.draggingInvalid
                    );
                }}
                onDragLeave={(e: DragEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragMessage(DragPrompt.notDragging)
                }}
                onDrop={(e: DragEvent) => {
                    e.preventDefault();

                    e.dataTransfer?.types?.indexOf('Files') === -1 ?
                        DragPrompt.draggingFile :
                        DragPrompt.draggingInvalid
                    setDragMessage(DragPrompt.notDragging);

                    if (e.dataTransfer?.types?.indexOf('Files') === 0) {
                        handleFilesSelected([...e.dataTransfer.files]);
                    }
                }}
                onDragOver={(e: DragEvent) => {
                    e.preventDefault();
                }}
            >
                <div className="grid grid-cols-[auto_auto] gap-x-3 items-center pointer-events-none">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg>
                    </div>
                    <div>
                        {
                            dragMessage
                        }
                    </div>
                </div>
            </div>
            <div className="hidden">
                <input
                    ref={hiddenFileInputRef}
                    type="file"
                    multiple={true}
                    name="files[]"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        if (hiddenFileInputRef.current?.files) {
                            handleFilesSelected([...hiddenFileInputRef.current.files]);
                        }
                    }}
                />
            </div>
            {
                custodians.map((custodianEntry) => {
                    return (
                        <CustodianDisplay
                            key={custodianEntry.id}
                            custodian={custodianEntry}
                        />
                    )
                })
            }
        </div>
    )
};

export default FileDrop;
