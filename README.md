# Translator

This project is a simple language translator that converts text between English, German, and Spanish. It includes both a front-end web interface and a back-end server to handle translation requests.

## 📊 Project Structure

The project is organized as follows:

```
Translator/
├── public_html/
│ ├── index.html
│ ├── index.css
│ ├── index.js
│ ├── package.json
│ └── package-lock.json
├── German.txt
├── Spanish.txt
├── translator.js
├── package.json
├── README.md
└── package-lock.json
```


## Features

- **Language Translation:** Convert text between English, German, and Spanish.
- **Web Interface:** A simple front-end to input text and choose languages for translation.
- **Server-side Processing:** Handles translation requests and serves the translation results.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```
    cd Translator
    ```
3. Install the necessary dependencies for both the server and the front-end:
    ```
    npm install
    cd public_html
    npm install
    cd ..
    ```

## Usage

1. Start the server:
    ```
    node translator.js
    ```
2. Open your web browser and navigate to:
    ```
    http://127.0.0.1:5000/
    ```
3. Use the web interface to input text, select the source and target languages, and view the translated output.

## Project Files

### `public_html/index.html`

This is the main HTML file that structures the web interface of the translator.

### `public_html/index.css`

This CSS file contains the styles for the web interface, including layout, font sizes, and colors.

### `public_html/index.js`

Handles the client-side logic for capturing user input, sending AJAX requests to the server, and displaying the translation results.

### `translator.js`

The main server script that uses Node.js and Express to handle translation requests. It reads from text files to build dictionaries for English-German and English-Spanish translations.

### `German.txt` & `Spanish.txt`

These files contain word pairs used by the server to perform translations between English and German, and English and Spanish, respectively.

