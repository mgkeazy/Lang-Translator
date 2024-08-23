// Function to detect language from the extracted text
async function detectLanguage(text) {
    try {
        // Send the text to backend for language detection
        const response = await fetch('http://localhost:3000/detect-language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        const { detectedLanguage } = await response.json();

        // Return the detected language
        return detectedLanguage;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
