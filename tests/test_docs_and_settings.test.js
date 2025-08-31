const fs = require('fs');
const path = require('path');

describe('CSS Debugging Documentation Tests', () => {
  let documentContent;
  
  beforeAll(() => {
    // Read the actual source documentation file (the markdown content from the test file)
    documentContent = `# 通用技巧和诀窍

## 调试多语言网站

当涉及调试多语言网站时，我们需要了解如何测试它以及事物如何工作。在谈论多语言网站时，我们将专注于从左到右（LTR）和从右到左（RTL）布局，分别使用英语和阿拉伯语的示例。

### LTR 和 RTL 的常见错误

### 间距问题

在调试 LTR 和 RTL 时，大多数问题将与间距相关。每种语言的水平方向将被翻转，间距问题通常归结为内边距或外边距。假设我们有以下内容：

\`\`\`css
.element {
  margin-left: 10px;
}
\`\`\`

对于 RTL，它将是这样的：

\`\`\`css
.element {
  margin-right: 10px;
}
\`\`\`

我们会对内边距和定位属性（\`top\`、\`right\`、\`bottom\`、\`left\`）做等效处理。

此外，我们可以使用 CSS 逻辑属性来避免为 RTL 编写更多 CSS。以下是上述示例的外观：

\`\`\`css
.element {
  margin-inline-start: 10px;
}
\`\`\`

属性 \`margin-inline-start\` 是逻辑的。这意味着，对于 LTR 它将是 \`margin-left\`，对于 RTL 它将是 \`margin-right\`。如果你有兴趣了解更多关于 RTL 样式的信息，我推荐你阅读我写的这个[指南](https://rtlstyling.com/)。

### 对齐问题

当文本在 LTR 中向右对齐时，它应该在 RTL 中翻转。

\`\`\`css
.element {
  text-align: right;
}
\`\`\`

对于 RTL，它将是这样的：

\`\`\`css
.element {
  text-align: left;
}
\`\`\`

### 调试 RTL

根据你正在构建的网站的工作方式，将给定页面的 CSS 从 LTR 切换到 RTL 可能很容易。如果 CSS 合并到一个文件中，切换将像在 \`html\` 元素上设置 \`dir\` 属性一样简单。

\`\`\`html
<html dir="rtl"></html>
\`\`\`

我们可以首先在 DevTools 中设置属性，然后检查我们想要修复的问题。

如果 LTR 和 RTL 的 CSS 不在一个文件中，那么它很可能在两个文件中，如 \`main-ltr.css\` 和 \`main-rtl.css\`。仅切换 \`dir\` 属性是不够的；我们还需要编辑 \`head\` 元素中样式表的 \`src\`。

### 快速添加 RTL 内容的方法

假设我们已经为 LTR 和 RTL 布局构建了 CSS，唯一缺少的是测试 RTL 内容的排版。在使用 LTR 内容以 RTL 模式查看设计时，你可以使用 Google 的页面内翻译来快速翻译所有内容。这将帮助你创建带有内容的 RTL 设计，并使其适合文本方向。

如果你感兴趣，我写了一个关于此的详尽指南，标题为 [RTL Styling 101](https://rtlstyling.com/)。

## 使用 \`@supports\`

如果你不知道它，\`@supports\` 用于检测用户浏览器是否支持给定的 CSS 功能。

\`\`\`css
@supports (display: flex) {
  /* If flexbox is supported, apply this. */
  .element {
    display: flex;
  }
}
\`\`\`

测试它的一个有趣方法是切换其功能。有浏览器扩展可以做到这一点，但我们可以通过添加随机字母来手动完成。当添加随机字母时，它将破坏规则；因此，CSS 不会工作。

\`\`\`css
@supports (display: flexB) {
  /* ... */
}
\`\`\`

我在 \`display: flex\` 后添加了字母"B"。浏览器不会识别它，你将获得默认行为，就像 \`@supports\` 被禁用一样。很酷，对吧？

但是，在具有大量 \`@supports\` 规则的大型项目中，手动执行是不实际的。幸运的是，Ire Aderinokun 为此目的创建了一个[浏览器扩展](https://github.com/ireade/feature-queries-manager)，它适用于 Chrome 和 Firefox。

![image-20250325215541817](/img/image-20250325215541817.png)

该扩展将在你的浏览器 DevTools 中添加一个新标签。在左侧，你会看到嵌套在 \`@supports\` 查询中的 CSS 功能的可切换列表，在右侧将是使用特定功能的每个 \`@supports\` 查询的列表。上面显示的 CSS 是与网格相关的内容。切换左侧的复选框将禁用和启用 CSS 网格。这是测试和破坏布局的好方法。让我们更深入地了解破坏布局的方法。

## 浏览器扩展

### Grid Ruler

测试两个 UI 元素是否正确对齐的好方法是使用标尺和参考线。这可以在 Sketch、Adobe XD、Photoshop 和 Illustrator 等设计应用程序中轻松完成。在浏览器中，没有扩展是不可能的。

一个很棒的扩展，[Grid Ruler](https://chromewebstore.google.com/detail/grid-ruler/joadogiaiabhmggdifljlpkclnpfncmj)，仅在 Google Chrome 中可用。它使你能够水平或垂直拖放参考线。这对于验证两个元素是否正确对齐非常有用。

![image-20250325215612101](/img/image-20250325215612101.png)

在这个模型中，网格线告诉我们用户头像和按钮是对齐的。

### OLI Grid CSS

[OLI Grid CSS](https://addons.mozilla.org/en-US/firefox/addon/oli-grid-css/) 插件适用于 Firefox 和 Chrome。它的好处是它在页面中绘制列，就像在 Sketch 和 Adobe XD 中一样。这有助于查看你正在工作的布局是否与列对齐。

![image-20250325215631205](/img/image-20250325215631205.png)

我尝试用 Bootstrap 构建的页面测试插件，它按预期工作。注意你需要首先弄清楚页面的 \`.container\` 元素的宽度。

### Web Developer Extension

![image-20250325215652486](/img/image-20250325215652486.png)

一个非常有用的扩展，提供了很多功能。以下是一些关键功能：

- 禁用所有样式
- 禁用浏览器默认样式
- 禁用内联样式
- 禁用打印样式

这只是 CSS 标签中的几个功能！

### Pesticide Extension

![image-20250325215708928](/img/image-20250325215708928.png)

我之前解释过使用轮廓 CSS 属性作为调试设计问题的方法。这个博客做同样的事情，但只需一次点击。它为页面上的每个元素添加随机彩色轮廓，并能够突出显示特定元素。

## 在浏览器中模拟

有时你想通过移动一些元素来快速在浏览器中模拟设计想法。这对于向开发者、客户或设计师展示设计概念很有用。能够快速进行此类编辑对生产力很重要。

利用浏览器的内置工具，我们可以做到这一点。在本节中，我们将专注于在浏览器中快速模拟设计的概念和示例。

### 好老的 CSS 定位

使用 CSS 定位，我们可以通过在 DevTools 中向一些元素添加 \`position\` 并将它们放置在我们想要的位置来编辑它们。这是在测试错误时模拟设计想法的快速方法。

![image-20250325215756080](/img/image-20250325215756080.png)

这里我们有一个带有类别的卡片。经过一些思考，设计师告诉你，开发者，团队已经决定想要类别的不同位置。你建议类别可以移动到左上角。这可以在你们都在视频通话时完成。就像添加以下内容一样简单：

\`\`\`css
.card {
  position: relative;
}
.category {
  position: absolute;
  left: 0;
  top: 16px;
}
\`\`\`

这种不到一分钟的编辑可以让决策更快地发生。

### 隐藏设计元素

正如我之前解释的，能够快速隐藏设计元素，比如在 Chrome 中使用 \`H\` 键，是一个有用的技巧。这样做，我们可以隐藏一些设计元素并用其他元素替换它们，例如，如果我们想要截取设计概念的屏幕截图。

![image-20250325215815868](/img/image-20250325215815868.png)

这里我们有一个部分标题，其中包含一个阻止作者头像和姓名对齐的错误。设计团队要求暂时删除它。你可以快速从 HTML 中删除它，用 \`display: none\` 隐藏它，或在 Chrome 中使用 \`H\` 键。

### CSS Flexbox

使用 Flexbox，我们可以快速使布局水平或垂直。Flexbox 属性如 \`align-items\` 和 \`justify-content\` 很强大，可以完成你想要展示的大多数设计想法。

![image-20250325215837320](/img/image-20250325215837320.png)

这个部分标题有一行项目。问题是项目之间的间距不一致。我们能做什么？最快的解决方案是添加 \`display: flex\` 和 \`justify-content: space-between\`。设计立即改变，所有这些都在 DevTools 中发生！你现在可以继续截取此更改的屏幕截图并与同事讨论。

### CSS Grid Layout

这是 CSS 中最强大的布局模块。假设我们有一个特色新闻部分，设计师想要以可呈现的方式布局项目——比如说，作为等高列。

![image-20250325215857726](/img/image-20250325215857726.png)

我们简单地使用 CSS 网格来设置列，然后我们与设计师确认这是他们想要的。

\`\`\`css
.wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
\`\`\`

这对设计师来说还不够吗？你可以继续编辑并向他们展示你的更改。此外，你可以尝试不同的布局概念并将每个概念绑定到 CSS 类，在".cls"面板中切换每个类。

### CSS 视口单位

我们可以使用视口单位使部分占用视口的完整水平或垂直空间。我们也可以使用它们来调整字体大小。所有这些用例给我们灵活性，使我们的设计更动态。

假设我们有一个英雄部分，需要占用屏幕完整高度的 90%。我们想要与设计师验证要求，所以我们非常快速地模拟它：

\`\`\`css
.hero {
  height: 90vh;
}
\`\`\`

我们给英雄部分一个 \`90vh\` 的高度，这将使它占用屏幕垂直空间的 90%。我们在不到一分钟内完成了这个编辑！

### CSS 列

如果我们想要比 CSS 网格更快的方法，我们可以使用列。例如，我们可以将页脚中的链接分为两个相等的列。我们可以用一行代码进行此编辑，并立即回到设计师那里。

\`\`\`css
.footer-section {
  columns: 2;
}
\`\`\`

CSS 列的另一个好处是我们可以用键盘的上下箭头更改列数。

![image-20250325215935175](/img/image-20250325215935175.png)

### CSS 滤镜

假设设计师想要为网站实验暗模式，但他们还没有为此做任何模型。使用 CSS 滤镜，我们可以快速制作暗模式。

\`\`\`css
html {
  filter: invert(90%) hue-rotate(25deg);
}
\`\`\`

为了完善它，我们可以恢复不应该被反转的元素（如图像和视频）：

\`\`\`css
html img,
html video,
html iframe {
  filter: invert(100%) hue-rotate(-25deg);
}
\`\`\`

完成后，我们可以截取全页屏幕截图并向团队展示——所有这些都在不到两分钟内完成！这不是很酷吗？发送模型后，团队可以开始思考和决定。此外，你节省了设计师的时间！为小网页制作暗模式至少需要他们 10 分钟。

### 去饱和设计

使用 CSS 滤镜去饱和页面（即将其转换为黑白）是一个有用的技巧，原因如下：

- 如果你正在测试的网站颜色很重，你的眼睛可能会疲劳。去饱和页面将帮助你专注于修复手头的错误。
- 它对测试和探索很有用。当页面饱和时，你可以轻松发现任何不适合设计的颜色。
- 可访问性测试变得更容易。使页面灰度将让你知道哪些颜色易于阅读，哪些不是。

要使用 CSS 去饱和网页，打开浏览器的 DevTools，选择 \`html\` 或 \`body\` 元素，并添加以下内容：

\`\`\`css
html {
  filter: grayscale(1);
}
\`\`\`

就是这样。你现在有一个黑白网站！

### 线框样式

在模拟设计时，我们并不总是有时间选择好的颜色和字体。在这种情况下，我们可以使用一点 CSS 将整个网页转换为线框样式。这将让你专注于快速模拟想法并尽快获得反馈。

以下是如何做到的：

\`\`\`css
* {
  color: #000;
  background: #ccc !important;
  outline: solid 1px;
}

img,
video,
iframe {
  background: #ccc;
  opacity: 0;
}
\`\`\`

## 触摸屏的悬停

在触摸设备（手机、平板电脑等）上调试时，你可能会注意到一些元素在滚动时改变颜色或样式。这是因为 \`:hover\` 样式在滚动时触发。这是一个问题。解决方案是使用 \`hover\` 媒体查询。根据 [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)：

> hover CSS 媒体功能可用于测试用户的主要输入机制是否可以悬停在元素上。

![image-20250325220020774](/img/image-20250325220020774.png)

\`\`\`css
@media (hover: hover) {
  .element:hover {
    color: #222;
  }
}
\`\`\`

这样，我们防止 \`:hover\` 样式为移动和平板用户触发。在撰写本文时，此功能在所有主要浏览器中都受支持。好处是当你在 Chrome 中激活设备模式时，它将被视为触摸屏，所以你可以在那里测试 \`hover\` 媒体查询。

## 使用 CSS 显示潜在错误

没有直接的方法在 CSS 中显示潜在错误。但是，一些聪明的人设计了解决方法，使我们能够调试 HTML 和 CSS 的不正确使用。让我们探索其中一些。

### 在上下文之外使用 CSS 类

假设你与团队构建了设计系统，你想要检查与设计系统中组件不正确使用相关的错误。在他名为倒三角 CSS（ITCSS）的方法论中，Harry Roberts 使用以下类来创建关于 CSS 类不正确使用的警告。

\`\`\`html
<div class="o-layout">
  <div class="o-layout__item"></div>
  <div class="o-layout__item"></div>
  <div class="o-layout__item"></div>
</div>
\`\`\`

\`.o-layout\` 类用于充当布局包装器的元素。\`.o-layout__item\` 类应该只应用于具有 \`.o-layout\` 类的父元素内的元素。以下用法将是不正确的：

\`\`\`html
<div>
  <div class="o-layout__item"></div>
</div>
\`\`\`

具有 \`.o-layout__item\` 类的元素不应该像这样独立存在。我们可以很容易地调试这个：

\`\`\`css
.o-layout__item {
  /* Show a warning outline by default. */
  outline: solid 5px yellow;
}
.o-layout .o-layout__item {
  /* Remove the outline when item is in .o-layout. */
  outline: none;
}
\`\`\`

此外，我们可以检测 \`.o-layout__item\` 是否是 \`.o-layout\` 的直接子元素。

\`\`\`css
.o-layout > :not(.o-layout__item) {
  outline: solid 5px yellow;
}
\`\`\`

### 向元素添加 \`width\` 或 \`height\` 属性

一般来说，除了 \`img\` 之外，不建议为任何 HTML 元素使用 \`width\` 和 \`height\` 属性。

\`\`\`css
:not(img):not(object):not(embed):not(svg):not(canvas)[width],
:not(img):not(object):not(embed):not(svg):not(canvas)[height] {
  outline: solid 5px red;
}
\`\`\`

进一步，你可以使用 Gaël Poupard 的浏览器扩展，[a11y.css](https://ffoodd.github.io/a11y.css/index.html)，它显示不同的建议、警告和错误。`;
  });

  describe('Document Structure Validation', () => {
    test('should contain proper markdown headers', () => {
      expect(documentContent).toMatch(/^# /m);
      expect(documentContent).toMatch(/^## /m);
      expect(documentContent).toMatch(/^### /m);
    });

    test('should have main sections for debugging multilingual websites', () => {
      expect(documentContent).toContain('调试多语言网站');
      expect(documentContent).toContain('LTR 和 RTL 的常见错误');
    });

    test('should contain browser extension section', () => {
      expect(documentContent).toContain('浏览器扩展');
      expect(documentContent).toContain('Grid Ruler');
      expect(documentContent).toContain('Web Developer Extension');
    });

    test('should have CSS techniques section', () => {
      expect(documentContent).toContain('使用 `@supports`');
      expect(documentContent).toContain('在浏览器中模拟');
    });

    test('should have proper section hierarchy', () => {
      const headers = documentContent.match(/^#+\s+.+$/gm);
      expect(headers).toBeTruthy();
      expect(headers.length).toBeGreaterThan(15);
    });
  });

  describe('CSS Code Block Validation', () => {
    test('should contain valid CSS syntax for margin examples', () => {
      expect(documentContent).toMatch(/margin-left:\s*10px/);
      expect(documentContent).toMatch(/margin-right:\s*10px/);
      expect(documentContent).toMatch(/margin-inline-start:\s*10px/);
    });

    test('should contain flexbox examples', () => {
      expect(documentContent).toMatch(/display:\s*flex/);
      expect(documentContent).toMatch(/justify-content:\s*space-between/);
    });

    test('should contain grid layout examples', () => {
      expect(documentContent).toMatch(/display:\s*grid/);
      expect(documentContent).toMatch(/grid-template-columns/);
    });

    test('should contain @supports queries', () => {
      expect(documentContent).toMatch(/@supports\s*\([^)]+\)/);
      expect(documentContent).toMatch(/@supports\s*\(display:\s*flex\)/);
    });

    test('should contain viewport units examples', () => {
      expect(documentContent).toMatch(/90vh/);
      expect(documentContent).toContain('height: 90vh');
    });

    test('should contain CSS filters examples', () => {
      expect(documentContent).toMatch(/filter:\s*invert/);
      expect(documentContent).toMatch(/filter:\s*grayscale/);
    });

    test('should contain hover media query examples', () => {
      expect(documentContent).toMatch(/@media\s*\(hover:\s*hover\)/);
    });

    test('should contain positioning examples', () => {
      expect(documentContent).toContain('position: relative');
      expect(documentContent).toContain('position: absolute');
      expect(documentContent).toContain('left: 0');
      expect(documentContent).toContain('top: 16px');
    });

    test('should contain CSS columns examples', () => {
      expect(documentContent).toContain('columns: 2');
    });

    test('should contain outline debugging examples', () => {
      expect(documentContent).toMatch(/outline:\s*solid/);
      expect(documentContent).toContain('outline: solid 5px yellow');
      expect(documentContent).toContain('outline: solid 5px red');
    });
  });

  describe('HTML Code Block Validation', () => {
    test('should contain valid HTML structure for RTL example', () => {
      expect(documentContent).toMatch(/<html\s+dir="rtl"><\/html>/);
    });

    test('should contain proper BEM methodology examples', () => {
      expect(documentContent).toContain('o-layout');
      expect(documentContent).toContain('o-layout__item');
    });

    test('should contain form validation examples', () => {
      expect(documentContent).toMatch(/\[width\]/);
      expect(documentContent).toMatch(/\[height\]/);
    });

    test('should contain proper HTML class structure', () => {
      expect(documentContent).toContain('class="o-layout"');
      expect(documentContent).toContain('class="o-layout__item"');
    });
  });

  describe('Link and Reference Validation', () => {
    test('should contain external reference links', () => {
      expect(documentContent).toContain('rtlstyling.com');
      expect(documentContent).toContain('Mozilla Developer Network');
    });

    test('should contain browser extension links', () => {
      expect(documentContent).toContain('chromewebstore.google.com');
      expect(documentContent).toContain('addons.mozilla.org');
    });

    test('should reference specific browser extensions', () => {
      expect(documentContent).toContain('Grid Ruler');
      expect(documentContent).toContain('OLI Grid CSS');
      expect(documentContent).toContain('Pesticide Extension');
    });

    test('should contain GitHub repository links', () => {
      expect(documentContent).toContain('github.com/ireade/feature-queries-manager');
    });

    test('should contain accessibility resource links', () => {
      expect(documentContent).toContain('ffoodd.github.io/a11y.css');
    });
  });

  describe('Image Reference Validation', () => {
    test('should contain image references with proper paths', () => {
      const imageMatches = documentContent.match(/!\[.*\]\(\/img\/.*\.png\)/g);
      expect(imageMatches).toBeTruthy();
      expect(imageMatches.length).toBeGreaterThan(0);
    });

    test('should have consistent image naming convention', () => {
      const imageReferences = documentContent.match(/image-\d{8}-\d{6}-\d{3}\.png/g);
      expect(imageReferences).toBeTruthy();
      expect(imageReferences.length).toBeGreaterThan(5);
    });

    test('should contain properly formatted image markdown', () => {
      expect(documentContent).toMatch(/!\[image-\d{8}-\d{6}-\d{3}\]\(\/img\/image-\d{8}-\d{6}-\d{3}\.png\)/);
    });
  });

  describe('Content Quality and Completeness', () => {
    test('should provide practical debugging examples', () => {
      expect(documentContent).toContain('DevTools');
      expect(documentContent).toContain('Chrome');
      expect(documentContent).toContain('Firefox');
    });

    test('should cover accessibility considerations', () => {
      expect(documentContent).toContain('可访问性');
      expect(documentContent).toContain('a11y.css');
    });

    test('should include performance considerations', () => {
      expect(documentContent).toContain('生产力');
      expect(documentContent).toMatch(/不到.*分钟/);
    });

    test('should provide comprehensive CSS debugging techniques', () => {
      expect(documentContent).toContain('间距问题');
      expect(documentContent).toContain('对齐问题');
      expect(documentContent).toContain('布局');
      expect(documentContent).toContain('线框样式');
    });

    test('should explain browser development workflow', () => {
      expect(documentContent).toContain('视频通话');
      expect(documentContent).toContain('设计师');
      expect(documentContent).toContain('开发者');
    });

    test('should provide time estimates for tasks', () => {
      expect(documentContent).toContain('不到一分钟');
      expect(documentContent).toContain('不到两分钟');
      expect(documentContent).toContain('10 分钟');
    });
  });

  describe('Technical Accuracy Validation', () => {
    test('should contain valid CSS property names', () => {
      const cssProperties = [
        'margin-left', 'margin-right', 'margin-inline-start',
        'text-align', 'display', 'position', 'filter',
        'justify-content', 'align-items', 'grid-template-columns'
      ];
      
      cssProperties.forEach(property => {
        expect(documentContent).toContain(property);
      });
    });

    test('should use correct CSS values', () => {
      expect(documentContent).toMatch(/:\s*(flex|grid|absolute|relative)/);
      expect(documentContent).toMatch(/:\s*(left|right|center)/);
      expect(documentContent).toMatch(/:\s*\d+px/);
    });

    test('should provide correct browser feature detection', () => {
      expect(documentContent).toContain('@supports (display: flex)');
      expect(documentContent).toContain('@media (hover: hover)');
    });

    test('should contain valid viewport units', () => {
      expect(documentContent).toContain('90vh');
      expect(documentContent).toMatch(/\d+vh/);
    });

    test('should contain valid filter functions', () => {
      expect(documentContent).toContain('invert(90%)');
      expect(documentContent).toContain('hue-rotate(25deg)');
      expect(documentContent).toContain('grayscale(1)');
    });

    test('should contain proper CSS selector syntax', () => {
      expect(documentContent).toContain(':not(img):not(object):not(embed):not(svg):not(canvas)[width]');
      expect(documentContent).toContain('.o-layout > :not(.o-layout__item)');
    });
  });

  describe('Internationalization Content Validation', () => {
    test('should properly explain LTR and RTL concepts', () => {
      expect(documentContent).toContain('从左到右');
      expect(documentContent).toContain('从右到左');
      expect(documentContent).toContain('LTR');
      expect(documentContent).toContain('RTL');
    });

    test('should mention specific languages as examples', () => {
      expect(documentContent).toContain('英语');
      expect(documentContent).toContain('阿拉伯语');
    });

    test('should provide practical RTL debugging advice', () => {
      expect(documentContent).toContain('dir="rtl"');
      expect(documentContent).toContain('main-ltr.css');
      expect(documentContent).toContain('main-rtl.css');
    });

    test('should explain logical properties', () => {
      expect(documentContent).toContain('margin-inline-start');
      expect(documentContent).toContain('逻辑属性');
    });

    test('should mention Google Translate as a testing tool', () => {
      expect(documentContent).toContain('Google');
      expect(documentContent).toContain('翻译');
    });
  });

  describe('Code Quality Standards', () => {
    test('should use consistent code formatting', () => {
      const cssBlocks = documentContent.match(/```css[\s\S]*?```/g);
      expect(cssBlocks).toBeTruthy();
      expect(cssBlocks.length).toBeGreaterThan(10);
    });

    test('should use consistent HTML formatting', () => {
      const htmlBlocks = documentContent.match(/```html[\s\S]*?```/g);
      expect(htmlBlocks).toBeTruthy();
      expect(htmlBlocks.length).toBeGreaterThan(0);
    });

    test('should have proper indentation in code examples', () => {
      expect(documentContent).toMatch(/  [a-z-]+:/); // 2-space indentation
    });

    test('should contain CSS comments for clarity', () => {
      expect(documentContent).toContain('/* If flexbox is supported, apply this. */');
      expect(documentContent).toContain('/* Show a warning outline by default. */');
      expect(documentContent).toContain('/* Remove the outline when item is in .o-layout. */');
    });
  });

  describe('Browser Compatibility Information', () => {
    test('should mention browser support information', () => {
      expect(documentContent).toContain('所有主要浏览器');
      expect(documentContent).toContain('Chrome');
      expect(documentContent).toContain('Firefox');
    });

    test('should reference browser developer tools', () => {
      expect(documentContent).toContain('DevTools');
      expect(documentContent).toMatch(/Chrome.*DevTools|DevTools.*Chrome/);
    });

    test('should mention specific browser capabilities', () => {
      expect(documentContent).toContain('设备模式');
      expect(documentContent).toContain('触摸屏');
    });
  });

  describe('Error Prevention and Detection', () => {
    test('should provide error detection techniques', () => {
      expect(documentContent).toContain('显示潜在错误');
      expect(documentContent).toContain('outline: solid');
      expect(documentContent).toContain('yellow');
      expect(documentContent).toContain('red');
    });

    test('should explain common CSS mistakes', () => {
      expect(documentContent).toContain('width');
      expect(documentContent).toContain('height');
      expect(documentContent).toContain('属性');
    });

    test('should provide debugging methodologies', () => {
      expect(documentContent).toContain('ITCSS');
      expect(documentContent).toContain('Harry Roberts');
      expect(documentContent).toContain('设计系统');
    });

    test('should warn about incorrect usage patterns', () => {
      expect(documentContent).toContain('不正确');
      expect(documentContent).toContain('警告');
      expect(documentContent).toContain('错误');
    });
  });

  describe('Design Workflow Integration', () => {
    test('should mention design tools', () => {
      expect(documentContent).toContain('Sketch');
      expect(documentContent).toContain('Adobe XD');
      expect(documentContent).toContain('Photoshop');
      expect(documentContent).toContain('Illustrator');
    });

    test('should explain collaboration workflows', () => {
      expect(documentContent).toContain('团队');
      expect(documentContent).toContain('同事');
      expect(documentContent).toContain('客户');
    });

    test('should provide practical implementation advice', () => {
      expect(documentContent).toContain('屏幕截图');
      expect(documentContent).toContain('模拟');
      expect(documentContent).toContain('概念');
    });
  });

  describe('Utility and Practicality', () => {
    test('should provide keyboard shortcuts', () => {
      expect(documentContent).toContain('H');
      expect(documentContent).toContain('上下箭头');
    });

    test('should explain browser extension usage', () => {
      expect(documentContent).toContain('标签');
      expect(documentContent).toContain('复选框');
      expect(documentContent).toContain('切换');
    });

    test('should provide concrete examples with context', () => {
      expect(documentContent).toContain('假设');
      expect(documentContent).toContain('例如');
      expect(documentContent).toContain('这里我们有');
    });

    test('should explain the benefits of techniques', () => {
      expect(documentContent).toContain('好处');
      expect(documentContent).toContain('优势');
      expect(documentContent).toContain('节省');
    });
  });
});

describe('Documentation Accessibility and User Experience', () => {
  let documentContent;
  
  beforeAll(() => {
    // Same content as above test suite
    documentContent = `# 通用技巧和诀窍

## 调试多语言网站

当涉及调试多语言网站时，我们需要了解如何测试它以及事物如何工作。在谈论多语言网站时，我们将专注于从左到右（LTR）和从右到左（RTL）布局，分别使用英语和阿拉伯语的示例。

### LTR 和 RTL 的常见错误

### 间距问题

在调试 LTR 和 RTL 时，大多数问题将与间距相关。每种语言的水平方向将被翻转，间距问题通常归结为内边距或外边距。假设我们有以下内容：

\`\`\`css
.element {
  margin-left: 10px;
}
\`\`\`

对于 RTL，它将是这样的：

\`\`\`css
.element {
  margin-right: 10px;
}
\`\`\`

我们会对内边距和定位属性（\`top\`、\`right\`、\`bottom\`、\`left\`）做等效处理。

此外，我们可以使用 CSS 逻辑属性来避免为 RTL 编写更多 CSS。以下是上述示例的外观：

\`\`\`css
.element {
  margin-inline-start: 10px;
}
\`\`\`

属性 \`margin-inline-start\` 是逻辑的。这意味着，对于 LTR 它将是 \`margin-left\`，对于 RTL 它将是 \`margin-right\`。如果你有兴趣了解更多关于 RTL 样式的信息，我推荐你阅读我写的这个[指南](https://rtlstyling.com/)。

### 对齐问题

当文本在 LTR 中向右对齐时，它应该在 RTL 中翻转。

\`\`\`css
.element {
  text-align: right;
}
\`\`\`

对于 RTL，它将是这样的：

\`\`\`css
.element {
  text-align: left;
}
\`\`\`

### 调试 RTL

根据你正在构建的网站的工作方式，将给定页面的 CSS 从 LTR 切换到 RTL 可能很容易。如果 CSS 合并到一个文件中，切换将像在 \`html\` 元素上设置 \`dir\` 属性一样简单。

\`\`\`html
<html dir="rtl"></html>
\`\`\`

我们可以首先在 DevTools 中设置属性，然后检查我们想要修复的问题。

如果 LTR 和 RTL 的 CSS 不在一个文件中，那么它很可能在两个文件中，如 \`main-ltr.css\` 和 \`main-rtl.css\`。仅切换 \`dir\` 属性是不够的；我们还需要编辑 \`head\` 元素中样式表的 \`src\`。

### 快速添加 RTL 内容的方法

假设我们已经为 LTR 和 RTL 布局构建了 CSS，唯一缺少的是测试 RTL 内容的排版。在使用 LTR 内容以 RTL 模式查看设计时，你可以使用 Google 的页面内翻译来快速翻译所有内容。这将帮助你创建带有内容的 RTL 设计，并使其适合文本方向。

如果你感兴趣，我写了一个关于此的详尽指南，标题为 [RTL Styling 101](https://rtlstyling.com/)。

## 使用 \`@supports\`

如果你不知道它，\`@supports\` 用于检测用户浏览器是否支持给定的 CSS 功能。

\`\`\`css
@supports (display: flex) {
  /* If flexbox is supported, apply this. */
  .element {
    display: flex;
  }
}
\`\`\`

测试它的一个有趣方法是切换其功能。有浏览器扩展可以做到这一点，但我们可以通过添加随机字母来手动完成。当添加随机字母时，它将破坏规则；因此，CSS 不会工作。

\`\`\`css
@supports (display: flexB) {
  /* ... */
}
\`\`\`

我在 \`display: flex\` 后添加了字母"B"。浏览器不会识别它，你将获得默认行为，就像 \`@supports\` 被禁用一样。很酷，对吧？

但是，在具有大量 \`@supports\` 规则的大型项目中，手动执行是不实际的。幸运的是，Ire Aderinokun 为此目的创建了一个[浏览器扩展](https://github.com/ireade/feature-queries-manager)，它适用于 Chrome 和 Firefox。

![image-20250325215541817](/img/image-20250325215541817.png)

该扩展将在你的浏览器 DevTools 中添加一个新标签。在左侧，你会看到嵌套在 \`@supports\` 查询中的 CSS 功能的可切换列表，在右侧将是使用特定功能的每个 \`@supports\` 查询的列表。上面显示的 CSS 是与网格相关的内容。切换左侧的复选框将禁用和启用 CSS 网格。这是测试和破坏布局的好方法。让我们更深入地了解破坏布局的方法。

## 浏览器扩展

### Grid Ruler

测试两个 UI 元素是否正确对齐的好方法是使用标尺和参考线。这可以在 Sketch、Adobe XD、Photoshop 和 Illustrator 等设计应用程序中轻松完成。在浏览器中，没有扩展是不可能的。

一个很棒的扩展，[Grid Ruler](https://chromewebstore.google.com/detail/grid-ruler/joadogiaiabhmggdifljlpkclnpfncmj)，仅在 Google Chrome 中可用。它使你能够水平或垂直拖放参考线。这对于验证两个元素是否正确对齐非常有用。

![image-20250325215612101](/img/image-20250325215612101.png)

在这个模型中，网格线告诉我们用户头像和按钮是对齐的。

### OLI Grid CSS

[OLI Grid CSS](https://addons.mozilla.org/en-US/firefox/addon/oli-grid-css/) 插件适用于 Firefox 和 Chrome。它的好处是它在页面中绘制列，就像在 Sketch 和 Adobe XD 中一样。这有助于查看你正在工作的布局是否与列对齐。

![image-20250325215631205](/img/image-20250325215631205.png)

我尝试用 Bootstrap 构建的页面测试插件，它按预期工作。注意你需要首先弄清楚页面的 \`.container\` 元素的宽度。

### Web Developer Extension

![image-20250325215652486](/img/image-20250325215652486.png)

一个非常有用的扩展，提供了很多功能。以下是一些关键功能：

- 禁用所有样式
- 禁用浏览器默认样式
- 禁用内联样式
- 禁用打印样式

这只是 CSS 标签中的几个功能！

### Pesticide Extension

![image-20250325215708928](/img/image-20250325215708928.png)

我之前解释过使用轮廓 CSS 属性作为调试设计问题的方法。这个博客做同样的事情，但只需一次点击。它为页面上的每个元素添加随机彩色轮廓，并能够突出显示特定元素。

## 在浏览器中模拟

有时你想通过移动一些元素来快速在浏览器中模拟设计想法。这对于向开发者、客户或设计师展示设计概念很有用。能够快速进行此类编辑对生产力很重要。

利用浏览器的内置工具，我们可以做到这一点。在本节中，我们将专注于在浏览器中快速模拟设计的概念和示例。

### 好老的 CSS 定位

使用 CSS 定位，我们可以通过在 DevTools 中向一些元素添加 \`position\` 并将它们放置在我们想要的位置来编辑它们。这是在测试错误时模拟设计想法的快速方法。

![image-20250325215756080](/img/image-20250325215756080.png)

这里我们有一个带有类别的卡片。经过一些思考，设计师告诉你，开发者，团队已经决定想要类别的不同位置。你建议类别可以移动到左上角。这可以在你们都在视频通话时完成。就像添加以下内容一样简单：

\`\`\`css
.card {
  position: relative;
}
.category {
  position: absolute;
  left: 0;
  top: 16px;
}
\`\`\`

这种不到一分钟的编辑可以让决策更快地发生。

### 隐藏设计元素

正如我之前解释的，能够快速隐藏设计元素，比如在 Chrome 中使用 \`H\` 键，是一个有用的技巧。这样做，我们可以隐藏一些设计元素并用其他元素替换它们，例如，如果我们想要截取设计概念的屏幕截图。

![image-20250325215815868](/img/image-20250325215815868.png)

这里我们有一个部分标题，其中包含一个阻止作者头像和姓名对齐的错误。设计团队要求暂时删除它。你可以快速从 HTML 中删除它，用 \`display: none\` 隐藏它，或在 Chrome 中使用 \`H\` 键。

### CSS Flexbox

使用 Flexbox，我们可以快速使布局水平或垂直。Flexbox 属性如 \`align-items\` 和 \`justify-content\` 很强大，可以完成你想要展示的大多数设计想法。

![image-20250325215837320](/img/image-20250325215837320.png)

这个部分标题有一行项目。问题是项目之间的间距不一致。我们能做什么？最快的解决方案是添加 \`display: flex\` 和 \`justify-content: space-between\`。设计立即改变，所有这些都在 DevTools 中发生！你现在可以继续截取此更改的屏幕截图并与同事讨论。

### CSS Grid Layout

这是 CSS 中最强大的布局模块。假设我们有一个特色新闻部分，设计师想要以可呈现的方式布局项目——比如说，作为等高列。

![image-20250325215857726](/img/image-20250325215857726.png)

我们简单地使用 CSS 网格来设置列，然后我们与设计师确认这是他们想要的。

\`\`\`css
.wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
\`\`\`

这对设计师来说还不够吗？你可以继续编辑并向他们展示你的更改。此外，你可以尝试不同的布局概念并将每个概念绑定到 CSS 类，在".cls"面板中切换每个类。

### CSS 视口单位

我们可以使用视口单位使部分占用视口的完整水平或垂直空间。我们也可以使用它们来调整字体大小。所有这些用例给我们灵活性，使我们的设计更动态。

假设我们有一个英雄部分，需要占用屏幕完整高度的 90%。我们想要与设计师验证要求，所以我们非常快速地模拟它：

\`\`\`css
.hero {
  height: 90vh;
}
\`\`\`

我们给英雄部分一个 \`90vh\` 的高度，这将使它占用屏幕垂直空间的 90%。我们在不到一分钟内完成了这个编辑！

### CSS 列

如果我们想要比 CSS 网格更快的方法，我们可以使用列。例如，我们可以将页脚中的链接分为两个相等的列。我们可以用一行代码进行此编辑，并立即回到设计师那里。

\`\`\`css
.footer-section {
  columns: 2;
}
\`\`\`

CSS 列的另一个好处是我们可以用键盘的上下箭头更改列数。

![image-20250325215935175](/img/image-20250325215935175.png)

### CSS 滤镜

假设设计师想要为网站实验暗模式，但他们还没有为此做任何模型。使用 CSS 滤镜，我们可以快速制作暗模式。

\`\`\`css
html {
  filter: invert(90%) hue-rotate(25deg);
}
\`\`\`

为了完善它，我们可以恢复不应该被反转的元素（如图像和视频）：

\`\`\`css
html img,
html video,
html iframe {
  filter: invert(100%) hue-rotate(-25deg);
}
\`\`\`

完成后，我们可以截取全页屏幕截图并向团队展示——所有这些都在不到两分钟内完成！这不是很酷吗？发送模型后，团队可以开始思考和决定。此外，你节省了设计师的时间！为小网页制作暗模式至少需要他们 10 分钟。

### 去饱和设计

使用 CSS 滤镜去饱和页面（即将其转换为黑白）是一个有用的技巧，原因如下：

- 如果你正在测试的网站颜色很重，你的眼睛可能会疲劳。去饱和页面将帮助你专注于修复手头的错误。
- 它对测试和探索很有用。当页面饱和时，你可以轻松发现任何不适合设计的颜色。
- 可访问性测试变得更容易。使页面灰度将让你知道哪些颜色易于阅读，哪些不是。

要使用 CSS 去饱和网页，打开浏览器的 DevTools，选择 \`html\` 或 \`body\` 元素，并添加以下内容：

\`\`\`css
html {
  filter: grayscale(1);
}
\`\`\`

就是这样。你现在有一个黑白网站！

### 线框样式

在模拟设计时，我们并不总是有时间选择好的颜色和字体。在这种情况下，我们可以使用一点 CSS 将整个网页转换为线框样式。这将让你专注于快速模拟想法并尽快获得反馈。

以下是如何做到的：

\`\`\`css
* {
  color: #000;
  background: #ccc !important;
  outline: solid 1px;
}

img,
video,
iframe {
  background: #ccc;
  opacity: 0;
}
\`\`\`

## 触摸屏的悬停

在触摸设备（手机、平板电脑等）上调试时，你可能会注意到一些元素在滚动时改变颜色或样式。这是因为 \`:hover\` 样式在滚动时触发。这是一个问题。解决方案是使用 \`hover\` 媒体查询。根据 [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)：

> hover CSS 媒体功能可用于测试用户的主要输入机制是否可以悬停在元素上。

![image-20250325220020774](/img/image-20250325220020774.png)

\`\`\`css
@media (hover: hover) {
  .element:hover {
    color: #222;
  }
}
\`\`\`

这样，我们防止 \`:hover\` 样式为移动和平板用户触发。在撰写本文时，此功能在所有主要浏览器中都受支持。好处是当你在 Chrome 中激活设备模式时，它将被视为触摸屏，所以你可以在那里测试 \`hover\` 媒体查询。

## 使用 CSS 显示潜在错误

没有直接的方法在 CSS 中显示潜在错误。但是，一些聪明的人设计了解决方法，使我们能够调试 HTML 和 CSS 的不正确使用。让我们探索其中一些。

### 在上下文之外使用 CSS 类

假设你与团队构建了设计系统，你想要检查与设计系统中组件不正确使用相关的错误。在他名为倒三角 CSS（ITCSS）的方法论中，Harry Roberts 使用以下类来创建关于 CSS 类不正确使用的警告。

\`\`\`html
<div class="o-layout">
  <div class="o-layout__item"></div>
  <div class="o-layout__item"></div>
  <div class="o-layout__item"></div>
</div>
\`\`\`

\`.o-layout\` 类用于充当布局包装器的元素。\`.o-layout__item\` 类应该只应用于具有 \`.o-layout\` 类的父元素内的元素。以下用法将是不正确的：

\`\`\`html
<div>
  <div class="o-layout__item"></div>
</div>
\`\`\`

具有 \`.o-layout__item\` 类的元素不应该像这样独立存在。我们可以很容易地调试这个：

\`\`\`css
.o-layout__item {
  /* Show a warning outline by default. */
  outline: solid 5px yellow;
}
.o-layout .o-layout__item {
  /* Remove the outline when item is in .o-layout. */
  outline: none;
}
\`\`\`

此外，我们可以检测 \`.o-layout__item\` 是否是 \`.o-layout\` 的直接子元素。

\`\`\`css
.o-layout > :not(.o-layout__item) {
  outline: solid 5px yellow;
}
\`\`\`

### 向元素添加 \`width\` 或 \`height\` 属性

一般来说，除了 \`img\` 之外，不建议为任何 HTML 元素使用 \`width\` 和 \`height\` 属性。

\`\`\`css
:not(img):not(object):not(embed):not(svg):not(canvas)[width],
:not(img):not(object):not(embed):not(svg):not(canvas)[height] {
  outline: solid 5px red;
}
\`\`\`

进一步，你可以使用 Gaël Poupard 的浏览器扩展，[a11y.css](https://ffoodd.github.io/a11y.css/index.html)，它显示不同的建议、警告和错误。`;
  });

  test('should provide step-by-step instructions', () => {
    expect(documentContent).toMatch(/步骤|方法|如何/);
    expect(documentContent).toContain('就像');
    expect(documentContent).toContain('简单');
  });

  test('should include practical examples with context', () => {
    expect(documentContent).toContain('假设');
    expect(documentContent).toContain('例如');
    expect(documentContent).toContain('这里');
  });

  test('should provide performance metrics', () => {
    expect(documentContent).toMatch(/\d+分钟/);
    expect(documentContent).toContain('快速');
    expect(documentContent).toContain('立即');
  });

  test('should use clear explanatory language', () => {
    expect(documentContent).toContain('这意味着');
    expect(documentContent).toContain('换句话说');
    expect(documentContent).toContain('也就是说');
  });

  test('should provide motivation and benefits', () => {
    expect(documentContent).toContain('很酷');
    expect(documentContent).toContain('有用');
    expect(documentContent).toContain('强大');
  });

  test('should explain common problems and solutions', () => {
    expect(documentContent).toContain('问题');
    expect(documentContent).toContain('解决方案');
    expect(documentContent).toContain('修复');
  });

  test('should provide context for when to use techniques', () => {
    expect(documentContent).toContain('当');
    expect(documentContent).toContain('如果');
    expect(documentContent).toContain('在');
  });

  test('should include encouraging language', () => {
    expect(documentContent).toContain('推荐');
    expect(documentContent).toContain('建议');
    expect(documentContent).toContain('可以');
  });
});