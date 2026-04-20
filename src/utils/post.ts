export const post = async <TResponse, TBody extends object>(url: string, body: TBody): Promise<TResponse> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    
    if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP ${response.status}: ${message}`);
    };
        
    return response.json();
} 