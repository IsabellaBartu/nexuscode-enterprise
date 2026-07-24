// Mantém o service worker ativo e gerencia a comunicação
chrome.runtime.onInstalled.addListener(() => {
    console.log("[NexusCode AI] Extensão instalada com sucesso. Pronta para operar.");
});