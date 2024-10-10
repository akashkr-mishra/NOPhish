// Smooth Scrolling for Navigation Links
document.querySelector('nav a[href="#know-more-section"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('know-more-section').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('nav a[href="#how-it-works"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
});

// IPQS Malicious URL Scanner
const axios = require('axios');
const qs = require('querystring');

class IPQS {
    constructor() {
        this.key = '000';
    }

    async maliciousUrlScannerApi(url, vars = {}) {
        const encodedUrl = qs.escape(url);
        const requestUrl = `https://www.ipqualityscore.com/api/json/url/${this.key}/${encodedUrl}`;
        try {
            const response = await axios.get(requestUrl, { params: vars });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
}

document.getElementById('check-btn').addEventListener('click', async function() {
    const urlInput = document.getElementById('url-input').value;
    const ipqs = new IPQS();
    const resultBox = document.getElementById('result-box');

    // Initially hide the result box
    resultBox.style.opacity = '0';

    // Call API and handle the response
    const result = await ipqs.maliciousUrlScannerApi(urlInput);

    if (result) {
        if (result.success) {
            if (result.phishing || result.malware || result.risk_score > 85) {
                resultBox.style.backgroundColor = 'red';
                resultBox.style.color = 'white';
                resultBox.textContent = 'PHISHING';
            } else {
                resultBox.style.backgroundColor = 'green';
                resultBox.style.color = 'white';
                resultBox.textContent = 'SAFE';
            }
        } else {
            resultBox.style.backgroundColor = 'red';
            resultBox.style.color = 'white';
            resultBox.textContent = 'ERROR';
        }
    } else {
        resultBox.style.backgroundColor = 'red';
        resultBox.style.color = 'white';
        resultBox.textContent = 'NO RESPONSE';
    }

    // Show the result box after processing
    resultBox.style.opacity = '1';
});
