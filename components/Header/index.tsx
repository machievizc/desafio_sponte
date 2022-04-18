import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styled from "styled-components";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout().then(() => {
      navigate("/");
    });
  }

  const HeaderToBeStyled = ({ className, ...props }: any) => (
    <div className={className}>
      <div className="header-toolbar">
        <h6>{user?.name}</h6>

        {user && (
          <div title="logout" onClick={handleLogout} className="logo-wrapper">
            <img alt={user?.name} src={`../assets/avatar/${user?.avatar}`} />
          </div>
        )}
      </div>
    </div>
  );

  const StyledHeader = styled(HeaderToBeStyled)`
    background-color: #fff;
    height: 75px;
    width: 100%;
    position: fixed;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

    .header-toolbar {
      padding: 0 15px 0 15px;
      height: 75px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h6 {
        color: #0693e3;
        font-size: 24px;
        font-weight: bolder;
      }

      .logo-wrapper {
        border: 0;
        border-radius: 50%;
        width: 55px;

        img {
          border: double 2px transparent;
          border-radius: 50%;
          background-image: radial-gradient(
            circle at top left,
            #8ed1fc 0%,
            #0693e3 20%,
            #9b51e0 100%
          );

          &:hover {
            transition: all 0.3s ease-in-out;
            filter: brightness(0.5);
            cursor: pointer;
          }
        }
      }
    }
  `;

  return <StyledHeader />;
}
