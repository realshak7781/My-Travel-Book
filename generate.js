const fs = require('fs');
const path = require('path');

// 1. Setup paths
const imagesDir = path.join(__dirname, 'public', 'travel');
const outputFile = path.join(__dirname, 'app', 'data', 'index.ts');

// 2. A palette of "Travel Aesthetic" colors to cycle through
const colors = [
    "#f3f4f6", // Cool Gray
    "#fde68a", // Soft Gold
    "#d1fae5", // Sage Green
    "#fef3c7", // Warm Amber
    "#fcd5ce", // Sunset Peach
    "#f5f5dc", // Beige
    "#fbcfe8", // Soft Pink
    "#e0f2fe", // Sky Blue
    "#ffedd5", // Light Orange
    "#f1f5f9", // Slate Mist
    "#fae8ff", // Light Purple
];

// 3. A list of captions to cycle through
const subtitles = [
    "Collecting moments, not things.",
    "The journey of a thousand miles begins with a single step.",
    "Wandering where the WiFi is weak.",
    "Adventure awaits around every corner.",
    "Memories made in the mountains stay in our hearts forever.",
    "Chasing sunsets and new horizons.",
    "Lost in the right direction.",
    "Nature is not a place to visit. It is home.",
    "Just another day in paradise.",
    "Exploring the world, one photo at a time."
];

// 4. Read the directory
console.log(`Scanning ${imagesDir}...`);

try {
    const files = fs.readdirSync(imagesDir);
    
    // Filter for images only (jpg, jpeg, png, webp)
    const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/.test(file)
    );

    console.log(`Found ${imageFiles.length} images.`);

    // 5. Generate the data array
    const cardsData = imageFiles.map((filename, index) => {
        // Create a readable title from filename (e.g., "IMG_2159.jpg" -> "Memory 2159")
        // You can customize this logic!
        const cleanName = filename.split('.')[0];
        const title = `Travel Memory ${cleanName.replace('IMG_', '#').replace('Manali_', 'Manali ')}`;
        
        return {
            id: cleanName.toLowerCase(),
            title: title,
            subtitle: subtitles[index % subtitles.length], // Cycle through subtitles
            image: `/travel/${filename}`,
            color: colors[index % colors.length], // Cycle through colors
        };
    });

    // 6. Create the file content string
    const fileContent = `export const CARDS_DATA = ${JSON.stringify(cardsData, null, 4)};`;

    // 7. Write the file
    fs.writeFileSync(outputFile, fileContent);

    console.log(`✅ Success! Generated ${cardsData.length} cards in app/data/index.ts`);

} catch (err) {
    console.error("❌ Error:", err);
}