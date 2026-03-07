const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('TutorialTooltip')) {
    // Remove import
    content = content.replace(/import TutorialTooltip from '\.\/TutorialTooltip';\n?/g, '');
    
    // Remove opening tags
    content = content.replace(/<TutorialTooltip[^>]*>/g, '');
    
    // Remove closing tags
    content = content.replace(/<\/TutorialTooltip>/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
