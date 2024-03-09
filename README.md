# CSV Data Visualization with Highcharts

This project provides a simple web application for visualizing data from CSV files using Highcharts. It focuses on converting frequency values from Hz to MHz and plotting them against amplitude in dBm, making it particularly useful for RF spectrum analysis or similar applications.

## Features

- Upload CSV files directly in the browser.
- Automatic conversion of frequency values from Hz to MHz.
- Interactive visualization of frequency vs. amplitude using Highcharts.
- Easy to integrate and expand for different types of data visualization.

## Getting Started

### Prerequisites

- A modern web browser capable of running JavaScript ES6.
- No server-side processing is required.

### Installation

Clone the repository to your local machine:

git clone https://github.com/ntncardoso/tinySA_csvConverter

Navigate to the project directory:

cd your-repository-name

Open the `index.html` file in your web browser to start using the application.

### Usage

1. Click on the "Choose File" button and select a CSV file from your computer.
2. The application will automatically process the file and display the visualization.
3. Interact with the chart to explore the data points.

## File Format

The expected CSV file format is as follows:

- Two columns: Frequency (Hz) and Amplitude (dBm), separated by a semicolon (`;`).
- No header row is required.
- Example row: `450000000;-110.6`

## Built With

- [Highcharts](https://www.highcharts.com/) - Used for generating interactive charts.
- HTML5
- JavaScript

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Highcharts team for providing an excellent charting library.
- All contributors who participate in this project.
