// Select the submit button
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function () {
// Select the result container
const resultContainer = document.querySelector('.result');
resultContainer.innerHTML = `<p class="loader">Please Wait...</p>`;

// Get the URL input value
const urlInput = document.getElementById("url").value;

// Check if the URL is not empty
if (urlInput.trim() !== "") {
// Fetch data from the API
fetch(`https://brainy-tan-peacock.cyclic.app/scrape?url=${urlInput}`)
.then(response => {
// Check for successful response (status code 200-299)
if (response.ok) {
return response.json();
} else {
// Handle the error response from the API
throw new Error(`Failed to fetch data. Status: ${response.status}`);
}
})
.then(data => displayResult(data))
.catch(error => {
// Display an error message if the URL is invalid or API request fails

resultContainer.innerHTML = "<p>Invalid URL or failed to fetch data</p>";
console.log(error);
});
} else {
// Display an error message if the URL is empty
resultContainer.innerHTML = "<p>Please enter a valid URL</p>";
}

// Function to display the result
function displayResult(data) {
// Clear previous content
resultContainer.innerHTML = '';
resultContainer.style.border="1px solid black";


// Display title
const urlSection = document.createElement("h2");
urlSection.innerHTML = "URL";
resultContainer.appendChild(urlSection);

const urlOl = document.createElement("ol");
urlOl.innerHTML = `
    <li><span id="highlight">URL:</span> <span id="data"><a href="${urlInput}" target="_blank">${urlInput}</a></span></li>
`;
resultContainer.appendChild(urlOl);

// Display title
const titleSection = document.createElement('h2');
titleSection.innerText = 'Title';
resultContainer.appendChild(titleSection);

const titleList = document.createElement('ol');
titleList.innerHTML = `<li><span id="highlight">Title:</span> <span id="data">${data.title.data}</span></li>
<li><span id="highlight">Title Length:</span> <span id="data">${data.title.length} Characters</span></li>
`;
resultContainer.appendChild(titleList);

// Display meta description
const descriptionSection = document.createElement('h2');
descriptionSection.innerText = 'Meta Description';
resultContainer.appendChild(descriptionSection);

const descriptionList = document.createElement('ol');
descriptionList.innerHTML = `<li><span id="highlight">Description:</span> <span id="data">${data.description.data}</span></li>
<li><span id="highlight">Description Length:</span> <span id="data">${data.description.length} Characters</span></li>`;
resultContainer.appendChild(descriptionList);

// Display headings
const headingsSection = document.createElement('h2');
headingsSection.innerText = 'Headings';
resultContainer.appendChild(headingsSection);

const headingsList = document.createElement('ol');
headingsList.innerHTML = `
<li>
<span id="highlight">Total H1 Headings: </span>
<span id="data">${data.headings.h1.total}</span>
</li>
${data.headings.h1.total > 0 ? `<div id="headingss">
${data.headings.h1.list.map((heading) => `<p>${heading}</p>`).join('')}
</div>` : " "}


<li>
<span id="highlight">Total H2 Headings: </span>
<span id="data">${data.headings.h2.total}</span>
</li>
${data.headings.h2.total > 0 ? `<div id="headingss">
${data.headings.h2.list.map((heading) => `<p>${heading}</p>`).join('')}
</div>` : " "}

<li>
<span id="highlight">Total H3 Headings: </span>
<span id="data">${data.headings.h3.total}</span>
</li>
${data.headings.h3.total > 0 ? `<div id="headingss">
${data.headings.h3.list.map((heading) => `<p>${heading}</p>`).join('')}
</div>` : " "}

<li>
<span id="highlight">Total H4 Headings: </span>
<span id="data">${data.headings.h4.total}</span>
</li>
${data.headings.h4.total > 0 ? `<div id="headingss">
${data.headings.h4.list.map((heading) => `<p>${heading}</p>`).join('')}
</div>` : " "}

<li>
<span id="highlight">Total H5 Headings: </span>
<span id="data">${data.headings.h5.total}</span>
</li>
${data.headings.h5.total > 0 ? `<div id="headingss">
${data.headings.h5.list.map((heading) => `<p>${heading}</p>`).join('')}
</div>` : " "}

<li>
<span id="highlight">Total H6 Headings: </span>
<span id="data">${data.headings.h6.total}</span>
</li>
${data.headings.h6.total > 0 ? `<div id="headingss">
${data.headings.h6.list.map((heading) => `<p>${heading}</p>`).join('')}
</div>` : " "}
`;

resultContainer.appendChild(headingsList);





// Display images
const imagesSection = document.createElement('h2');
imagesSection.innerText = 'Images';
resultContainer.appendChild(imagesSection);

const imagesList = document.createElement('ol');
imagesList.innerHTML = `<li><span id="highlight">Total Images: </span> <span id="data">${data.images.total}</span></li>

${data.images.total > 0 ? `<div id="images">
${data.images.images_list.map(img => `<p><span id="highlight">Image Path: </span> ${img.image}</p><p><span id="highlight">Alt: </span> ${img.alt_text}</p><br>`).join('')}
</div>` : ''}`;

resultContainer.appendChild(imagesList);

// Display internal links
const internalLinksSection = document.createElement('h2');
internalLinksSection.innerText = 'Internal Links';
resultContainer.appendChild(internalLinksSection);

const internalLinksList = document.createElement('ol');
internalLinksList.innerHTML = `<li><span id="highlight">Total Internal Links: </span> <span id="data">${data.internal_links.total}</span></li>
${data.internal_links.list && data.internal_links.list.length > 0 ?
`<div id="externallinks">
${data.internal_links.list.map(link => `<a href="${link}" target="_blank">${link}</a>`).join('')}
</div>` :
'Internal Links not Found on this page'
}`;
resultContainer.appendChild(internalLinksList);

// Display external links
const externalLinksSection = document.createElement('h2');
externalLinksSection.innerText = 'External Links';
resultContainer.appendChild(externalLinksSection);

const externalLinksList = document.createElement('ol');

externalLinksList.innerHTML = `
<li>
<span id="highlight">Total External Links: </span>
<span id="data">${data.external_links.total}</span>
</li>
${data.external_links.list && data.external_links.list.length > 0 ?
`<div id="externallinks">
${data.external_links.list.map(link => `<a href="${link}" target="_blank">${link}</a>`).join('')}
</div>` :
'External Links not Found on this page'
}`;

resultContainer.appendChild(externalLinksList);

// Display canonical tag
const canonicalTagSection = document.createElement('h2');
canonicalTagSection.innerText = 'Canonical Tag';
resultContainer.appendChild(canonicalTagSection);

const canonicalTagList = document.createElement('ol');
canonicalTagList.innerHTML = `
${data.canonical_tag.is_canonical ? `<li>Your Page Contains Canonical Link Tag</li>` : `<li>This page doesn't contain Canonical Link</li>`}
 <li><span id="highlight">Canonical Link: </span> <span id="data"> <a href="${data.canonical_tag.link}" target="_blank">${data.canonical_tag.link}</a></span></li>`;
resultContainer.appendChild(canonicalTagList);

// Display Open Graph tags
const ogTagsSection = document.createElement('h2');
ogTagsSection.innerText = 'Open Graph Tags';
resultContainer.appendChild(ogTagsSection);

const ogTagsList = document.createElement('ol');
ogTagsList.innerHTML = `<li><span id="highlight">OG Title: </span> <span id="data">${data.og_tags.og_title}</span></li>
<li><span id="highlight">OG Description: </span> <span id="data">${data.og_tags.og_description}</span></li>
<li><span id="highlight">OG Type: </span> <span id="data">${data.og_tags.og_type}</span></li>
<li><span id="highlight">OG URL: </span> <span id="data"><a id="data" href="${data.og_tags.og_url}" target="_blank">${data.og_tags.og_url}</a></span></li>`;
resultContainer.appendChild(ogTagsList);


const socialMediaLinksSection = document.createElement('h2');
socialMediaLinksSection.innerText = 'Social Media Links';
resultContainer.appendChild(socialMediaLinksSection);
const socialMediaLinksList = document.createElement('ol');
socialMediaLinksList.innerHTML = `${data.social_media_links.list.length > 0 ? `
<div>
<li><span id="highlight">Facebook: </span> <span id="data"> <a href="${data.social_media_links.list[0]}" target="_blank">${data.social_media_links.list[0]}</a></span></li>
<li><span id="highlight">LinkedIn: </span> <span id="data"><a href="${data.social_media_links.list[1]}" target="_blank">${data.social_media_links.list[1]}</a></span></li>
<li><span id="highlight">Twitter: </span> <span id="data"><a href="${data.social_media_links.list[2]}" target="_blank">${data.social_media_links.list[2]}</a></span></li>
</div>` : '<p>No Social Media Links on This Page</p>'} `;

resultContainer.appendChild(socialMediaLinksList);

// Display security measurements
const securitySection = document.createElement('h2');
securitySection.innerText = 'Security';
resultContainer.appendChild(securitySection);

const securityList = document.createElement('ol');
data.security.forEach(securityMeasure => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `<span id="highlight">${securityMeasure.name}:</span> ${securityMeasure.result ? `<span id="data" class="pass">Yes</span>` : `<span id="data" class="fail">No</span>`}`;
  securityList.appendChild(listItem);
});
resultContainer.appendChild(securityList);


// Display common words
const commonWordsSection = document.createElement('h2');
commonWordsSection.innerText = 'Common Words';
resultContainer.appendChild(commonWordsSection);

const commonWordsList = document.createElement('ol');
commonWordsList.innerHTML = `<li><span id="highlight">Total Common Words:</span> <span id="data">${data.common_words.common_words_total}</span></li>
<div id="commonwords">
${data.common_words.list.map(word => `<p>${word}</p>`).join('')}
</div>`;
resultContainer.appendChild(commonWordsList);
}
});