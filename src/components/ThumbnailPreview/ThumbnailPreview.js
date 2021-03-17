import React from "react";

// UI
import { Delete, Visibility } from "@material-ui/icons";
import { ThumbnailPreviewIcon, ThumbnailPreviewIconsHolder, ThumbnailPreviewImage, ThumbnailPreviewName, ThumbnailPreviewNameWrapper, ThumbnailPreviewWrapper } from "./styled";
import Skeleton from '@material-ui/lab/Skeleton';

// Styled


const ThumbnailPreview = ({ thumbnail, name, preview, remove}) => {
  
  return (
    <ThumbnailPreviewWrapper>
      <ThumbnailPreviewIconsHolder>
        {remove &&
        <ThumbnailPreviewIcon onClick={() => remove()}>
          <Delete style={{ color: "#ffffff" }} />
        </ThumbnailPreviewIcon>
        }
      </ThumbnailPreviewIconsHolder>
      {!thumbnail ? <ThumbnailPreviewImage src={thumbnail} /> :<Skeleton style={{width: '100px', height: '100px'}} /> }
      {name && (
        <ThumbnailPreviewNameWrapper>
          <ThumbnailPreviewName>{name}</ThumbnailPreviewName>
        </ThumbnailPreviewNameWrapper>
      )}
    </ThumbnailPreviewWrapper>
  );
};

export default ThumbnailPreview;
