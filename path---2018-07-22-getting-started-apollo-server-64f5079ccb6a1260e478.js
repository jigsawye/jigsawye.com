webpackJsonp([0xe19aeda5b6eb],{359:function(n,a){n.exports={data:{site:{siteMetadata:{title:"JIGSAWYE",author:"Evan Ye",siteUrl:"https://jigsawye.com",disqusShortname:"jigsawnotes"}},markdownRemark:{id:"/Users/jigsawye/projects/gatsby-blog/content/posts/2018-07-22-getting-started-apollo-server.md absPath of file >>> MarkdownRemark",html:'<p>在前些日子 GraphQL 界知名的 <a href="https://blog.apollographql.com/announcing-apollo-server-2-2b69fb4702ce">Apollo 發佈了 Apollo Server 2</a>，這個版本其中一個特色就是加強了開發體驗。透過內建 server 減少開發上繁瑣的設定，比起前個版本，寫一個 hello world 的 demo 不再需要花費大量的時間。本文大部分內容都來自於<a href="https://www.apollographql.com/docs/apollo-server/getting-started.html">官方的 Getting Started</a>，經過整理與翻譯過後發布。</p>\n<!-- more -->\n<p>閱讀完本文之後，你將會得到以下幾點：</p>\n<ul>\n<li>一個基礎的 GraphQL server，你可以基於此打造更複雜的 server</li>\n<li>了解 GraphQL 的基本原理</li>\n<li>使用 GraphQL Playground 發送 query 及查看 response</li>\n</ul>\n<p>為了確保過程無虞，請具備基礎的 JavaScript 的知識及版本 6 以上的 Node.js 後再繼續。</p>\n<h2 id="step-1：初始化-project"><a href="#step-1%EF%BC%9A%E5%88%9D%E5%A7%8B%E5%8C%96-project" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Step 1：初始化 project</h2>\n<p>在此步驟中，我們會透過你的 terminal（e.g. Terminal, iTerm, PowerShell）建立名為 <code class="language-text">graphql-server-example</code> 的資料節，並建立簡單的 Node.js \b 程式。本步只是為了後續的操作作準備，將會在 \b terminal 及 editor 來回作切換</p>\n<p>首先，使用 mkdir 指令建立一個名為 graphql-server-example 的資料夾。</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> graphql-server-example</code></pre>\n      </div>\n<p>進入資料夾。</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">cd</span> graphql-server-example</code></pre>\n      </div>\n<p>使用 Node.js 的 npm 初始化資料夾</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> init --yes</code></pre>\n      </div>\n<blockquote>\n<p>我們使用 Node.js 預設的套件管理器 npm。其他套件管理器如 yarn 也有提供類似的功能，不過本篇不會介紹。</p>\n</blockquote>\n<p>上述步驟執行完成後，資料夾內應該會產生 <code class="language-text">package.json</code>，你可以使用 <code class="language-text">ls</code> 來檢視並確認。</p>\n<h2 id="step-2：安裝-dependencies"><a href="#step-2%EF%BC%9A%E5%AE%89%E8%A3%9D-dependencies" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Step 2：安裝 dependencies</h2>\n<p>接著，我們要安裝兩個用來建立 GraphQL request 的 response 所需的 dependencies：</p>\n<ul>\n<li><a href="https://npm.im/apollo-server">apollo-server</a>：Apollo server 套件讓你可以定義資料型態及獲取方式。</li>\n<li><a href="https://npm.im/graphql">graphql</a>：本套件讓你建構並查詢 schema。</li>\n</ul>\n<blockquote>\n<p>Note：本教學中不會使用 <code class="language-text">graphql</code>，會單獨安裝是因為它是 Apollo Server 的 peer dependency。</p>\n</blockquote>\n<p>雖然你可以自己寫所有必須的 code，但這兩個依賴會讓你在建構 GraphQL server 時容易許多，且在各種大小型的 application 中相當常見。</p>\n<p>執行以下指令將 dependencies 安裝並儲存在 project 中：</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save apollo-server graphql</code></pre>\n      </div>\n<p>在下個步驟我們將會使用這些 dependencies 來建構處理 GraphQL requests 並 response 的 server。</p>\n<h2 id="step-3：建立-server"><a href="#step-3%EF%BC%9A%E5%BB%BA%E7%AB%8B-server" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Step 3：建立 server</h2>\n<p>在此步驟中，我們會提供一個 code block，用於設定 <code class="language-text">apollo-server</code> 來處理 GraphQL requests 並 response。為了加快速度，我們希望你將這 code 複製並貼入你專案的 <code class="language-text">index.js</code> 中。在讀這些 code 時，你可以透過這些有幫助的註解來理解 GraphQL 的核心概念。不用太擔心是否會漏掉一些必要的資訊；我們將在教學的末端提供給你。</p>\n<p>在範例 code 中，會使用兩本書的靜態資料。在更複雜的例子中，可以從 web resource（e.g. Amazon 或 本機端的網站）或資料庫（e.g. MySQL 或 MongoDB）來取得資料。</p>\n<ul>\n<li>使用 IDE 或 editor 打開在第一步中所建立的 <code class="language-text">graphql-server-example</code> 資料夾。</li>\n<li>在 project 的根目錄建立名為 <code class="language-text">index.js</code> 的空白檔案。</li>\n<li>「複製」以下的 code block，「貼上」至剛剛建立的 <code class="language-text">index.js</code> 檔案，並「儲存」。</li>\n</ul>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token punctuation">{</span> ApolloServer<span class="token punctuation">,</span> gql <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'apollo-server\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 這是一個（示範的）books 的 collection，我們可以透過 GraphQL server 來 query。</span>\n<span class="token comment">// 在更複雜的例子，我們會從像是 REST API 或資料庫等既有的 data soruce 取得資料。</span>\n<span class="token keyword">const</span> books <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    title<span class="token punctuation">:</span> <span class="token string">\'Harry Potter and the Chamber of Secrets\'</span><span class="token punctuation">,</span>\n    author<span class="token punctuation">:</span> <span class="token string">\'J.K. Rowling\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    title<span class="token punctuation">:</span> <span class="token string">\'Jurassic Park\'</span><span class="token punctuation">,</span>\n    author<span class="token punctuation">:</span> <span class="token string">\'Michael Crichton\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Type definitions 定義資料的「形狀」，</span>\n<span class="token comment">// 並指定從 GraphQL server 獲取的方式。</span>\n<span class="token keyword">const</span> typeDefs <span class="token operator">=</span> gql<span class="token template-string"><span class="token string">`\n  # GraphQL 的註解使用 hash（#）符號來定義\n\n  # 「Book」型別可以使用其他的型別宣告\n  type Book {\n    title: String\n    author: String\n  }\n\n  # 「Query」型別是所有 GraphQL 查詢的 root。\n  # （「Mutation」會在稍後介紹）\n  type Query {\n    books: [Book]\n  }\n`</span></span><span class="token punctuation">;</span>\n\n<span class="token comment">// Resolvers 定義從 schema 獲取 type 的方式，</span>\n<span class="token comment">// 我們從上面的「books」array 回傳所有的書。</span>\n<span class="token keyword">const</span> resolvers <span class="token operator">=</span> <span class="token punctuation">{</span>\n  Query<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    books<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> books<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 基本上來說，ApolloServer 可以透過傳入 type definitions（typeDefs）</span>\n<span class="token comment">// 及 resolvers 來管理獲取這些資料的型別。</span>\n<span class="token keyword">const</span> server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ApolloServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> typeDefs<span class="token punctuation">,</span> resolvers <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// `listen` method 啟動 web-server。現有的 apps 可以</span>\n<span class="token comment">// 使用 middleware options，我們將在晚點討論。</span>\nserver<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> url <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`🚀  Server ready at </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>以上 code 包含了所有執行基礎 GraphQL server 的需求。在下一步中，我們會啟動 server，讓它可以 response 所有 request！</p>\n<h2 id="step-4：啟動-server"><a href="#step-4%EF%BC%9A%E5%95%9F%E5%8B%95-server" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Step 4：啟動 server</h2>\n<p>在此步驟中，我們回到 terminal/console 啟動在剛剛的步驟定義的 server。</p>\n<ul>\n<li>使用 Node.js 執行在剛剛步驟中所建立的 <code class="language-text">index.js</code></li>\n</ul>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash">node index.js</code></pre>\n      </div>\n<ul>\n<li>執行後你應該會看到以下的 output：</li>\n</ul>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash">🚀 Server ready at http://localhost:4000/</code></pre>\n      </div>\n<ul>\n<li>\n<p>在你的瀏覽器打開顯示的位址</p>\n</li>\n<li>\n<p>如果所有東西都正常執行，你應該會看到 GraphQL Playground 資源管理工具，我們將在接下來的步驟使用它。</p>\n</li>\n</ul>\n<p><img src="https://www.apollographql.com/docs/apollo-server/images/getting-started/graphql-playground.png"></p>\n<p>在下個步驟，我們會使用 GraphQL Playground 工具來送出 query 至 GraphQL server。</p>\n<h2 id="step-5：執行你的第一個-query"><a href="#step-5%EF%BC%9A%E5%9F%B7%E8%A1%8C%E4%BD%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E5%80%8B-query" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Step 5：執行你的第一個 query</h2>\n<p>現在，你可以使用 GraphQL Playground 開始向 GraphQL server 送出 query，GraphQL Playground 分為幾個部分：</p>\n<ul>\n<li>request（右側）</li>\n<li>response（左側）</li>\n<li>文件 (點擊最右邊綠色的「SCHEMA」按紐)</li>\n</ul>\n<p>因為我們在試著取得 books，因此可以在畫面左側輸入以下 query。此 query 會取得 books 列表，包含每個 book 的 title 跟 author。</p>\n<div class="gatsby-highlight" data-language="gql">\n      <pre class="language-gql"><code class="language-gql">{\n  books {\n    title\n    author\n  }\n}</code></pre>\n      </div>\n<p>當按下中間的播放鈕，會看到右邊的 response 像這樣：</p>\n<p><img src="https://www.apollographql.com/docs/apollo-server/images/getting-started/graphql-playground-response.png"></p>\n<h2 id="next-steps"><a href="#next-steps" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Next Steps</h2>\n<p>對於任何 GraphQL server，此 application 應該是一個很好的起點，不過下列資源是構建 GraphQL server 的下一步：</p>\n<ul>\n<li><a href="https://www.apollographql.com/docs/apollo-server/essentials/server.html#integrations">Adding Apollo Server to an existing app.</a></li>\n<li><a href="https://www.apollographql.com/docs/apollo-server/essentials/schema.html">Schema design</a></li>\n<li><a href="https://www.apollographql.com/docs/apollo-server/deployment/heroku.html">Deploy with Heroku</a></li>\n</ul>',excerpt:"在前些日子 GraphQL 界知名的  Apollo 發佈了 Apollo Server 2 ，這個版本其中一個特色就是加強了開發體驗。透過內建 server 減少開發上繁瑣的設定，比起前個版本，寫一個 hello world 的 demo…",fields:{slug:"/2018/07/22/getting-started-apollo-server/"},frontmatter:{title:"透過 apollo-server 在 10 分鐘內打造你的第一個 GraphQL server",date:"July 22, 2018"}}},pathContext:{slug:"/2018/07/22/getting-started-apollo-server/"}}}});
//# sourceMappingURL=path---2018-07-22-getting-started-apollo-server-64f5079ccb6a1260e478.js.map