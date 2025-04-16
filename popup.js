document.addEventListener('DOMContentLoaded', async () => {
    const resultDiv = document.getElementById('result');

    // Get the latest result from storage
    chrome.storage.local.get('lastCheck').then((result) => {
        console.log(result)
        if (result.lastCheck) {
            const { statement, score, justification, fact } = result.lastCheck;
            resultDiv.innerHTML = `
                <p><strong>Statement:</strong> ${statement}</p>
                <p><strong>Score:</strong> <span class="score">${score * 100}%</span></p>
                <p><strong>Verdict:</strong> ${fact ? 'True' : 'False'}</p>
                <p><strong>Justification:</strong> ${justification}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p class="no-text">No text selected</p>';
        }
    });
});