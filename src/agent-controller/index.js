import fetch from "node-fetch";

export class RenderAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.render.com/v1";
  }

  async listServices() {
    return this._request("/services");
  }

  async getService(id) {
    return this._request(`/services/${id}`);
  }

  async deploy(id) {
    return this._request(`/services/${id}/deploys`, "POST", {});
  }

  async _request(path, method = "GET", body = null) {
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    };

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(this.baseUrl + path, options);
    return response.json();
  }
}￼Enter
