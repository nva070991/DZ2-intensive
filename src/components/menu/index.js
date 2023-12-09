import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { NavLink } from "react-router-dom";

function Menu() {
  const cn = bem("Menu");
  return (
    <NavLink to="/" className={cn("main")}>
      Главная
    </NavLink>
  );
}

export default memo(Menu);
