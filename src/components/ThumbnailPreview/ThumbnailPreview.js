import React from "react";

// UI
import { Delete, Visibility } from "@material-ui/icons";
import { ThumbnailPreviewIcon, ThumbnailPreviewIconsHolder, ThumbnailPreviewImage, ThumbnailPreviewName, ThumbnailPreviewNameWrapper, ThumbnailPreviewWrapper } from "./styled";

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
      <ThumbnailPreviewImage src={thumbnail} />
      {name && (
        <ThumbnailPreviewNameWrapper>
          <ThumbnailPreviewName>{name}</ThumbnailPreviewName>
        </ThumbnailPreviewNameWrapper>
      )}
    </ThumbnailPreviewWrapper>
  );
};

export default ThumbnailPreview;
