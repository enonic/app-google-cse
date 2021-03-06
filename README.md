# Google Custom Search APP

https://market.enonic.com/vendors/enonic/com.enonic.app.google.cse

## Releases and Compatibility

| App version | Required XP version |
| ----------- | ------------------- |
| 2.0.0 | 7.0.0 |
| 1.0.0 | 6.6.0 |


## Usage


### Install cse

Install app-cse by deploying to the installation

    ./gradlew deploy



### API-key and engine id

To be able to get search result from Google, you need an api-key and a search engine id from Google. The api-key is obtained by setting up a credential at Googles [API manager](https://console.developers.google.com), and enabling the "custom search API".

Get the search engine id by registering an engine at Googles [custom search engine console](https://cse.google.com).

![Google Api manager as of 2. august 2016](doc/images/google-api-manager-4aug2016.png)



### Site config

In the siteconfig for the app, apply your API-key and search engine id.

![The app-cse siteconfigs modalwindow with two input fields for each key](doc/images/siteConfig.png)


### Parts

![Behold the glorious parts in a list](doc/images/partsInAlist.png)

There are 2 sets of parts to choose from. The CSE search and result parts, and the CSE *custom* search and result parts.


#### CSE Search and result parts
This is the quickest way to add cse to your site. Simply add the search field part to any page. Your settings in the [custom search engine console](https://cse.google.com) will manage how the search result will be shown.

If you want the search result on a different page, add the "CSE search result" part to the destination page, and link to it in the "CSE search field" part config. Change the config in the [custom search engine console](https://cse.google.com), to support the landing page.

#### CSE *custom* search and result parts

If you want to manage the css and behavior of the searchfield and the result, you can use the custom parts. The custom search field provide an input textfield and a submit/search button.

The searchresult part is flexible and lets you choose which html tags you want to wrap both the searchresult list and each hit with. By default, no fields from google is selected to show. You can choose which fields from the search result from google you want to show in the part config. When you choose a field, you will also choose what kind of html-tag this field is going to be wrapped in. Choose between h2 - h6, span, p and a tags. You can add classes to the tags as well.

Add styling in your own apps css, that applies to the html elements and classes you set to make the search result exactly how you want it.

![Options bonanza: customise the search result with choosable options](doc/images/searchResultOptionBonanza.png)

##### CSE *custom* result part options

| General | | |
| ---- | ----------- | ---- |
| wrapper | Choose a wrapping html element for the search result elements. | Choose between: article, ol > li, ul > li, and div. |
| Classes | Add classes to the wrapper | Sample: "cse-result col-xs-12"|

| ResultField | | |
| ---- | ----------- | ---- |
| Field | Choose a field to show | See below for fields to choose from with sample data |
| Html tag to represent field | Choose which html element for the searchresult. | Choose between: h2,h3, h4, h5, h6, a, p, span |
| Clickable | Check if this field should be a link to the searchresult content | |
| Classes | Add classes to the searchresult element | Sample: "cse-result-item" | |

| Pagination | | |
| ---- | ----------- | ---- |
| Show pagination | Add a pagination in the bottom of the searchresult | |
| Previous link text | | Default text "previous page" |
| Next link text | | Default text "next page" |

Googles searchresult fields available (sample):

    kind: "customsearch#result",
    title: "lib-thymeleaf — Enonic XP 6.1 documentation",
    htmlTitle: "lib-thymeleaf — Enonic XP 6.1 documentation",
    link: "http://xp.readthedocs.io/en/6.1/reference/libraries/thymeleaf/index.html",
    displayLink: "xp.readthedocs.io",
    snippet: "var thymeleaf = require('/lib/xp/thymeleaf'). Thymeleaf also supports a set of View \nFunctions. The methods implemented in this library are listed below. render.",
    htmlSnippet: "var thymeleaf = require(&#39;/lib/xp/thymeleaf&#39;). Thymeleaf also supports a set of <b>View</b> <br>\n<b>Functions</b>. The methods implemented in this library are listed below. render.",
    cacheId: "PoeWLlrxwGsJ",
    formattedUrl: "xp.readthedocs.io/en/6.1/reference/libraries/thymeleaf/index.html",
    htmlFormattedUrl: "xp.readthedocs.io/en/6.1/reference/libraries/thymeleaf/index.html", 
