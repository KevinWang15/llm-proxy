export default {
  proxy: "http://127.0.0.1:6152",
  requiredBearerToken: "1231",
  routes: [
    {
      requiresProxy: true,
      path: "/llama-2-70b-chat",
      upstreamSite: "https://api.together.xyz/inference",
      extraHeadersForUpstream: {
        Authorization: "Bearer ...",
      },
      processRequestBody: (req) => {
        return {
          model: "togethercomputer/llama-2-70b-chat",
          prompt: req.prompt,
          temperature: 0.8,
          top_p: 0.7,
          top_k: 50,
          max_tokens: 512,
          repetition_penalty: 1,
          stop: ["[/INST]"],
          prompt_format_string: "[INST] {prompt}\n [/INST]",
        };
      },
      processResponseBody: (resp) => {
        return { completion: resp.output.choices[0].text };
      },
    },
    {
      requiresProxy: true,
      path: "/gpt-3.5-turbo",
      upstreamSite: "https://openai.api2d.net/v1/chat/completions",
      extraHeadersForUpstream: {
        Authorization: "Bearer ...",
      },
      processRequestBody: (req) => {
        return {
          model: "gpt-3.5-turbo",
          messages: req.messages || [{ role: "user", content: req.prompt }],
        };
      },
      processResponseBody: (resp) => {
        return { completion: resp.choices[0].message.content };
      },
    },
    {
      requiresProxy: true,
      path: "/gpt-4-0613",
      upstreamSite: "https://openai.api2d.net/v1/chat/completions",
      extraHeadersForUpstream: {
        Authorization: "Bearer ...",
      },
      processRequestBody: (req) => {
        return {
          model: "gpt-4-0613",
          messages: req.messages || [{ role: "user", content: req.prompt }],
        };
      },
      processResponseBody: (resp) => {
        return { completion: resp.choices[0].message.content };
      },
    },
  ],
};
