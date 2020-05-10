const functions = {

    url: "http://127.0.0.1:5000/",

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
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(info)
        });

        const JSON_DATA = await response.json();
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