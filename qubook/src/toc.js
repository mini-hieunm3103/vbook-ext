function execute(url) {
    let response = fetch(url.replace('sj.qubook.cc','qubook.cc'));
    if (response.ok) {
        let doc = response.html('gbk');
        let newurl = doc.select("#page > div.ml > div.ml1 > dl > a:nth-child(1)").attr("href")
        // console.log(newurl)
        let bookName = newurl.split("/TXT/")[1]
        let firstUrl = newurl.replace(/\/TXT\/(.*?).txt/g,"/TXT/")
        var gbkEncode = function(s) {
            load('gbk.js');
            return GBK.encode(s);
        }
        let newurl1 = "https://sj.qubook.cc" + firstUrl+ gbkEncode(bookName)
        // console.log(newurl1)
        let doc1 = fetch(newurl1).html('gbk');
        let lastUrl = doc1.select("#gobottom > div.xlh li:nth-last-child(2) a").attr("href")
        let page = lastUrl.split("yeshu=")[1]
        // console.log(page)
        var data = []
        for (let i = 1 ;i <= page; i++) {
        data.push({
            name: "页" + i,
            url: newurl1 + "&yeshu=" + i,
            host: "https://sj.qubook.cc/"
        });
        }
        return Response.success(data);
    }
    return null;
}