/**
 * Loads the colors data from the JSON file and updates the page content.
 */
async function loadColors() {
  const colorRecordsElement = document.getElementById("colorRecords");
  try {
    // Fetches the colors data from the JSON file
    // with a query parameter to prevent caching.
    const response = await fetch(`data/colors.json?t=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Parses the JSON response into a JavaScript object.
    const records = await response.json();
    if (!Array.isArray(records)) throw new Error("Unexpected data format");

    // Processes each record and builds HTML output.
    let recordCount = 0;
    let newInnerHTML = "";
    for (const record of records) {
      const id = String(record.id).trim();
      if (id === "") continue;

      const r = colorValue(record.color.r);
      const g = colorValue(record.color.g);
      const b = colorValue(record.color.b);

      newInnerHTML += recordAsHTML(id, r, g, b);
      recordCount++;
    }

    // Updates the page with the new HTML content.
    if (recordCount > 0) colorRecordsElement.innerHTML = newInnerHTML;
    else colorRecordsElement.textContent = "No colors found! 😭";
  } catch (error) {
    console.error("Failed to load colors:", error);
    colorRecordsElement.textContent = "Error loading colors 😞";
  }
}

/**
 * Handles the change event for the color input fields.
 * @param {HTMLInputElement} e
 */
function handleColorChange(e) {
  const value = colorValue(e.value);
  if (e.value !== value.toString()) e.value = value;
  updateColorPreview();
}

/**
 * Handles the click event for the random color button.
 */
function handleRandomColor() {
  const min = 50; // Minimum value avoids very dark colors (0-49).
  const max = 255; // Maximum color value (255).

  ["r", "g", "b"].forEach((id) => {
    document.getElementById(id).value =
      Math.floor(Math.random() * (max - min + 1)) + min;
  });

  updateColorPreview();
}

/**
 * Updates the color preview element based on the current RGB values.
 */
function updateColorPreview() {
  const r = colorValue(document.getElementById("r").value);
  const g = colorValue(document.getElementById("g").value);
  const b = colorValue(document.getElementById("b").value);

  const color = RGBColorValue(r, g, b);
  const title = titleString("Preview", color);

  const colorPreviewElement = document.getElementById("colorPreview");
  colorPreviewElement.style.backgroundColor = color;
  colorPreviewElement.title = title;

  const colorPreviewJsonElement = document.getElementById("colorPreviewJson");
  colorPreviewJsonElement.textContent = recordAsJSON(r, g, b);
}

/**
 * Converts RGB values to a CSS color string.
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
function RGBColorValue(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Creates a title string.
 * @param {string} id
 * @param {string} color
 * @returns {string}
 */
function titleString(id, color) {
  return `${id}\n${color}`;
}

/**
 * Creates an HTML span element string.
 * @param {string} id
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
function recordAsHTML(id, r, g, b) {
  const color = RGBColorValue(r, g, b);
  const title = titleString(id, color);
  return `<span title="${escapeHTML(title)}" style="background-color: ${color}"></span>`;
}

/**
 * Creates a JSON string representation of an RGB color.
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
function recordAsJSON(r, g, b) {
  return `"color": { "r": ${r}, "g": ${g}, "b": ${b} }`;
}

/**
 * Escapes special characters in a string for safe HTML display.
 * @param {string} text
 * @returns {string}
 */
function escapeHTML(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (match) => map[match]);
}

/**
 * Validates a color value to be between 0 and 255.
 * @param {string|number} value
 * @returns {number}
 */
function colorValue(value) {
  const x = parseInt(value, 10) || 0;
  return x < 0 ? 0 : x > 255 ? 255 : x;
}
