import styled from "styled-components";

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`;

const ScrollLock = styled.div`
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
`;

function Overlay({ children }) {
  return (
    <ScrollLock>
      <OverlayContainer>{children}</OverlayContainer>
    </ScrollLock>
  );
}

export default Overlay;
