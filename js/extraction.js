// Function to recognize text from an image
const area = document.querySelector(".from-text");
const detectArea=document.querySelector(".lang-detect")
const resetButton = document.getElementById('reset-button');
const toArea=document.querySelector(".to-text")

async function recognizeText(imageData, languages) {
    try {
        // Recognize text from the image
        const result = await Tesseract.recognize(
            imageData, // Image data
            languages, // Languages to recognize
            { logger: info => console.log(info) } // Optional logger
        );

        // Return the recognized text
        return result.data.text;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

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

// Function to handle file change event
async function handleFileChange(event) {
    const file = event.target.files[0]; // Get the selected file
    const imageData = file; // Set the image data to the selected file

    // Languages to recognize
    const languages = ['eng', 'tam', 'hin', 'mal', 'pan','tel'];
    languages.push('guj');
    languages.push('kan');
    languages.push('mar');
    languages.push('ben');
    // languages.push('odi');
    // Recognize text
    const recognizedText = await recognizeText(imageData, languages);

    //Lang Detect
    const [response] = await detectLanguage(recognizedText);
    const detectedLanguage = response.lang;
    console.log(detectedLanguage)
    // Print the recognized text
    console.log('Recognized Text:', recognizedText);
    
    detectArea.value="Detected Languge is  :  " + detectedLanguage;

    area.value = recognizedText;
    area.setAttribute("placeholder", "Extracting..");
}

function handleReset(){
    area.value='';
    detectArea.value='';
    document.getElementById('input-file').value='';
    toArea.value='';
}

// Set up event listener for file input change
document.getElementById('input-file').addEventListener('change', handleFileChange);

resetButton.addEventListener('click',handleReset);
