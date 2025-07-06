declare global {
    interface Window {
        __translations?: Record<string, Record<string, string>>;
    }
}

export function __(key: string, namespace = 'app') {
    const translations = window.__translations?.[namespace] || {};
    return translations[key] ?? key;
}

export const __k = (key: string, namespace = 'keywords') => __(key, namespace);

export const __v = (key: string, namespace = 'validation') => __(key, namespace);

export const __pass = (key: string, namespace = 'passwords') => __(key, namespace);

export const __page = (key: string, namespace = 'pagination') => __(key, namespace);

export const __a = (key: string, namespace = 'auth') => __(key, namespace);
