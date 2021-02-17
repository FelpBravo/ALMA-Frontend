import styled from "styled-components";

export const ThumbnailPreviewWrapper = styled.div`
  border-radius: 16px;
  background: #e1effe;
  padding: 15px;
  position: relative;
  min-height: 200px;
  max-width: 250px;
`;

export const ThumbnailPreviewImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

export const ThumbnailPreviewNameWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #3599fe;
  opacity: 0.8;
  border-radius: 0px 0px 8px 8px;
  text-align: center;
`;

export const ThumbnailPreviewName = styled.span`
 color: #e9ecef;

 `;

export const ThumbnailPreviewIconsHolder = styled.div``;

export const ThumbnailPreviewIcon = styled.div`
  border-radius: 8px;
  padding: 4px;
  height: 30px;
  width: 30px;
  margin: 4px 0;
  cursor: pointer;
  background: #3599fe;
`;
