import http from '../common/http';
export class HttpService {
    /**
     * Load data from the API
     */
    public fetchData(url: string) {
        return http.get<any>(url)
    }

    /**
     * create an item
     */
    public createItem(url: string, data: any) {
        return http.post<any>(url, data)
    }

    /**
     * edit an item
    */
    public updateItem(url: string, data: any) {
        return http.put<any>(url, data)
    }

    /**
     * patch update an item
     */
    public patchItem(url: string, data: any) {
        return http.patch<any>(url, data)
    }

    /**
     * retrieve single item from the server
     */
    public retrieveItem(url: string) {
        return http.get<any>(url)
    }

    /**
     * retrieve single item from the server
     */
    public deleteItem(url: string) {
        return http.delete(url)
    }
}
