webpackJsonp([0xa4e7777840b7],{345:function(n,s){n.exports={data:{site:{siteMetadata:{title:"JIGSAWYE",author:"Evan Ye",siteUrl:"https://jigsawye.com",disqusShortname:"jigsawnotes"}},markdownRemark:{id:"/Users/jigsawye/projects/gatsby-blog/content/posts/2015-10-06-javascript-object-assign.md absPath of file >>> MarkdownRemark",html:'<blockquote>\n<p>以下開發情境為 ES2015（ES6）</p>\n</blockquote>\n<p>一般在寫 React 的時候，通常會希望資料是 immutable（不可變的），讓開發時對資料的流向即處理更容易，所以通常會使用 <code class="language-text">Object.assign</code> 來複制 object。但今天在寫時遇到一個問題，我一直以為 <code class="language-text">Object.assign</code> 會連同子項目都複製，結果兩個不同的資料改 A 竟然連 B 都跟著動，就做個紀錄。</p>\n<!-- more -->\n<p>假設我們有個 object，接著透過 <code class="language-text">Object.assign</code> 複製兩個 object：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> test <span class="token operator">=</span> <span class="token punctuation">{</span>\n  childrenKey<span class="token punctuation">:</span> <span class="token string">\'value\'</span><span class="token punctuation">,</span>\n  childrenObject<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    keyA<span class="token punctuation">:</span> <span class="token string">\'value a\'</span><span class="token punctuation">,</span>\n    keyB<span class="token punctuation">:</span> <span class="token string">\'value b\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> cloneA <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> test<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> cloneB <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> test<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>改變 <code class="language-text">cloneA</code> 中 <code class="language-text">childrenKey</code> 的 value，<code class="language-text">cloneB</code> 中 <code class="language-text">childrenKey</code> 的 value 並不會被改變：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js">cloneA<span class="token punctuation">.</span>childrenKey <span class="token operator">=</span> <span class="token string">\'change value\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// cloneA</span>\n<span class="token punctuation">{</span>\n  childrenKey<span class="token punctuation">:</span> <span class="token string">\'change value\'</span><span class="token punctuation">,</span>\n  childrenObject<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    keyA<span class="token punctuation">:</span> <span class="token string">\'value a\'</span><span class="token punctuation">,</span>\n    keyB<span class="token punctuation">:</span> <span class="token string">\'value b\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// cloneB</span>\n<span class="token punctuation">{</span>\n  childrenKey<span class="token punctuation">:</span> <span class="token string">\'value\'</span><span class="token punctuation">,</span>\n  childrenObject<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    keyA<span class="token punctuation">:</span> <span class="token string">\'value a\'</span><span class="token punctuation">,</span>\n    keyB<span class="token punctuation">:</span> <span class="token string">\'value b\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>可是當改變 <code class="language-text">childrenObject</code> 的值時，卻會連動改變：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js">cloneA<span class="token punctuation">.</span>childrenObject<span class="token punctuation">.</span>keyA <span class="token operator">=</span> <span class="token string">\'change value a\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// cloneA</span>\n<span class="token punctuation">{</span>\n  childrenKey<span class="token punctuation">:</span> <span class="token string">\'change value\'</span><span class="token punctuation">,</span>\n  childrenObject<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    keyA<span class="token punctuation">:</span> <span class="token string">\'change value a\'</span><span class="token punctuation">,</span>\n    keyB<span class="token punctuation">:</span> <span class="token string">\'value b\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// cloneB</span>\n<span class="token punctuation">{</span>\n  childrenKey<span class="token punctuation">:</span> <span class="token string">\'value\'</span><span class="token punctuation">,</span>\n  childrenObject<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    keyA<span class="token punctuation">:</span> <span class="token string">\'change value a\'</span><span class="token punctuation">,</span>\n    keyB<span class="token punctuation">:</span> <span class="token string">\'value b\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>原因是 <code class="language-text">Object.assign</code> 只會對 object 的子項目做 clone，下一層的則會建立 reference，所以指向的 <code class="language-text">childrenObject</code> 會是同一個。\n要解決這個問題的話可以使用 <code class="language-text">lodash</code> 的 <code class="language-text">clonedeep</code>：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> cloneDeep <span class="token operator">=</span> <span class="token keyword">from</span> <span class="token string">\'lodash.clonedeep\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> test <span class="token operator">=</span> <span class="token punctuation">{</span>\n  childrenKey<span class="token punctuation">:</span> <span class="token string">\'value\'</span><span class="token punctuation">,</span>\n  childrenObject<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    keyA<span class="token punctuation">:</span> <span class="token string">\'value a\'</span><span class="token punctuation">,</span>\n    keyB<span class="token punctuation">:</span> <span class="token string">\'value b\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> cloneA <span class="token operator">=</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> cloneB <span class="token operator">=</span> <span class="token function">cloneDeep</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>或是使用 <a href="https://facebook.github.io/immutable-js/">immutable.js</a>。</p>\n<p>reference: <a href="http://boke.io/immutable-js/">搞定immutable.js</a></p>',excerpt:"以下開發情境為 ES2015（ES6） 一般在寫 React 的時候，通常會希望資料是 immutable（不可變的），讓開發時對資料的流向即處理更容易，所以通常會使用   來複制 object…",fields:{slug:"/2015/10/06/javascript-object-assign/"},frontmatter:{title:"JavaScript 的 Object.assign 陷阱",date:"2015-10-06T18:05:14.000Z"}}},pathContext:{slug:"/2015/10/06/javascript-object-assign/"}}}});
//# sourceMappingURL=path---2015-10-06-javascript-object-assign-ed6faddd58d73db6b0f7.js.map