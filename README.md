llm-proxy
---

**API Relay for Language Models**

This project serves as a relay for various language models, making it easier to communicate with APIs like OpenAI's GPT models and other services. It wraps the calls to these APIs with a simpler interface and supports proxy functionalities.

## Features

- **Proxy Support**: Connects to external services using an HTTPS proxy if required.

- **Bearer Token Authentication**: Enforces authentication using Bearer tokens to secure endpoints.

- **Route Configuration**: Easily define and configure routes to different language models with desired transformations on request and response bodies.

- **Pluggable Architecture**: Quickly add new routes or modify existing routes by updating the configuration.

## Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the server**:

   ```bash
   node index.js
   ```

   Once started, the server will be listening on port 3000.

## Configuration

The server's behavior is primarily defined by the `config.js` file. Here's what each configuration does:

- **proxy**: Specifies the HTTP proxy to be used if a route requires it.

- **requiredBearerToken**: A token that needs to be passed in the authorization header to access the relay routes.

- **routes**: An array of route configurations with the following properties:

    - **requiresProxy**: Whether to use the proxy for this route.

    - **path**: Endpoint path for the relay route.

    - **upstreamSite**: URL of the actual language model API this route points to.

    - **extraHeadersForUpstream**: Any additional headers that need to be sent to the upstream API.

    - **processRequestBody**: A function that transforms the incoming request body before sending it to the upstream API.

    - **processResponseBody**: A function that transforms the response body from the upstream API before sending it back to the client.

## Security

The `robots.txt` disallows all bots from indexing the service. All endpoints require a Bearer token to ensure only authorized clients can access the service. Make sure to keep your `config.js` file secure and never expose sensitive tokens or configurations.

## License

This project is open-sourced under the MIT License.
