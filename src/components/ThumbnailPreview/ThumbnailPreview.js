import React from "react";

// UI
import { Delete, Visibility } from "@material-ui/icons";
import { ThumbnailPreviewIcon, ThumbnailPreviewIconsHolder, ThumbnailPreviewImage, ThumbnailPreviewName, ThumbnailPreviewNameWrapper, ThumbnailPreviewWrapper } from "./styled";
import Skeleton from '@material-ui/lab/Skeleton';

// Styled


const ThumbnailPreview = ({ thumbnail, name, preview, remove }) => {

  return (
    <ThumbnailPreviewWrapper>
      <ThumbnailPreviewIconsHolder>
        {preview &&
          <ThumbnailPreviewIcon onClick={() => preview()}>
            <Visibility style={{ color: "#ffffff", fontSize: '22px' }} />
          </ThumbnailPreviewIcon>
        }
        {remove &&
          <ThumbnailPreviewIcon onClick={() => remove()}>
            <Delete style={{ color: "#ffffff", fontSize: '22px' }} />
          </ThumbnailPreviewIcon>
        }
      </ThumbnailPreviewIconsHolder>
      {thumbnail ? <ThumbnailPreviewImage src={thumbnail} /> : <Skeleton style={{ width: '100%', height: '225px' }} />}
      {name && (
        <ThumbnailPreviewNameWrapper>
          <ThumbnailPreviewName>{name}</ThumbnailPreviewName>
        </ThumbnailPreviewNameWrapper>
      )}
    </ThumbnailPreviewWrapper>
  );
};

export default ThumbnailPreview;
