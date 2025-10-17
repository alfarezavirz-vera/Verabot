import axios from "axios";

export default class APIFlashClient {
    constructor(accessKey) {
        this.accessKey =
            accessKey ||
            process.env.APIFLASH_ACCESS_KEY ||
            "fdaf638490cf4d5aad5bdabe7ec23187";

        this.client = axios.create({
            baseURL: "https://api.apiflash.com/v1",
            timeout: 60000, // Set timeout default
            headers: {
                "User-Agent": "Node-APIFlash-Client/1.0.0",
                "accept-encoding": "gzip"
            }
        });
    }

    async capture(url, options = {}) {
        if (!url) throw new Error("URL parameter is required.");

        try {
            const params = this._buildParams(url, options);
            params.set("response_type", "image");

            const response = await this.client.get(`/urltoimage`, {
                params: params,
                responseType: "arraybuffer"
            });

            if (response.data && response.status === 200) {
                return {
                    buffer: Buffer.from(response.data),
                    contentType:
                        response.headers["content-type"] || "image/png",
                    contentLength:
                        response.headers["content-length"] ||
                        response.data.length
                };
            } else {
                throw new Error("Invalid response from APIFlash API");
            }
        } catch (error) {
            this._handleError(error);
        }
    }

    async getInfo(url, options = {}) {
        if (!url) throw new Error("URL parameter is required.");

        try {
            const params = this._buildParams(url, options);
            params.set("response_type", "json");

            const { data } = await this.client.get(`/urltoimage`, {
                params: params
            });

            if (data && data.url) {
                return data;
            } else {
                throw new Error("Invalid JSON response from APIFlash API");
            }
        } catch (error) {
            this._handleError(error);
        }
    }

    _buildParams(url, options) {
        const params = new URLSearchParams();
        params.append("access_key", this.accessKey);
        params.append("url", url);

        const validOptions = [
            "width",
            "height",
            "format",
            "quality",
            "delay",
            "full_page",
            "scroll_page",
            "fresh",
            "user_agent",
            "accept_language",
            "ttl"
        ];

        for (const key of validOptions) {
            if (options[key] !== undefined && options[key] !== null) {
                params.append(key, options[key]);
            }
        }

        return params;
    }

    _handleError(error) {
        console.error("APIFlash Client Error:", error.message);

        if (
            error.code === "ECONNABORTED" ||
            error.message.includes("timeout")
        ) {
            throw new Error(
                "Request timeout - APIFlash API took too long to respond"
            );
        } else if (error.response) {
            const { status, statusText } = error.response;
            if (status === 400)
                throw new Error("Bad request - Invalid parameters");
            if (status === 401)
                throw new Error("Unauthorized - Invalid access key");
            if (status === 402)
                throw new Error("Payment required - Insufficient credits");
            if (status === 429)
                throw new Error("Rate limit exceeded - Too many requests");
            if (status >= 500)
                throw new Error(
                    "APIFlash server error - Please try again later"
                );

            throw new Error(`APIFlash API error: ${status} - ${statusText}`);
        } else if (error.request) {
            throw new Error("Network error - Could not reach APIFlash API");
        } else {
            throw new Error(`Request failed: ${error.message}`);
        }
    }
}
