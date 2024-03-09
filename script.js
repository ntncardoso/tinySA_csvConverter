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
    return lines.map(line => {
        const [frequencyHz, amplitudeDbm] = line.split(';').map(parseFloat);
        return [frequencyHz / 1e6, amplitudeDbm]; // Convert Hz to MHz for the x-values
    });
}

function drawChart(data) {
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Frequency Spectrum Analysis'
        },
        xAxis: {
            title: {
                text: 'Frequency (MHz)'
            }
        },
        yAxis: {
            title: {
                text: 'Amplitude (dBm)'
            }
        },
        series: [{
            name: 'Frequency vs. Amplitude',
            data: data
        }]
    });
}
});