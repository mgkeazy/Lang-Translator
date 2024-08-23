// Get access to the camera
const video = document.getElementById('video');
const snapBtn = document.getElementById('snap');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureBtn = document.getElementById('capture');
const cameraContainer = document.getElementById('cameraContainer');
let stream = null;

// Function to start camera and show preview
async function startCamera() {
    try {
        // Get media stream
        stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Set the stream to the video element
        video.srcObject = stream;
        video.play();
        cameraContainer.style.display = 'block'; // Show the camera container
    } catch (error) {
        console.log("An error occurred: " + error);
    }
}

// Function to stop camera
function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
    }
}

// Function to capture a snapshot
function takeSnapshot() {
    // Pause the video stream
    video.pause();

    // Set canvas size to match video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video element onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL
    const dataURL = canvas.toDataURL('image/png');

    // Create a link element to download the image
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'snapshot.png';
    
    // Click the link to trigger the download
    link.click();

    // Stop camera and hide camera container
    stopCamera();
    cameraContainer.style.display = 'none';

    // Show "Take Snapshot" button again
    snapBtn.style.display = 'inline';
}

// Event listener for the snapshot button
snapBtn.addEventListener('click', function() {
    // Start camera and hide "Take Snapshot" button
    startCamera();
    this.style.display = 'none';
});

// Event listener for the capture button
captureBtn.addEventListener('click', takeSnapshot);
