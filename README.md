# Fact Checker Extension

This browser extension adds a context menu option that allows users to fact-check selected text using the Gemini API. It is designed to work on both Firefox and Chromium-based browsers.

## Features

- Context menu integration for easy access to fact-checking.
- Utilizes the Gemini API to analyze and provide feedback on selected text.
- Compatible with both Manifest V2 and V3.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd fact-checker-extension
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Load the extension in your browser:
   - For Chrome:
     - Go to `chrome://extensions/`
     - Enable "Developer mode"
     - Click "Load unpacked" and select the `fact-checker-extension` directory.
   - For Firefox:
     - Go to `about:debugging#/runtime/this-firefox`
     - Click "Load Temporary Add-on" and select the `manifest-v2.json` or `manifest-v3.json` file.

## Usage

1. Select any text on a webpage.
2. Right-click to open the context menu.
3. Click on the "Fact Check" option to analyze the selected text.
4. The results will be displayed in the console.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.