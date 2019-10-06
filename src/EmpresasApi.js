const devUrl = 'https://empresas.ioasys.com.br/api/v1/';

const EmpresasApi = {
    req: (options) => {

        let urlSuffix = '';
        let urlMethod = 'GET';
        let urlData = {};
        let urlHeaders = {};
        let urlSuccess = () => { };
        let urlError = () => { };

        if (options.endpoint) {
            urlSuffix = options.endpoint;
        }
        if (options.method) {
            urlMethod = options.method;
        }
        if (options.data) {
            urlData = options.data;
        }
        if (options.headers) {
            urlHeaders = options.headers;
        }
        if (options.success) {
            urlSuccess = options.success;
        }
        if (options.error) {
            urlError = options.error;
        }


        let endpoint = devUrl + urlSuffix;
        let jsonData = JSON.stringify(urlData);

        if (urlMethod == 'GET') {
            jsonData = null;

            let query = '';
            for (let i in urlData) {
                query += encodeURIComponent(i) + '=' + encodeURIComponent(urlData[i]) + '&';
            }
            endpoint += '?' + query;
        }

        if (options.tipo == 'puro') {
            fetch(endpoint, {
                method: urlMethod,
                body: jsonData,
                headers: urlHeaders
            })
                .then(urlSuccess)
                .catch(urlError);
        }else{
            fetch(endpoint, {
                method: urlMethod,
                body: jsonData,
                headers: urlHeaders
            })
                .then((r) => r.json())
                .then(urlSuccess)
                .catch(urlError);
        }

    }
};


export default EmpresasApi;