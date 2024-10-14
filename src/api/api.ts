
const API_BASE_URL = 'https://backend.vella.com';


async function getData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error((await response.json()).err ?? `GET request failed: ${response.status}`);
    }

    return response.json();
}


async function postData<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error((await response.json()).err ?? `POST request failed: ${response.status}`);
    }

    return response.json();
}


async function updateData<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error((await response.json()).err ?? `PUT request failed: ${response.status}`);
    }

    return response.json();
}


async function deleteData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error((await response.json()).err ?? `DELETE request failed: ${response.status}`);
    }

    return response.json();
}


export { getData, postData, updateData, deleteData };
