
function getOffset(el) {
  // https://stackoverflow.com/a/442474/8474056
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

export default function scrollToElementById(id) {
  let headerOffset = 64 // TODO don't hardcode this, sync with less

  console.log(id)

  let offset = getOffset(document.getElementById(id))
  window.scroll({top: offset.top - headerOffset, left: offset.left, behavior: 'smooth' })
}