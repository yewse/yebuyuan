const markdownIt = require("markdown-it");
const markdownItContainer = require("markdown-it-container");

module.exports = function(eleventyConfig) {
  // 复制静态资源
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Markdown配置
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  
  // 提示框 :::callout type
  md.use(markdownItContainer, 'callout', {
    validate: function(params) {
      return params.trim().match(/^callout\s+(\w+)$/);
    },
    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(/^callout\s+(\w+)$/);
      if (tokens[idx].nesting === 1) {
        const type = m ? m[1] : 'info';
        const icons = {
          info: 'ℹ️',
          warning: '⚠️',
          success: '✅',
          danger: '❌'
        };
        return `<div class="callout callout-${type}"><span class="callout-icon">${icons[type]}</span><div class="callout-content">`;
      } else {
        return '</div></div>\n';
      }
    }
  });
  
  // 铜箔引用 :::pullquote
  md.use(markdownItContainer, 'pullquote', {
    validate: function(params) {
      return params.trim() === 'pullquote';
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return '<div class="pullquote">';
      } else {
        return '</div>\n';
      }
    }
  });
  
  // 数据卡片 :::datacard
  md.use(markdownItContainer, 'datacard', {
    validate: function(params) {
      return params.trim() === 'datacard';
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return '<div class="datacard">';
      } else {
        return '</div>\n';
      }
    }
  });
  
  // 图片图注 :::figure
  md.use(markdownItContainer, 'figure', {
    validate: function(params) {
      return params.trim() === 'figure';
    },
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return '<figure class="article-figure">';
      } else {
        return '</figure>\n';
      }
    }
  });
  
  eleventyConfig.setLibrary("md", md);
  
  // 日期过滤器
  eleventyConfig.addFilter("readableDate", dateObj => {
    const date = new Date(dateObj);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
  });
  
  eleventyConfig.addFilter("isoDate", dateObj => {
    const date = new Date(dateObj);
    return date.toISOString().split('T')[0];
  });
  
  eleventyConfig.addFilter("chineseDate", dateObj => {
    const date = new Date(dateObj);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  });
  
  // 按日期排序
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });
  
  // 画廊集合
  eleventyConfig.addCollection("gallery", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/gallery/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });
  
  // 复制content文件为数据
  eleventyConfig.addPassthroughCopy("src/content");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
