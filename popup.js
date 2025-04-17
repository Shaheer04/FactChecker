async function stylePopup() {
    // Add custom CSS with variables for consistent theming
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        :root {
            --primary-color: #2c6bed;
            --primary-hover: #1c5ad8;
            --background: #f8f9fa;
            --card-bg: #ffffff;
            --text-color: #333333;
            --border-color: #e0e0e0;
            --success-color: #28a745;
            --error-color: #dc3545;
            --neutral-color: #6c757d;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        body.dark-theme {
            --primary-color: #4d8bff;
            --primary-hover: #3a78eb;
            --background: #212529;
            --card-bg: #2a2d31;
            --text-color: #e9ecef;
            --border-color: #495057;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        body {
            background-color: var(--background);
            color: var(--text-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            transition: all 0.3s ease;
            padding: 16px;
            margin: 0;
            min-width: 350px;
        }
        
        #theme-toggle {
            position: fixed;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            font-size: 20px;
            cursor: pointer;
            z-index: 100;
            padding: 5px;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--card-bg);
            box-shadow: var(--shadow);
        }
        
        .result-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            box-shadow: var(--shadow);
            padding: 20px;
            margin-top: 10px;
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .card-title {
            margin: 0;
            color: var(--primary-color);
        }
        
        .timestamp {
            font-size: 0.8em;
            color: var(--neutral-color);
        }
        
        .statement {
            position: relative;
            background-color: rgba(0,0,0,0.03);
            border-radius: 8px;
            padding: 15px 20px;
            margin: 20px 0;
            font-style: italic;
            background-color: var(--background);
        }
        
        .quote-icon {
            font-size: 1.5em;
            color: var(--primary-color);
            opacity: 0.4;
            position: absolute;
        }
        
        .quote-icon:first-child {
            top: -10px;
            left: 5px;
        }
        
        .quote-icon:last-child {
            bottom: -10px;
            right: 5px;
        }
        
        .verdict-container {
            display: flex;
            align-items: center;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            color: white;
        }
        
        .score-true {
            background-color: var(--success-color);
        }
        
        .score-false {
            background-color: var(--error-color);
        }
        
        .verdict-icon {
            font-size: 1.8em;
            margin-right: 15px;
        }
        
        .verdict-label {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 5px;
            display: block;
        }
        
        .progress-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .progress-bar {
            background-color: rgba(255, 255, 255, 0.3);
            height: 10px;
            flex-grow: 1;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            background-color: white;
        }
        
        .justification {
            margin: 20px 0;
        }
        
        .justification h4 {
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .actions {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        
        .action-btn {
            padding: 8px 15px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background-color: var(--card-bg);
            color: var(--text-color);
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .action-btn:hover {
            background-color: var(--background);
        }
        
        .empty-state {
            text-align: center;
            padding: 30px;
            background-color: var(--card-bg);
            border-radius: 12px;
            box-shadow: var(--shadow);
        }
        
        .empty-icon {
            font-size: 3em;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .empty-hint {
            color: var(--neutral-color);
            margin-bottom: 20px;
        }
        
        .primary-btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        
        .primary-btn:hover {
            background-color: var(--primary-hover);
        }
        
        .tutorial {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            box-shadow: var(--shadow);
        }
        
        .tutorial h3 {
            color: var(--primary-color);
            margin-top: 0;
        }
        
        .tutorial ol {
            margin-bottom: 25px;
            padding-left: 20px;
        }
        
        .tutorial li {
            margin-bottom: 10px;
        }
    `;
    document.head.appendChild(styleElement);

    // Add theme toggle functionality
    const toggleTheme = document.createElement('button');
    toggleTheme.id = 'theme-toggle';
    toggleTheme.innerHTML = '🌙';
    toggleTheme.title = 'Toggle dark/light mode';
    document.body.appendChild(toggleTheme);

    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        toggleTheme.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        // Save theme preference
        chrome.storage.local.set({ 'darkMode': document.body.classList.contains('dark-theme') });
    });

    // Check saved theme preference
    chrome.storage.local.get('darkMode', (data) => {
        if (data.darkMode) {
            document.body.classList.add('dark-theme');
            toggleTheme.innerHTML = '☀️';
        }
    });

}

document.addEventListener('DOMContentLoaded', async () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "factCheckLoaded") {
            renderFactCheckResult({ lastCheck: message.result }, document.getElementById('result'));
        } else if (message.action === "factCheckLoading") {
            renderFactCheckLoading(document.getElementById('result'), message.result);
        }
    })
    chrome.runtime.sendMessage({ action: "backgroundHandshake" });

    // Get the latest result from storage
    chrome.storage.local.get(['lastCheck', 'loading']).then((result) => {
        console.log("domcontentloaded", result);
        const resultDiv = document.getElementById('result');

        if (result.loading) {
            // Show loading state with selected text
            renderFactCheckLoading(resultDiv, result);
        } else if (result.lastCheck) {
            renderFactCheckResult(result, resultDiv);
        } else {
            renderFaceCheckMissing(resultDiv);
        }
    });
});

function renderFaceCheckMissing(resultDiv) {
    resultDiv.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <p>No fact checks available</p>
            <p class="empty-hint">Highlight text on a webpage and use FactChecker to analyze it.</p>
        </div>
    `;
}

function renderFactCheckResult(result, resultDiv) {
    const { statement, score, justification, fact } = result.lastCheck;
    const scorePercentage = Math.round(score * 100);
    const scoreClass = fact ? 'score-true' : 'score-false';
    const verdict = fact ? 'True' : 'False';
    const icon = fact ? '✓' : '✗';

    stylePopup();
    resultDiv.innerHTML = `
                <div class="result-caresultrd">
                    <h3 class="card-title">Result</h3>
                    <div class="statement">"${statement}"</div>
                    <div class="verdict-container ${scoreClass}">
                        <div class="verdict-icon">${icon}</div>
                        <div class="verdict-details">
                            <span class="verdict-label">${verdict}</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${scorePercentage}%"></div>
                            </div>
                            <span style="color:white" class="score">${scorePercentage}% confidence</span>
                        </div>
                    </div>
                    <div class="justification">
                        <h4>Justification:</h4>
                        <p>${justification}</p>
                    </div>
                </div>
            `;
}

function renderFactCheckLoading(resultDiv, result) {
    resultDiv.innerHTML = `
                <div class="loader-container">
                    <div class="loader"></div>
                    <p class="loading-text">Analyzing text for factual accuracy...</p>
                    ${result.selectedText ?
            `<div class="selected-text">"${result.selectedText}"</div>` :
            ''}
                </div>
            `;
}
