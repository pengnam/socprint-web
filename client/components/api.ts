class Api {
    static baseUrl(): string{
        //TODO: Fix
        let baseUrl;
        if (process.env.NODE_ENV == "development") {
            baseUrl = "http://localhost:8000";
        } else {
            baseUrl = "https://api.socprint.xyz";
        }
        return baseUrl;
    }

    static printUrl(): string {
        return `${Api.baseUrl()}/print`
    } 
    
    static sunfireUpUrl(): string {
        return `${Api.baseUrl()}/sunfire_up`
   } 
}

export default Api;