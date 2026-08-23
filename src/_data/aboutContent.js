const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');

module.exports = function() {
  try {
    const filePath = path.join(__dirname, '../content/about.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const md = markdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    
    return {
      title: data.title || '关于我',
      portrait: data.portrait || null,
      content: md.render(content)
    };
  } catch (e) {
    console.error('Error loading about.md:', e);
    return {
      title: '关于我',
      portrait: null,
      content: '<p>内容加载中...</p>'
    };
  }
};
