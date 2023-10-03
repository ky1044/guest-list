import * as ReactDOM from "react-dom";
import { Layout } from "./components/Layout";
import CredentialContainer from "./components/CredentialContainer";
import { Example } from "./components/Example";
import ResizableTable from "./components/ResizableTable";

function render() {
  ReactDOM.render(
    <Layout>
      <CredentialContainer />
      {/* <Example /> */}
      {/* <ResizableTable /> */}
    </Layout>,

    document.body
  );
}

render();
