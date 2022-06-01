import config from './auth_config.json'

export function getConfig() {

    const audience =
      config.audience && config.audience !== "YOUR_API_IDENTIFIER"
        ? config.audience
        : null;

    return {
      domain: config.domain,
      clientId: config.clientId,
      ...(audience ? { audience } : null),
    };
}
  