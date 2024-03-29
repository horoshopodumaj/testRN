const baseURL = "https://jsonplaceholder.typicode.com";

//функция для получения get запросов
export async function getData(url = "", limit, page) {
    let searchParams;
    //проверяем наличие limit и page (в запросах по ID они не требуются)
    if (limit && page) {
        searchParams = new URLSearchParams({
            _limit: limit,
            _page: page,
        });
    } else {
        searchParams = "";
    }

    const encodedURL = `${baseURL}/${url}?${searchParams.toString()}`;

    const response = await fetch(encodedURL, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    let totalCount;
    for (let pair of response.headers.entries()) {
        if (pair[0] === "x-total-count") {
            totalCount = pair[1];
        }
    }

    const data = await response.json();

    return [data, totalCount];
}

//функция для POST, PUT, PATCH и т.д ( для запросов у которых есть body) может выглядеть так

// export async function postData(url = "", method, data = {}) {

//     const encodedURL = `${baseURL}/${url}`;

//     const response = await fetch(encodedURL, {
//         method: method,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     return await response.json();
// }
