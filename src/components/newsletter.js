import * as React from "react";
import { Component } from "react";

class Newsletter extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://winning-composer-4657.ck.page/b81919f49a/index.js";
    script.async = true;
    script.setAttribute("data-uid", "b81919f49a");
    this.instance.appendChild(script);
  }

  render() {
    return (
        <div ref={(el) => (this.instance = el)}></div>
    );
  }
}

export default Newsletter;