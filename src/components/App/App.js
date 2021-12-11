import React, { useState } from "react";
import PdfDocucment from "../Document/Document";
import { PDFDownloadLinkStyled } from "./app.style";
const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <PDFDownloadLinkStyled
        disabled={loading}
        document={<PdfDocucment setLoading={setLoading} />}
        fileName="carte-tdo.pdf"
      >
        {loading ? "Loading" : "Telecharger"}
      </PDFDownloadLinkStyled>
    </div>
  );
};

export default App;
