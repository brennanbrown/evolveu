const functions = {
    
    url: "http://127.0.0.1:5002/",
    
    retrieveNames(info, i) {
        try {
            var obj = info[i];
            return obj.first_name;
        } catch (error) {
            console.error("Error:", error);
        }
    },
    
    retrieveAllNames(info) {
        try {
            return info.map(array => array.first_name);
        } catch (error) {
            console.error("Error:", error);
        }
    },
    
    async postData(url = "", info = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(info)
        });
        
        const text = await response.text();
        let JSON_DATA = text ? JSON.parse(text) : {};
        
        // If it's an array, just return it (for /all endpoint)
        if (Array.isArray(JSON_DATA)) {
            return JSON_DATA;
        }
        
        // For objects, add status information
        JSON_DATA.status = response.status;
        JSON_DATA.statusText = response.statusText;
        return JSON_DATA;
    },
    
    retrieveUsers: async () => {
        try {
            const response = await fetch(functions.url);
            const info = await response.json();
            return info;
        } catch (error) {
            console.error("Error:", error);
        }
    },
    
    infoTestFunc: async () => {
        const info = await functions.retrieveUsers();
        return info;
    },
};

export default functions;