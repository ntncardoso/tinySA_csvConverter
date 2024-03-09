document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fileInput').addEventListener('change', handleFileChange, false);

    async function handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) {
            alert('No file selected.');
            return;
        }
        try {
            const content = await readFile(file);
            const data = processData(content);
            drawChart(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to process file: ' + error.message);
        }
    }

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const
reader = new FileReader();
reader.onload = e => resolve(e.target.result);
reader.onerror = e => reject(new Error('Error reading file: ' + e));
reader.readAsText(file);
});
}

function processData(csv) {
    const lines = csv.trim().split('\n');
    const data = lines.map(line => {
        const values = line.split(';'); // Assuming semicolon-separated values
        let frequencyMHz = parseFloat(values[0]) / 1e6; // Convert Hz to MHz
        let amplitudeDbm = parseFloat(values[1]);

        // Format frequency to 3 decimal places as a number
        frequencyMHz = Number(frequencyMHz.toFixed(3));

        // Check for NaN values and log errors for debugging
        if (isNaN(frequencyMHz) || isNaN(amplitudeDbm)) {
            console.error('Invalid data for line:', line, '| Parsed as:', {frequencyMHz, amplitudeDbm});
        }

        return { x: frequencyMHz, y: amplitudeDbm };
    }).filter(point => !isNaN(point.x) && !isNaN(point.y)); // Filter out invalid data points

    return data;
}

function drawChart(data) {
    Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Frequency vs. Amplitude'
        },
        xAxis: {
            title: {
                text: 'Frequency (MHz)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Amplitude (dBm)'
            }
        },
        series: [{
            name: 'Measurements',
            color: 'rgba(223, 83, 83, .5)',
            data: data.map(item => [item.x, item.y])
        }]
    });
}

});