import { styled } from 'styled-components';

export const Select = styled.div`
  align-items: center;
  width: ${(props) => props.width}px;
  font-size: ${(props) => props.size};
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  height: ${(props) => props.height};
`;
