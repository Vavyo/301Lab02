'use strict';
/**
 * @type {HornedCreature[]}
 */
const creatures = [];

function HornedCreature(image, title, description, keyword, horns){
  this.image = image;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  this['🍱🥤'] =this['😂😂😂']();
}

HornedCreature.prototype.render=function(){
  // Add to the page
  // console.log('Render');
  $('#page-1').append(this['🍱🥤']);
};

$.ajax('./data/page-1.json').then(creaturesJSON => {
  console.log(creaturesJSON);
  creaturesJSON.forEach(properties => {
    const hornedCreature = new HornedCreature(
      properties.image_url,
      properties.title,
      properties.description,
      properties.keyword,
      properties.horns);
    addSelect(hornedCreature.keyword);
    creatures.push(hornedCreature);
    // console.log(hornedCreature);
  });
  for (const creature of creatures) {
    // console.log("creature.title");
    creature.render();
  }
});

HornedCreature.prototype['😂😂😂'] = function() {
  // Grab the template and the elements within

  // Mustache
  const template = document.getElementById('photo-template').innerHTML;
  const rendered = Mustache.render(template, {name: this.title, image: this.image, description: this.description});
  console.log(rendered);
  return rendered;

  /** jQuery
   * const $template = $('#photo-template').clone().contents();
   * const $h2 = $template.find('h2');
   * const $img = $template.find('img');
   * const $p = $template.find('p');
   *
   * // Populate the elements
   * $h2.text(this.title);
   * $img.attr('src', this.image);
   * $p.text(this.description);
   * return $template;
   */
};

function addSelect(keyword){
  const $select = $('#keywordSelect');
  let exists = false;
  $select.children().each(function() {
    // console.log(this.text);
    if(this.text === keyword){
      exists = true ;
    }
  });
  if(exists){
    return;
  }
  const $option = $('<option></option>').text(keyword);
  $select.append($option);
}

document.getElementById('keywordSelect').addEventListener('change',updatePage);



function updatePage(){
  const $selected = $('#keywordSelect option:selected').text();
  console.log($selected);
  for (const creature of creatures) {
    console.log(creature.keyword);
    if (creature.keyword !== $selected){
      document.getElementById(creature.title).setAttribute("style", "display: none");
    }else{
      document.getElementById(creature.title).setAttribute("style", "");
    }
  }
}
