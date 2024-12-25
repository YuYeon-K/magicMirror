const News = async (newsSettings: {
  keywords: string
  countries: string
  categories: string
  languages: string
  domains: string
  excludeDomains: string
  numberOfArticles: number
}) => {
  if (process.env.NEWSDATA_API_KEY === undefined)
    throw new Error(
      "[ERROR] News Module: No Newsdata API KEY! Specify NEWSDATA_API_KEY env variable..."
    )
  const url = `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATA_API_KEY}\
&language=${newsSettings.languages}&country=${newsSettings.countries}\
&category=${newsSettings.categories}\
&prioritydomain=top&size=${newsSettings.numberOfArticles}&video=0&image=0&removeduplicate=1\
${newsSettings.excludeDomains.trim() === "" ? "" : `&excludedomain=${newsSettings.excludeDomains}`}\
${newsSettings.keywords.trim() === "" ? "" : `&q=${newsSettings.keywords}`}\
${newsSettings.domains.trim() === "" ? "" : `&domain=${newsSettings.domains}`}`
  const data = await fetch(url)

  interface ArticleInfo {
    source_name: string
    title: string
  }
  const articles: {
    status: string
    results: Array<ArticleInfo>
  } = await data.json()

  if (articles.status !== "success")
    return (
      <div>
        {"[Error] News Module: Fetch Error - " +
          JSON.stringify(articles.results)}
      </div>
    )
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 max-w-80">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold">NEWS</h1>
        </div>
        {articles.results.map((article: ArticleInfo, i: number) => (
          <article key={i} className="text-wrap">
            <h6 className="text-s">{article.source_name}</h6>
            <h1 className="text-xl font-bold">{article.title}</h1>
            <br></br>
          </article>
        ))}
      </div>
    </div>
  )
}

export default News
