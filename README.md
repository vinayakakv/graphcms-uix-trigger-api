# graphcms-uix-trigger-api

A [GraphCMS](https://graphcms.com/) UI extension to trigger `POST` request to an API endpoint.

## Configuration options

- API Endpoint
- API Key: It will be added in `Authorization` header as `Bearer` token

## Request specification

The extension will `POST` the API endpoint.

The body of the request contains all fields of the current object, along with the model name, in the JSON format.

## Some Caveats

- CORS must be enabled on the API endpoint to accept request from the UIX domain (https://graphcms-uix-trigger-api.vercel.app). The CORS must also allow the header `Authorization`, and the HTTP methods `OPTIONS` and `POST`.
- The request does not set `Content-Type: application/json` header. I found it a little inconvient to use with NextJS API routes.

## Possible Improvements

- Migrate project from CRA to [Vite](https://vitejs.dev/)
- In case CORS can not be enabled on the server, we can add `no-cors` mode to `fetch`. This will make the [response type](https://developer.mozilla.org/en-US/docs/Web/API/Response/type) `opaque`
- Support customization by adding few fields when adding UIX to sidebar
- Stylize the UI

## Thanks

- [@cadudecastroalves](https://www.linkedin.com/in/cadudecastroalves/) for helping me to get started on GraphCMS UIX
