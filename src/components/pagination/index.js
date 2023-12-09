import { memo,  } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { NavLink } from "react-router-dom";

function Pagination({ currentPage, maxPages }) {
  const cn = bem("pagination");

  const countPages = (currentPage, maxPages) => {
    if (currentPage < 3) {
      return [1, 2, 3, "...", maxPages];
    } else if (currentPage === 3) {
      return [1, 2, 3, 4, "...", maxPages];
    } else if (currentPage > 3 && currentPage < maxPages - 2) {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        maxPages,
      ];
    } else if (currentPage === maxPages - 2) {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        maxPages,
      ];
    } else if (currentPage > maxPages - 2) {
      return [1, "...", maxPages - 2, maxPages - 1, maxPages];
    }
  };

  const countPageSelect = (currentPage) => {
    if (currentPage < 3) {
      return currentPage - 1;
    } else if (currentPage === 3) {
      return 2;
    } else if (currentPage > 3 && currentPage < maxPages - 2) {
      return 3;
    } else if (currentPage === maxPages - 2) {
      return 3;
    } else if (currentPage > maxPages - 2) {
      return 4 - (maxPages - currentPage);
    }
  };

  return (
    <div className={cn()}>
      {countPages(currentPage, maxPages)?.map((page, index) => (
        <div
          key={index}
          className={cn(
            index === countPageSelect(currentPage) ? "page select" : "page",
            page > 9 ? 'big' : ''
          )}
        >
          {page === "..." ? (
            <span className={cn("points")}> {String(page)}</span>
          ) : (
            <NavLink to={`/page/${String(page)}`} className={cn("link")}>
              {String(page)}
            </NavLink>
          )}
        </div>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  maxPages: PropTypes.number,
  currentPage: PropTypes.number
};



export default memo(Pagination);
