export class Connector {
  constructor(url) {
    this.url = url; // URL to fetch data from
    this.data = []; // To store fetched data
  }

  // Method to fetch data from the server
  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.statusText})`);
      }
      const data = await response.json();
      this.data = data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  async postData(postUrl, dataToPost) {
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.statusText})`);
      }
      const responseData = await response.json();
      console.log("Data posted successfully:", responseData);
      return responseData; // Return the response data for further processing if needed
    } catch (error) {
      console.error("Failed to post data:", error);
    }
  }
}
