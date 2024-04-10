export class Connector {
  constructor(url) {
    this.url = url;
    this.data = [];
  }
  async getData(endpoint) {
    try {
      const response = await fetch(`${this.url}${endpoint}`);
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
      const response = await fetch(`${this.url}${postUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataToPost,
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

  async updateFeeStatus(postUrl) {
    try {
      const response = await fetch(`${this.url}${postUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
