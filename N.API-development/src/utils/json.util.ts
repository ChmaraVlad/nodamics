export class JSONUtil {
  static isJSON(json: unknown): boolean {
    try {
      if (typeof json === 'string' || json instanceof String) {
        JSON.parse(json as string);
      } else {
        const stringify = JSON.stringify(json);
        JSON.parse(stringify);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  static validateJSON(json: unknown): JSON | false {
    if (JSONUtil.isJSON(json)) {
      return json as JSON;
    }
    return false;
  }
}
