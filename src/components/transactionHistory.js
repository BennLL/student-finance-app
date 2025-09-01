import React, { useState } from "react";
import Papa from "papaparse";

function TransactionUpload({ onTransactionsParsed }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true, 
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed CSV:", results.data);
        onTransactionsParsed(results.data); 
      },
    });
  };

  return (
    <div>
      <h3>📂 Upload Bank of America CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {fileName && <p>✅ Uploaded: {fileName}</p>}
    </div>
  );
}

export default TransactionUpload;
