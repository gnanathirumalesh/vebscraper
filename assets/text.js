async function download() {
  const url = document.getElementById('url').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
  let p = document.createElement('p')
  p.innerText = 'Downloading...';
  p.className = "downloading"
  resultDiv.appendChild(p);
  try {
    const response = await fetch(`https://text-hfnr.onrender.com/download?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      // Check for non-successful response
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

   
    const blob = await response.blob();

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Set the download attribute and trigger the download
    downloadLink.download = 'downloaded_text.txt';
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);

    p.className = "completed"
    p.innerText = 'Download completed!';
  } catch (error) {
    console.error('Error:', error.message);
    resultDiv.innerText = 'Error occurred. Please check the console for details.';
  }
}
