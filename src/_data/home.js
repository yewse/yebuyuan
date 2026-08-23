const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

module.exports = function() {
  try {
    const filePath = path.join(__dirname, '../content/home.yml');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents);
  } catch (e) {
    console.error('Error loading home.yml:', e);
    return {
      name: 'Oliver',
      title: '锂电高级工艺工程师',
      tagline: '电极制造全流程工艺开发。',
      show_latest_posts: true,
      latest_posts_count: 3
    };
  }
};
