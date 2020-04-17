import React from "react";
import ReactDOM from "react-dom";

export { render_view };

function render_view(goldpage_args) {
  const { page, initialProps, CONTAINER_ID } = goldpage_args;
  const element = React.createElement(page.view, initialProps);
  const container = document.getElementById(CONTAINER_ID);
  ReactDOM.render(element, container);
  /*
    if (page.renderToHtml) {
      ReactDOM.hydrate(element, container);
    } else {
      ReactDOM.render(element, container);
    }
    */
}
