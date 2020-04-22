const sheetsApi = function(docId, sheetId) {
  try {
    const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${docId}/public/values?alt=json-in-script`;

    return fetch(sheetsUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error fetching sheet");
        }

        return response.text();
      })
      .then(resultText => {
        const formattedText = resultText
          .replace("gdata.io.handleScriptLoaded(", "")
          .slice(0, -2);
        return JSON.parse(formattedText);
      });
  } catch (err) {
    console.log(`gsheetsAPI error: ${err}`);

    return {};
  }
};

export default sheetsApi;
