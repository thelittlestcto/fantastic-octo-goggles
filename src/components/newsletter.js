import * as React from "react";
import { Component } from "react";

class Newsletter extends Component {
  componentDidMount() {
    if(this.props.display==='on')  {//dont load form if disabled in props
      const script = document.createElement("script");
      script.src = "https://winning-composer-4657.ck.page/b81919f49a/index.js";
      script.async = true;
      script.setAttribute("data-uid", "b81919f49a");
      this.instance.appendChild(script);
    }
  }
  
  render() {
    if(this.props.display==='on')  {
      return (
          <div ref={(el) => (this.instance = el)}></div>
      );
    };
  }
}

export default Newsletter;