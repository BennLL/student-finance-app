import React, { useState } from "react";
import Papa from "papaparse";

function TransactionUploaderWithTable() {
  const [transactions, setTransactions] = useState([]);
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
        setTransactions(results.data);
      },
    });
  };

  return (
    <div className="mt-10">
      <div>
        <h3 className="text-lg font-semibold mb-2">💳 Upload Bank of America CSV</h3>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {fileName && <p className="text-green-600 mt-2">✅ Uploaded: {fileName}</p>}
      </div>

      {transactions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">📄 Transaction History</h3>

          <div className="h-[45vh] overflow-y-auto border border-gray-300 rounded">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 border">Posted Date</th>
                  <th className="px-4 py-2 border">Payee</th>
                  <th className="px-4 py-2 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{tx["Posted Date"]}</td>
                    <td className="px-4 py-2 border">{tx.Payee}</td>
                    <td
                      className={`px-4 py-2 border font-medium ${parseFloat(tx.Amount) < 0 ? "text-red-600" : "text-green-600"
                        }`}
                    >
                      {tx.Amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default TransactionUploaderWithTable;
