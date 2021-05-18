import { Divider } from '@material-ui/core';
import React from 'react';

import { DocumentContext } from '../helpers/DocumentContext';
import { DetailDocumentType } from '../ui/DetailDocumentType';
import { DropZoneDocument } from '../ui/DropZoneDocument';
import { SelectTags } from '../ui/SelectTags';
import { Versioning } from '../ui/Versioning';

export default function UploadDocument({ editMode, setFiles, document, files  }){
    return <>
        <DocumentContext.Provider value={{ setFiles }}>
            <DropZoneDocument document={document} setFiles={setFiles} />
        </DocumentContext.Provider>

        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">

                <Divider />
            </div>
        </div>

        <DetailDocumentType />

        {
            editMode && files?.length > 0 &&
            <Versioning />
        }

        <SelectTags />
    </>
}