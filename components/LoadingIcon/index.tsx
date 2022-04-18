import LoadingIcons from "react-loading-icons";
import styled from "styled-components";

interface Props {
  icon?: string;
  color?: string;
}

function switchIcon(icon: string, className: any) {
  switch (icon) {
    case "tailspin":
      return <LoadingIcons.TailSpin className={className} />;
    case "triangle":
      return <LoadingIcons.BallTriangle className={className} />;
    case "circles":
      return <LoadingIcons.Circles className={className} />;
    case "bars":
      return <LoadingIcons.Bars className={className} />;
    case "spinning":
      return <LoadingIcons.SpinningCircles className={className} />;
    default:
      return <LoadingIcons.TailSpin className={className} />;
  }
}

const loadingToBeStyled = ({ className, ...props }: any) => (
  <>{switchIcon(props.icon, className)}</>
);

const StyledLoading = styled(loadingToBeStyled)`
  height: 22px;
  ${(props) =>
    props.color === "green" &&
    `filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)`};
`;

export function LoadingIcon(props: Props) {
  return <StyledLoading {...props} />;
}
