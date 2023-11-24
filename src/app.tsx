import * as ReactDOM from "react-dom";
import { Layout } from "./components/Layout";
import CredentialContainer from "./components/CredentialContainer";

function render() {
  ReactDOM.render(
    <Layout>
      <CredentialContainer />
    </Layout>,

    document.body
  );
}

render();
