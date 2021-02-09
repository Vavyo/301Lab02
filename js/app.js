'use strict';

function HornedCreature(image, title, description, keyword, horns){
  this.image = image;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

HornedCreature.prototype.render=function(){
  // Grab the template and the elements within
  const $template = $('#photo-template').clone();
  const $h2 = $template.find('h2');
  const $img = $template.find('img');
  const $p = $template.find('p');

  // Populate the elements
  $h2.text(this.title);
  $img.attr('src', this.image);
  $p.text(this.description);

  // Add to the page
  $('main').append($template);
};

$.ajax('/data/page-1.json').then(creaturesJSON => {
  console.log(creaturesJSON);
  creaturesJSON.forEach(properties => {
    const hornedCreature = new HornedCreature(
      properties.image_url,
      properties.title,
      properties.description,
      properties.keyword,
      properties.horns);
    hornedCreature.render();
  });
});
