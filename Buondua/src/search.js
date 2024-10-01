load("config.js");
function execute(key, start) {
  if (!start) start = "0";
  let response = fetch(BASE_URL + "/?search" + key + "&start=" + start);
  if (response.ok) {
    let doc = response.html();
    let nextLi = doc
      .select(".pagination-list")
      .select("li:has(a.is-current) + li")
      .last();
    let nextHref = nextLi.attr("href");
    let next = nextHref.match(/start=(\d+)/);
    let data = [];
    doc.select(".main-container .main-body .blog.columns").forEach((e) => {
      e.select(".items-row.column").forEach((item) => {
        var cover = item.select(".item-thumb a img").attr("src");
        var name = item.select(".item-content a").text();
        var match = name.match(/\(\s*(\d+)\s*photos\s*\)/);
        data.push({
          name: name,
          link: item.select(".item-content a").attr("href"),
          description: match[1] + "photos",
          cover: cover,
          host: BASE_URL,
        });
      });
    });
    return Response.success(data, next);
  }
  return null;
}
