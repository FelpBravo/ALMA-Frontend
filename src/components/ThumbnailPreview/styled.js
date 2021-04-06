import styled from "styled-components";

export const ThumbnailPreviewWrapper = styled.div`
  border-radius: 8px;
  background: #e1effe;
  padding: 20px 50px;
  position: relative;
  height: 220px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ThumbnailPreviewImage = styled.img`
transform: scale(1.6);
`;

export const ThumbnailPreviewNameWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 40px;
  background: #3599fe;
  border-radius: 0px 0px 8px 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 12px;
`;

export const ThumbnailPreviewName = styled.span`
 color: #e9ecef;
 font-family: "Poppins", sans-serif;
 font-size: 12px;
 font-weight: 400;
 `;

export const ThumbnailPreviewIconsHolder = styled.div`
  float: right;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
`;

export const ThumbnailPreviewIcon = styled.div`
  border-radius: 8px;
  padding: 3px;
  height: 30px;
  width: 30px;
  margin: 0px;
  cursor: pointer;
  background: #3599fe;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  `;
