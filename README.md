# Professional Teleprompter

A feature-rich, web-based teleprompter application designed for content creators, public speakers, and video producers. Perfect for recording videos, live presentations, and public speaking events.

## Features

### Core Functionality
- **Smooth Auto-Scrolling** - Customizable scrolling with precise speed control (1-10x)
- **Variable Font Sizing** - Adjust text size from 24px to 120px for optimal readability at any distance
- **Multiple Color Themes** - Dark, Light, Green Screen, and Blue themes for different lighting conditions
- **Reading Guide** - Optional horizontal highlight bar to help track your current position

### Professional Features
- **Mirror Mode** - Flip text horizontally for use with glass teleprompters
- **Custom Colors** - Full RGB color customization for background, text, and accents
- **Color Presets** - Quick-select professional color combinations
- **Fullscreen Mode** - Distraction-free reading experience
- **Hide Controls** - Minimize UI for clean recording
- **Persistent State** - Automatically saves your script and settings

### File Management
- **Import Scripts** - Load .txt or .md files
- **Export Scripts** - Save your scripts for backup or sharing
- **Auto-Save** - Scripts are automatically saved to browser storage

### Control Methods
- **Mouse Control** - Click to play/pause
- **Touch Control** - Tap to play/pause on mobile devices
- **Keyboard Shortcuts** - Comprehensive shortcuts for hands-free operation

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `R` | Reset to beginning |
| `↑` | Increase speed |
| `↓` | Decrease speed |
| `+` | Increase font size |
| `-` | Decrease font size |
| `M` | Toggle mirror mode |
| `H` | Hide/Show controls |
| `F` | Toggle fullscreen |

## How to Use

### Basic Setup
1. Open [index.html](index.html) in a modern web browser
2. Enter or paste your script in the text area
3. Adjust speed and font size to your preference
4. Click Play or press Space to start scrolling

### For Video Recording
1. Import your script or type it directly
2. Adjust font size for your camera distance
3. Select your preferred color theme (dark works best for most setups)
4. Enable "Highlight Current Section" for easier tracking
5. Press `F` for fullscreen mode
6. Press `H` to hide controls
7. Click the screen or press Space to begin

### For Glass Teleprompters
1. Enable "Mirror Mode" checkbox
2. Position your device below your camera lens
3. Use a beamsplitter glass at 45° angle
4. Adjust font size and speed as needed
5. The mirrored text will appear correctly when reflected in the glass

### For Live Presentations
1. Place your device in a convenient location
2. Use a larger font size for easy reading from a distance
3. Enable the reading guide for better tracking
4. Use keyboard shortcuts to control playback hands-free

## Tips for Best Results

### Speed Settings
- **1-3**: Slow pace for complex technical content
- **3-5**: Natural speaking pace for most content
- **5-7**: Faster pace for energetic presentations
- **7-10**: Very fast for experienced speakers or reviewing content

### Font Size Recommendations
- **24-36px**: Small screens, close distance
- **48-64px**: Standard use, medium distance (2-4 feet)
- **80-100px**: Large screens, far distance (5+ feet)
- **100-120px**: Glass teleprompters or very large displays

### Theme Selection
- **Dark**: Best for most recording setups, easy on the eyes
- **Light**: Good for well-lit environments, outdoor use
- **Green**: Ideal for green screen production workflows
- **Blue**: Alternative high-contrast option
- **Custom**: Create your own color scheme with RGB color pickers
  - Choose background, text, and accent colors
  - Use quick presets: Green on Black, Black on White, Navy, Red Alert, Gold, Gray
  - Perfect for matching your brand colors or personal preferences

## Browser Compatibility

Works best on modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Privacy

All data is stored locally in your browser. No scripts or settings are sent to any server. Your content remains completely private.

## Technical Details

- Pure HTML, CSS, and JavaScript - no frameworks required
- Responsive design works on desktop, tablet, and mobile
- Uses localStorage for persistent state
- RequestAnimationFrame for smooth 60fps scrolling
- No external dependencies or internet connection required

## Troubleshooting

### Text is not scrolling
- Make sure you have entered text in the script area
- Check that you clicked Play or pressed Space
- Try resetting with the R key and playing again

### Scrolling is too fast/slow
- Use the speed slider or arrow keys (↑/↓) to adjust
- Speed can be fine-tuned from 1.0 to 10.0

### Can't see the controls
- Press `H` to toggle control panel visibility
- Exit fullscreen mode with `Esc` key

### Script is not saving
- Ensure your browser allows localStorage
- Check that you're not in private/incognito mode
- Some browsers may have storage limitations

## License

Free to use for personal and commercial projects.

## Credits

Created for professional content creators, speakers, and video producers who need a reliable, feature-rich teleprompter solution.

---

**Version 1.0** - Professional Teleprompter
