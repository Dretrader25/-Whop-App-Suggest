// Real WhopService for fetching Whop Marketplace apps

// Hardcoded Whop API credentials and IDs
const WHOP_API_KEY = 'pvPQX-uI-WcHI6czJaOM6BpW9iuA6-t_AAbSz7B_cEM';
const WHOP_COMPANY_ID = 'biz_4JQPMF0XSd8bOc';

export const WhopService = {
    /**
     * Fetches Whop products/apps from the Whop REST API. If a query is provided, filters by name/description.
     */
    async searchProducts(query = "") {
        const endpoint = `https://api.whop.com/v2/products?company_id=${WHOP_COMPANY_ID}`;
        const headers = {
            'Authorization': `Bearer ${WHOP_API_KEY}`,
            'Content-Type': 'application/json',
        };
        try {
            const response = await fetch(endpoint, { headers });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Whop API error response:', errorText);
                throw new Error('Failed to fetch Whop products: ' + response.status + ' ' + response.statusText);
            }
            const result = await response.json();
            console.log('Whop API raw response:', result);
            let products = result?.products || result?.data || [];
            if (query) {
                const q = query.toLowerCase();
                products = products.filter(product =>
                    product.name?.toLowerCase().includes(q) ||
                    product.description?.toLowerCase().includes(q)
                );
            }
            return products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                icon: product.icon || '🟦',
                url: product.url || `https://whop.com/product/${product.id}`,
            }));
        } catch (err) {
            console.error('WhopService error:', err);
            throw err;
        }
    },

    /**
     * Searches Whop community resources/content by query.
     * Replace endpoint and mapping as needed when you have the real API details.
     */
    async searchCommunity(query = "") {
        // Example endpoint, update to real one when available
        const endpoint = `https://api.whop.com/v2/community/search?company_id=${WHOP_COMPANY_ID}&q=${encodeURIComponent(query)}`;
        const headers = {
            'Authorization': `Bearer ${WHOP_API_KEY}`,
            'Content-Type': 'application/json',
        };
        try {
            const response = await fetch(endpoint, { headers });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Whop API error response:', errorText);
                throw new Error('Failed to fetch Whop community content: ' + response.status + ' ' + response.statusText);
            }
            const result = await response.json();
            console.log('Whop API community search response:', result);
            let items = result?.resources || result?.data || [];
            // Map results for frontend display
            return items.map(item => ({
                id: item.id,
                title: item.title || item.name || 'Untitled',
                description: item.description || item.content || '',
                url: item.url || '',
                type: item.type || 'resource',
            }));
        } catch (err) {
            console.error('WhopService error:', err);
            throw err;
        }
    }
};

// --- Whop chat API via backend endpoints ---

const API_BASE = "/api"; // Adjust if your backend endpoints are different

export function WhopWebsocketProvider({ children }) {
  // For now, just render children. Real-time updates can be added later.
  return children;
}

export function useWhopWebsocket() {
  // Stub for future websocket hook
  return {};
}

export async function sendWebsocketMessage(message, experienceId) {
  // Calls backend endpoint to send websocket message
  await fetch(`${API_BASE}/send-websocket-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, experienceId })
  });
}

export async function listMessagesFromChat(chatExperienceId) {
  // Calls backend endpoint to get chat history
  const res = await fetch(`${API_BASE}/list-messages?chatExperienceId=${chatExperienceId}`);
  if (!res.ok) throw new Error("Failed to fetch chat history");
  return await res.json();
}

export async function sendMessageToChat(message, experienceId) {
  // Calls backend endpoint to send chat message
  await fetch(`${API_BASE}/send-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, experienceId })
  });
}

export async function getCurrentUser() {
  // Calls backend endpoint to get current user
  const res = await fetch(`${API_BASE}/get-user`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
}
