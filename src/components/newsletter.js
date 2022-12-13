import * as React from "react";
import { Component } from "react";

class Newsletter extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://winning-composer-4657.ck.page/a077f98377/index.js";
    script.async = true;
    script.setAttribute("data-uid", "a077f98377");
    this.instance.appendChild(script);
  }

  render() {
    return (
        <span ref={(el) => (this.instance = el)}></span>
    );
  }
}

export default Newsletter;