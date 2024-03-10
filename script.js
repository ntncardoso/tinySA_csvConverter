// Ensure DOM content is fully loaded before executing script
document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    const fileInput = document.getElementById('fileInput');
    const fileSelect = document.getElementById('fileSelect');
    const downloadBtn = document.getElementById('downloadBtn');
    let filesData = {}; // Object to store processed data for each file

    // Event listener for file input change
    fileInput.addEventListener('change', async function(event) {
        const files = event.target.files;
        fileSelect.innerHTML = ''; // Reset file select options
        filesData = {}; // Clear previous file data
        downloadBtn.style.display = 'none'; // Initially hide download button
        
        // Process each selected file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                // Read and process file content
                const content = await readFile(file);
                const data = processData(content);
                filesData[file.name] = data; // Store data keyed by file name

                // Add file option to dropdown
                const option = document.createElement('option');
                option.value = option.textContent = file.name;
                fileSelect.appendChild(option);
           
} catch (error) {
console.error('Error processing file:', file.name, error);
}
}

    // Trigger chart update and download button preparation when a file is selected from dropdown
    fileSelect.addEventListener('change', function() {
        const selectedFile = this.value;
        if (selectedFile && filesData[selectedFile]) {
            drawChart(filesData[selectedFile]); // Draw chart for selected file
            prepareDownloadBtn(filesData[selectedFile], selectedFile); // Prepare download button for new data
            downloadBtn.style.display = 'inline'; // Show download button
        }
    });
});

// Function to read a file's content
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result); // Successfully read
        reader.onerror = event => reject(new Error('Error reading file: ' + event.target.error)); // Error occurred
        reader.readAsText(file);
    });
}

// Function to process CSV content into a format suitable for Highcharts
function processData(csv) {
    return csv.trim().split('\n').map(line => {
        const [frequencyHz, amplitudeDbm] = line.split(';').map(parseFloat);
        return [frequencyHz / 1e6, amplitudeDbm]; // Convert Hz to MHz and pair with amplitude
    }).filter(pair => !isNaN(pair[0]) && !isNaN(pair[1])); // Ensure both values are numbers
}

// Function to draw chart with Highcharts
function drawChart(data) {
    Highcharts.chart('container', {
        chart: { type: 'line' },
        title: { text: 'Frequency vs. Amplitude' },
        xAxis: { title: { text: 'Frequency (MHz)' } },
        yAxis: { title: { text: 'Amplitude (dBm)' } },
        series: [{ name: 'Measurements', data }]
    });
}

// Function to prepare download button for downloading formatted CSV data
function prepareDownloadBtn(data, fileName) {
    downloadBtn.onclick = function() {
        const formattedCSV = data.map(pair => pair.join(';')).join('\n');
        const blob = new Blob([formattedCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Formatted_' + fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
}
});