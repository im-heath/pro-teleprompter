// Teleprompter State
const state = {
    isPlaying: false,
    scrollSpeed: 3,
    fontSize: 48,
    currentPosition: 0,
    animationFrame: null,
    isMirrored: false,
    isHighlightEnabled: true,
    currentTheme: 'dark',
    isControlsHidden: false,
    customColors: {
        background: '#000000',
        text: '#ffffff',
        accent: '#4CAF50'
    }
};

// DOM Elements
const elements = {
    scriptInput: document.getElementById('scriptInput'),
    scrollContent: document.getElementById('scrollContent'),
    speedSlider: document.getElementById('speedSlider'),
    speedValue: document.getElementById('speedValue'),
    fontSlider: document.getElementById('fontSlider'),
    fontValue: document.getElementById('fontValue'),
    playBtn: document.getElementById('playBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    mirrorToggle: document.getElementById('mirrorToggle'),
    highlightToggle: document.getElementById('highlightToggle'),
    readingGuide: document.getElementById('readingGuide'),
    controlPanel: document.getElementById('controlPanel'),
    toggleControls: document.getElementById('toggleControls'),
    teleprompterContainer: document.getElementById('teleprompterContainer'),
    importBtn: document.getElementById('importBtn'),
    exportBtn: document.getElementById('exportBtn'),
    clearBtn: document.getElementById('clearBtn'),
    fileInput: document.getElementById('fileInput'),
    customColorsSection: document.getElementById('customColorsSection'),
    bgColorPicker: document.getElementById('bgColorPicker'),
    textColorPicker: document.getElementById('textColorPicker'),
    accentColorPicker: document.getElementById('accentColorPicker'),
    spellCheckBtn: document.getElementById('spellCheckBtn'),
    autoCorrectBtn: document.getElementById('autoCorrectBtn'),
    spellCheckResults: document.getElementById('spellCheckResults')
};

// Initialize the application
function init() {
    loadFromLocalStorage();
    setupEventListeners();
    updateDisplay();

    // Set initial values
    elements.speedValue.textContent = state.scrollSpeed;
    elements.fontValue.textContent = state.fontSize;
    elements.speedSlider.value = state.scrollSpeed;
    elements.fontSlider.value = state.fontSize;

    if (state.isHighlightEnabled) {
        elements.readingGuide.classList.add('active');
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Script input
    elements.scriptInput.addEventListener('input', handleScriptInput);

    // Speed control
    elements.speedSlider.addEventListener('input', handleSpeedChange);

    // Font size control
    elements.fontSlider.addEventListener('input', handleFontChange);

    // Playback controls
    elements.playBtn.addEventListener('click', play);
    elements.pauseBtn.addEventListener('click', pause);
    elements.resetBtn.addEventListener('click', reset);

    // Display options
    elements.mirrorToggle.addEventListener('change', handleMirrorToggle);
    elements.highlightToggle.addEventListener('change', handleHighlightToggle);

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const theme = e.currentTarget.dataset.theme;
            changeTheme(theme);
        });
    });

    // Control panel toggle
    elements.toggleControls.addEventListener('click', toggleControlPanel);

    // Click on teleprompter to toggle play/pause
    elements.teleprompterContainer.addEventListener('click', togglePlayPause);

    // File import/export
    elements.importBtn.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileImport);
    elements.exportBtn.addEventListener('click', handleFileExport);
    elements.clearBtn.addEventListener('click', handleClear);

    // Custom color pickers
    elements.bgColorPicker.addEventListener('input', handleCustomColorChange);
    elements.textColorPicker.addEventListener('input', handleCustomColorChange);
    elements.accentColorPicker.addEventListener('input', handleCustomColorChange);

    // Color presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bg = e.currentTarget.dataset.bg;
            const text = e.currentTarget.dataset.text;
            const accent = e.currentTarget.dataset.accent;
            applyColorPreset(bg, text, accent);
        });
    });

    // Spell check buttons
    elements.spellCheckBtn.addEventListener('click', runSpellCheck);
    elements.autoCorrectBtn.addEventListener('click', runAutoCorrect);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);

    // Save state on window close
    window.addEventListener('beforeunload', saveToLocalStorage);
}

// Script Input Handler
function handleScriptInput(e) {
    const text = e.target.value;
    if (text.trim()) {
        // Escape HTML but preserve line breaks
        const escapedText = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        elements.scrollContent.innerHTML = escapedText;
        elements.scrollContent.classList.remove('placeholder');
    } else {
        elements.scrollContent.innerHTML = '<div class="placeholder">Enter your script in the control panel to get started</div>';
    }
    saveToLocalStorage();
}

// Speed Control
function handleSpeedChange(e) {
    state.scrollSpeed = parseFloat(e.target.value);
    elements.speedValue.textContent = state.scrollSpeed;
    saveToLocalStorage();
}

// Font Size Control
function handleFontChange(e) {
    state.fontSize = parseInt(e.target.value);
    elements.fontValue.textContent = state.fontSize;
    elements.scrollContent.style.fontSize = `${state.fontSize}px`;
    saveToLocalStorage();
}

// Playback Functions
function play() {
    if (state.isPlaying) return;

    state.isPlaying = true;
    elements.playBtn.style.opacity = '0.5';
    elements.pauseBtn.style.opacity = '1';

    function scroll() {
        if (!state.isPlaying) return;

        state.currentPosition += state.scrollSpeed * 0.5;
        elements.scrollContent.style.transform = `translateY(-${state.currentPosition}px)`;

        // Check if we've reached the end
        const maxScroll = elements.scrollContent.scrollHeight - elements.teleprompterContainer.clientHeight;
        if (state.currentPosition >= maxScroll + window.innerHeight * 0.5) {
            pause();
            return;
        }

        state.animationFrame = requestAnimationFrame(scroll);
    }

    scroll();
}

function pause() {
    state.isPlaying = false;
    elements.playBtn.style.opacity = '1';
    elements.pauseBtn.style.opacity = '0.5';

    if (state.animationFrame) {
        cancelAnimationFrame(state.animationFrame);
        state.animationFrame = null;
    }
}

function reset() {
    pause();
    state.currentPosition = 0;
    elements.scrollContent.style.transform = 'translateY(0)';
}

function togglePlayPause() {
    if (state.isPlaying) {
        pause();
    } else {
        play();
    }
}

// Mirror Mode
function handleMirrorToggle(e) {
    state.isMirrored = e.target.checked;
    if (state.isMirrored) {
        elements.scrollContent.classList.add('mirrored');
    } else {
        elements.scrollContent.classList.remove('mirrored');
    }
    saveToLocalStorage();
}

// Highlight Toggle
function handleHighlightToggle(e) {
    state.isHighlightEnabled = e.target.checked;
    if (state.isHighlightEnabled) {
        elements.readingGuide.classList.add('active');
    } else {
        elements.readingGuide.classList.remove('active');
    }
    saveToLocalStorage();
}

// Theme Management
function changeTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-green', 'theme-blue');

    // Show/hide custom colors section
    if (theme === 'custom') {
        elements.customColorsSection.style.display = 'block';
        applyCustomColors();
    } else {
        elements.customColorsSection.style.display = 'none';
        // Add new theme
        if (theme !== 'dark') {
            document.body.classList.add(`theme-${theme}`);
        }
    }

    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });

    state.currentTheme = theme;
    saveToLocalStorage();
}

// Custom Color Change Handler
function handleCustomColorChange() {
    state.customColors.background = elements.bgColorPicker.value;
    state.customColors.text = elements.textColorPicker.value;
    state.customColors.accent = elements.accentColorPicker.value;

    applyCustomColors();
    saveToLocalStorage();
}

// Apply Custom Colors
function applyCustomColors() {
    const root = document.documentElement;

    root.style.setProperty('--bg-primary', state.customColors.background);
    root.style.setProperty('--text-primary', state.customColors.text);
    root.style.setProperty('--accent-color', state.customColors.accent);

    // Calculate secondary colors based on primary
    const bgLighter = lightenColor(state.customColors.background, 10);
    const textDimmed = dimColor(state.customColors.text, 20);
    const borderColor = lightenColor(state.customColors.background, 20);

    root.style.setProperty('--bg-secondary', bgLighter);
    root.style.setProperty('--text-secondary', textDimmed);
    root.style.setProperty('--border-color', borderColor);
    root.style.setProperty('--highlight-bg', state.customColors.accent + '33'); // 20% opacity
}

// Apply Color Preset
function applyColorPreset(bg, text, accent) {
    elements.bgColorPicker.value = bg;
    elements.textColorPicker.value = text;
    elements.accentColorPicker.value = accent;

    state.customColors.background = bg;
    state.customColors.text = text;
    state.customColors.accent = accent;

    applyCustomColors();
    saveToLocalStorage();
}

// Color Utility Functions
function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, ((num >> 16) & 0xff) + Math.round((255 - ((num >> 16) & 0xff)) * percent / 100));
    const g = Math.min(255, ((num >> 8) & 0xff) + Math.round((255 - ((num >> 8) & 0xff)) * percent / 100));
    const b = Math.min(255, (num & 0xff) + Math.round((255 - (num & 0xff)) * percent / 100));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function dimColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(((num >> 16) & 0xff) * percent / 100));
    const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(((num >> 8) & 0xff) * percent / 100));
    const b = Math.max(0, (num & 0xff) - Math.round((num & 0xff) * percent / 100));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// Control Panel Toggle
function toggleControlPanel() {
    state.isControlsHidden = !state.isControlsHidden;

    if (state.isControlsHidden) {
        elements.controlPanel.classList.add('hidden');
        elements.toggleControls.textContent = '⚙️';
        elements.toggleControls.title = 'Show Controls (H)';
    } else {
        elements.controlPanel.classList.remove('hidden');
        elements.toggleControls.textContent = '⚙️';
        elements.toggleControls.title = 'Hide Controls (H)';
    }
}

// File Import
async function handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check if it's a PDF file
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        await handlePDFImport(file);
    } else {
        // Handle text files
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            elements.scriptInput.value = text;
            elements.scrollContent.innerHTML = escapeHtml(text);
            elements.scrollContent.classList.remove('placeholder');
            saveToLocalStorage();
        };
        reader.readAsText(file);
    }

    // Reset file input
    e.target.value = '';
}

// PDF Import Handler
async function handlePDFImport(file) {
    try {
        // Configure PDF.js worker
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';

        // Extract text from each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }

        // Clean up the text
        fullText = fullText
            .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
            .replace(/ \n /g, '\n')  // Clean up line breaks
            .trim();

        elements.scriptInput.value = fullText;
        elements.scrollContent.innerHTML = escapeHtml(fullText);
        elements.scrollContent.classList.remove('placeholder');
        saveToLocalStorage();

    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF file. Please try a different file or convert it to text first.');
    }
}

// Escape HTML to prevent rendering issues
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// File Export
function handleFileExport() {
    const text = elements.scriptInput.value;
    if (!text.trim()) {
        alert('No script to export!');
        return;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teleprompter-script-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Clear Script
function handleClear() {
    if (confirm('Are you sure you want to clear the script?')) {
        elements.scriptInput.value = '';
        elements.scrollContent.innerHTML = '<div class="placeholder">Enter your script in the control panel to get started</div>';
        reset();
        saveToLocalStorage();
    }
}

// Keyboard Shortcuts
function handleKeyPress(e) {
    // Ignore if typing in textarea
    if (e.target === elements.scriptInput) return;

    switch(e.key.toLowerCase()) {
        case ' ':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'r':
            e.preventDefault();
            reset();
            break;
        case 'arrowup':
            e.preventDefault();
            increaseSpeed();
            break;
        case 'arrowdown':
            e.preventDefault();
            decreaseSpeed();
            break;
        case '+':
        case '=':
            e.preventDefault();
            increaseFontSize();
            break;
        case '-':
        case '_':
            e.preventDefault();
            decreaseFontSize();
            break;
        case 'm':
            e.preventDefault();
            elements.mirrorToggle.checked = !elements.mirrorToggle.checked;
            handleMirrorToggle({ target: elements.mirrorToggle });
            break;
        case 'h':
            e.preventDefault();
            toggleControlPanel();
            break;
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
    }
}

// Speed Adjustment Functions
function increaseSpeed() {
    if (state.scrollSpeed < 10) {
        state.scrollSpeed = Math.min(10, state.scrollSpeed + 0.5);
        elements.speedSlider.value = state.scrollSpeed;
        elements.speedValue.textContent = state.scrollSpeed;
        saveToLocalStorage();
    }
}

function decreaseSpeed() {
    if (state.scrollSpeed > 1) {
        state.scrollSpeed = Math.max(1, state.scrollSpeed - 0.5);
        elements.speedSlider.value = state.scrollSpeed;
        elements.speedValue.textContent = state.scrollSpeed;
        saveToLocalStorage();
    }
}

// Font Size Adjustment Functions
function increaseFontSize() {
    if (state.fontSize < 120) {
        state.fontSize = Math.min(120, state.fontSize + 4);
        elements.fontSlider.value = state.fontSize;
        elements.fontValue.textContent = state.fontSize;
        elements.scrollContent.style.fontSize = `${state.fontSize}px`;
        saveToLocalStorage();
    }
}

function decreaseFontSize() {
    if (state.fontSize > 24) {
        state.fontSize = Math.max(24, state.fontSize - 4);
        elements.fontSlider.value = state.fontSize;
        elements.fontValue.textContent = state.fontSize;
        elements.scrollContent.style.fontSize = `${state.fontSize}px`;
        saveToLocalStorage();
    }
}

// Fullscreen Toggle
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
        document.body.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        document.body.classList.remove('fullscreen');
    }
}

// Local Storage Functions
function saveToLocalStorage() {
    const data = {
        script: elements.scriptInput.value,
        scrollSpeed: state.scrollSpeed,
        fontSize: state.fontSize,
        isMirrored: state.isMirrored,
        isHighlightEnabled: state.isHighlightEnabled,
        currentTheme: state.currentTheme,
        customColors: state.customColors
    };
    localStorage.setItem('teleprompterData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('teleprompterData');
    if (saved) {
        try {
            const data = JSON.parse(saved);

            // Restore script
            if (data.script) {
                elements.scriptInput.value = data.script;
                elements.scrollContent.innerHTML = escapeHtml(data.script);
                elements.scrollContent.classList.remove('placeholder');
            }

            // Restore settings
            if (data.scrollSpeed) state.scrollSpeed = data.scrollSpeed;
            if (data.fontSize) state.fontSize = data.fontSize;
            if (data.isMirrored !== undefined) {
                state.isMirrored = data.isMirrored;
                elements.mirrorToggle.checked = data.isMirrored;
                if (data.isMirrored) {
                    elements.scrollContent.classList.add('mirrored');
                }
            }
            if (data.isHighlightEnabled !== undefined) {
                state.isHighlightEnabled = data.isHighlightEnabled;
                elements.highlightToggle.checked = data.isHighlightEnabled;
            }
            if (data.currentTheme) {
                changeTheme(data.currentTheme);
            }
            if (data.customColors) {
                state.customColors = data.customColors;
                elements.bgColorPicker.value = data.customColors.background;
                elements.textColorPicker.value = data.customColors.text;
                elements.accentColorPicker.value = data.customColors.accent;
                if (data.currentTheme === 'custom') {
                    applyCustomColors();
                }
            }

            // Apply font size
            elements.scrollContent.style.fontSize = `${state.fontSize}px`;
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Update Display
function updateDisplay() {
    elements.scrollContent.style.fontSize = `${state.fontSize}px`;
}

// Spell Check Functions
const commonMisspellings = {
    'teh': 'the',
    'adn': 'and',
    'taht': 'that',
    'thier': 'their',
    'recieve': 'receive',
    'occured': 'occurred',
    'seperate': 'separate',
    'definately': 'definitely',
    'untill': 'until',
    'wich': 'which',
    'wiht': 'with',
    'thsi': 'this',
    'waht': 'what',
    'dont': "don't",
    'cant': "can't",
    'wont': "won't",
    'shouldnt': "shouldn't",
    'wouldnt': "wouldn't",
    'couldnt': "couldn't",
    'isnt': "isn't",
    'wasnt': "wasn't",
    'werent': "weren't",
    'hasnt': "hasn't",
    'havent': "haven't",
    'hadnt': "hadn't",
    'didnt': "didn't",
    'doesnt': "doesn't"
};

function runSpellCheck() {
    const text = elements.scriptInput.value;

    if (!text.trim()) {
        elements.spellCheckResults.style.display = 'none';
        return;
    }

    // Use browser's built-in spell checker if available
    const errors = [];
    const words = text.split(/\s+/);

    words.forEach((word, index) => {
        const cleanWord = word.replace(/[.,!?;:'"()]/g, '').toLowerCase();

        if (commonMisspellings[cleanWord]) {
            errors.push({
                original: word,
                suggestion: commonMisspellings[cleanWord],
                position: index
            });
        }
    });

    displaySpellCheckResults(errors);
}

function displaySpellCheckResults(errors) {
    if (errors.length === 0) {
        elements.spellCheckResults.innerHTML = `
            <div class="spell-check-summary success">
                ✓ No common spelling errors found!
            </div>
        `;
        elements.spellCheckResults.style.display = 'block';
        setTimeout(() => {
            elements.spellCheckResults.style.display = 'none';
        }, 3000);
        return;
    }

    let html = `
        <div class="spell-check-summary errors">
            Found ${errors.length} potential error${errors.length > 1 ? 's' : ''}
        </div>
    `;

    errors.forEach(error => {
        html += `
            <div class="spell-error">
                <span class="spell-error-word">"${error.original}"</span> might be misspelled
                <div class="spell-suggestions">
                    Suggestion: <span class="spell-suggestion-item" onclick="replaceWord('${error.original}', '${error.suggestion}')">${error.suggestion}</span>
                </div>
            </div>
        `;
    });

    elements.spellCheckResults.innerHTML = html;
    elements.spellCheckResults.style.display = 'block';
}

function replaceWord(original, replacement) {
    const text = elements.scriptInput.value;
    // Use word boundaries to replace whole words only
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    elements.scriptInput.value = text.replace(regex, replacement);

    // Trigger input event to update display
    handleScriptInput({ target: elements.scriptInput });
    saveToLocalStorage();

    // Re-run spell check to update results
    runSpellCheck();
}

function runAutoCorrect() {
    const text = elements.scriptInput.value;

    if (!text.trim()) {
        return;
    }

    let correctedText = text;
    let correctionCount = 0;

    // Auto-correct common misspellings
    Object.keys(commonMisspellings).forEach(wrong => {
        const right = commonMisspellings[wrong];
        const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
        const matches = correctedText.match(regex);
        if (matches) {
            correctionCount += matches.length;
            correctedText = correctedText.replace(regex, right);
        }
    });

    if (correctionCount > 0) {
        elements.scriptInput.value = correctedText;
        handleScriptInput({ target: elements.scriptInput });
        saveToLocalStorage();

        elements.spellCheckResults.innerHTML = `
            <div class="spell-check-summary success">
                ✓ Auto-corrected ${correctionCount} error${correctionCount > 1 ? 's' : ''}!
            </div>
        `;
        elements.spellCheckResults.style.display = 'block';
        setTimeout(() => {
            elements.spellCheckResults.style.display = 'none';
        }, 3000);
    } else {
        elements.spellCheckResults.innerHTML = `
            <div class="spell-check-summary success">
                ✓ No common errors to auto-correct!
            </div>
        `;
        elements.spellCheckResults.style.display = 'block';
        setTimeout(() => {
            elements.spellCheckResults.style.display = 'none';
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
