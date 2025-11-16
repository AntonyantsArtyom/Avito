import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { StyledContainer } from "./ToListNavButton.styles";

export const ToListNavButton = () => {
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate("/list");
  };

  return (
    <StyledContainer onClick={handleBackToList} style={{ cursor: "pointer" }} role="button">
      <ArrowLeftOutlined />К списку
    </StyledContainer>
  );
};
