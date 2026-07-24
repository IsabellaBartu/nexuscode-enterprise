document.addEventListener('DOMContentLoaded', () => {
    const activateBtn = document.getElementById('activateBtn');
    const statusDiv = document.getElementById('status');
    
    activateBtn.addEventListener('click', async () => {
        const email = document.getElementById('userEmail').value;
        const key = document.getElementById('licenseKey').value;
        
        if (!email || !key) {
            statusDiv.innerText = "Por favor, preencha todos os campos.";
            statusDiv.style.color = "red";
            return;
        }

        statusDiv.innerText = "Verificando licença...";
        statusDiv.style.color = "#8b949e";

        try {
            const response = await fetch('http://localhost:3000/validate-license', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, licenseKey: key })
            });

            const data = await response.json();

            if (data.valid) {
                statusDiv.innerText = data.message;
                statusDiv.style.color = "#34d399";
                
                chrome.storage.local.set({ 
                    isAuthorized: true, 
                    userEmail: email, 
                    licenseKey: key 
                });
            } else {
                statusDiv.innerText = data.message;
                statusDiv.style.color = "ef4444";
            }
        } catch (error) {
            console.error("Falha na requisição:", error);
            statusDiv.innerText = "Erro ao conectar com o servidor.";
            statusDiv.style.color = "#ef4444";
        }
    });
});