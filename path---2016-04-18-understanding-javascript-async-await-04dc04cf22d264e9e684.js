webpackJsonp([0xd3798f43734d],{355:function(n,s){n.exports={data:{site:{siteMetadata:{title:"JIGSAWYE",author:"Evan Ye",siteUrl:"https://jigsawye.com",disqusShortname:"jigsawnotes"}},markdownRemark:{id:"/Users/jigsawye/projects/gatsby-blog/content/posts/2016-04-18-understanding-javascript-async-await.md absPath of file >>> MarkdownRemark",html:'<p>最近在做一個自己的 <a href="https://github.com/jigsawye/koa2-boilerplate">API boilerplate</a>，選用了 <a href="https://github.com/koajs/koa">koa</a> 這個 library。而其中除了 stable 的 <code class="language-text">1.x</code> 外，它還 release <code class="language-text">2.x</code>！有什麼不同呢？<code class="language-text">1.x</code> 是用 generator 來實作，而到了 <code class="language-text">2.x</code> 竟然是用 Async/Await！身為一個熱血碼農，怎能錯過這個進場 Async/Await 的大好機會 XD。</p>\n<!-- more -->\n<h4 id="說說-promise"><a href="#%E8%AA%AA%E8%AA%AA-promise" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>說說 Promise</h4>\n<p>在很久以前，那是個 JavaScript callback hell 的年代，為了處理這種處境，有人提出了 Promise 的寫法。而 Promise 也是近年開發 JavaScript 程式不可或缺的一門基礎，在 ES2015 也將 Promise 納為其中的一項標準。</p>\n<h5 id="非同步-function"><a href="#%E9%9D%9E%E5%90%8C%E6%AD%A5-function" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>非同步 function</h5>\n<p>關於非同步的文章網路上已經很多了，就不在此贅述。在這裡我直接先以 Promise 實作一個簡易的非同步程式：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> posts <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> title<span class="token punctuation">:</span> <span class="token string">\'Post 1\'</span><span class="token punctuation">,</span> content<span class="token punctuation">:</span> <span class="token string">\'fake content\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> title<span class="token punctuation">:</span> <span class="token string">\'Post 2\'</span><span class="token punctuation">,</span> content<span class="token punctuation">:</span> <span class="token string">\'fake content\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">getPosts</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>我習慣寫 ES2015 的 arrow function，如果看不習慣的話，在一般 function 會像下面這樣：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">resolve</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>這支程式會回傳一個 Promise，而模擬在 1 秒後 resolve 一個模擬的 <code class="language-text">posts</code>。</p>\n<h5 id="呼叫一個非同步-function"><a href="#%E5%91%BC%E5%8F%AB%E4%B8%80%E5%80%8B%E9%9D%9E%E5%90%8C%E6%AD%A5-function" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>呼叫一個非同步 function</h5>\n<p>在 Promise 的做法中，我們就會這樣來實作取得 posts 的程式：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">printPostsToConsole</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>posts <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">printPostsToConsole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>除此之外還會加上 error handler：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">printPostsToConsole</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>posts <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>err <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">printPostsToConsole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h4 id="如果是-asyncawait？"><a href="#%E5%A6%82%E6%9E%9C%E6%98%AF-asyncawait%EF%BC%9F" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>如果是 Async/Await？</h4>\n<p>Async/Await 被規範在 ES2016 的標準中，很多的討論都指向 Async/Await 會是非同步的終極解決方案。</p>\n<h5 id="用-asyncawait-處理非同步-function"><a href="#%E7%94%A8-asyncawait-%E8%99%95%E7%90%86%E9%9D%9E%E5%90%8C%E6%AD%A5-function" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>用 Async/Await 處理非同步 function</h5>\n<p>換成 Async/Await 的話，就不必寫下 <code class="language-text">.then()</code> 了！就像同步的程式一般，不必理會它是否為非同步。</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> printPostsToConsole <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> posts <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">printPostsToConsole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>也可以寫成這樣：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">printPostsToConsole</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> posts <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">printPostsToConsole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>宣告在 <code class="language-text">printPostsToConsole</code> 的 <code class="language-text">async</code> 表示該 function 是個非同步的。而在 function 內 <code class="language-text">getPosts</code> 之前的 <code class="language-text">await</code> 表示要等待這個非同步的結果回傳後才會繼續執行，也就是說這個 function 內的程式都變為同步了！</p>\n<p>當然在也要加上 error handler。在 Async/Await 中請使用 <code class="language-text">try/catch</code>：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> printPostsToConsole <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> posts <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h4 id="現在就開始用-asyncawait！"><a href="#%E7%8F%BE%E5%9C%A8%E5%B0%B1%E9%96%8B%E5%A7%8B%E7%94%A8-asyncawait%EF%BC%81" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>現在就開始用 Async/Await！</h4>\n<h5 id="在前端"><a href="#%E5%9C%A8%E5%89%8D%E7%AB%AF" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>在前端</h5>\n<p>如何在現在的環境實作 Async/Await 呢？其實如果有在寫 Front-end（尤其是 React），基本上應該已經使用了 <a href="babeljs.io">babel</a>。如果要使用 Async/Await，presets 除了原本的 <code class="language-text">es2015</code> 外，只要加上 <code class="language-text">stage-3</code>：</p>\n<div class="gatsby-highlight" data-language="json">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  <span class="token property">"presets"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"es2015"</span><span class="token punctuation">,</span> <span class="token string">"stage-3"</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>或是將 <code class="language-text">transform-async-to-generator</code> 加入 plugins 就行了：</p>\n<div class="gatsby-highlight" data-language="json">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  <span class="token property">"presets"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"es2015"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token property">"plugins"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"transform-async-to-generator"</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h5 id="在後端"><a href="#%E5%9C%A8%E5%BE%8C%E7%AB%AF" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>在後端</h5>\n<p>在 backend 的情況則比較不同，雖然一樣要透過 babel，不過請裝 <a href="babel-preset-es2015-node4">es2015-node4</a> 或是 <a href="https://github.com/alekseykulikov/babel-preset-es2015-node5">es2015-node5</a>（根據你的 node 版本做選擇），其餘則跟前端一樣。</p>\n<blockquote>\n<p>Node 7.0.0 起已經支援 Async/Await，建議直接更新你的 Node 版本！</p>\n</blockquote>\n<p>接著如果要讓你的程式能夠執行 Async/Await，請額外建立一個檔案，並 require <code class="language-text">babel-register</code> 及你程式的 entry：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'babel-register\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'../app.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>接著只要用 node 執行 <code class="language-text">index.js</code> 就行了。</p>\n<p>關於詳細的設定可以參考我的 <a href="https://github.com/jigsawye/koa2-boilerplate">koa2-boilerplate</a></p>\n<h4 id="後記"><a href="#%E5%BE%8C%E8%A8%98" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>後記</h4>\n<p>緊接在 ES2015 之後的 ES2016 也增加了不少的新 feature，除了 Async/Await 也有 <a href="https://github.com/sebmarkbage/ecmascript-rest-spread">object-rest-spread</a>、<a href="https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md">class-constructor-call</a>、<a href="https://github.com/jeffmo/es-class-fields-and-static-properties">class-properties</a>等等。</p>\n<p>在 ES2015 泛用的現在，其實有機會的話可以慢慢接觸 ES2016 的功能了，對開發可以增添一股助力！</p>',excerpt:"最近在做一個自己的  API boilerplate ，選用了  koa  這個 library。而其中除了 stable 的   外，它還 release  ！有什麼不同呢？  是用 generator 來實作，而到了   竟然是用 Async/Await…",fields:{slug:"/2016/04/18/understanding-javascript-async-await/"},frontmatter:{title:"告別 JavaScript 的 Promise！迎接 Async/Await 的到來",date:"2016-04-18T19:33:55.000Z"}}},pathContext:{slug:"/2016/04/18/understanding-javascript-async-await/"}}}});
//# sourceMappingURL=path---2016-04-18-understanding-javascript-async-await-04dc04cf22d264e9e684.js.map