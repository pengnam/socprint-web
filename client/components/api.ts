class Api {
    static baseUrl(): string{
        //TODO: Fix
        let PLACEHOLDER = true;
        let baseUrl;
        if (PLACEHOLDER) {
            baseUrl = "http://localhost:8000";
        } else {
            baseUrl = "https://api.socprint.xyz";
        }
        return baseUrl;
    }

    static printUrl(): string {
        return `${Api.baseUrl()}/print`
    } 
    static quotaUrl(): string {
        return `${Api.baseUrl()}/quota`
    } 
}

export default Api;