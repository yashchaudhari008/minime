import styled from 'styled-components';

// Create a reusable scrollable div
export const ScrollableDiv = styled.div`
  height: 100%;
  overflow-y: scroll;
  
  /* Custom Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1a1a1a;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9c9487;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }
`;

export default ScrollableDiv;
