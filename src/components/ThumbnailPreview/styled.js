import styled from "styled-components";

export const ThumbnailPreviewWrapper = styled.div`
  border-radius: 16px;
  background: #e1effe;
  padding: 15px;
  position: relative;
  min-height: 200px;
  max-width: 225px;
`;

export const ThumbnailPreviewImage = styled.img`
  display: block;
  margin: 20px 0px 0px 32px;
  width: 65%;
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
 font-family: "Poppins", sans-serif;
 font-size: 12px;
 font-weight: 400;
 `;

export const ThumbnailPreviewIconsHolder = styled.div`
float: right
`;

export const ThumbnailPreviewIcon = styled.div`
  border-radius: 8px;
  padding: 3px;
  height: 30px;
  width: 30px;
  margin: 0px;
  cursor: pointer;
  background: #3599fe;
`;
