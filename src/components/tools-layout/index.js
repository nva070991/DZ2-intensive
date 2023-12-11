import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ToolsLayout({children}) {

  const cn = bem('ToolsLayout');

  return (
    <div className={cn()}>
        {children}
    </div>
  );
}

ToolsLayout.propTypes = {
  children: PropTypes.node
}

export default memo(ToolsLayout);
