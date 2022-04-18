import styled from "styled-components";
import { Link } from "../../components/Link";

const DivToBeStyled = ({ className }: any) => (
  <div className={className}>
    <Link to="/" children={<h4>404</h4>}></Link>
  </div>
);

const StyledDiv = styled(DivToBeStyled)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;

  h4 {
    color: #fff;
    font-size: 88px;
    padding: 20px 0 40px;

    &:hover {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export function NotFound() {
  return <StyledDiv />;
}
