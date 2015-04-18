define([
  '../core',
  '../method'
], function( Han, $ ) {

Han.renderJiya = function( context ) {
  var context = context || document
  var finder = Han.find( context )

  finder
  .filterOut( 'textarea, code, kbd, samp, pre', true )
  .groupify()
  .charify({
    hanzi:     'biaodian',
    liga:      'liga',
    word:      'none',
    latin:     'none',
    ellinika:  'none',
    kirillica: 'none'
  })

  // The reason we're doing this instead of using pseudo elements in CSS
  // is because WebKit has problem rendering pseudo elements containing only 
  // space.
  $.qsa( 'char.biaodian.open, char.biaodian.end', context )
  .forEach(function( elem ) {
    var html = '<inner>' + elem.innerHTML + '</inner>'
    var hcs = '<hcs> </hcs>'
    var isOpen = elem.classList.contains( 'open' )
    elem.innerHTML = isOpen ? hcs + html : html + hcs
  })

  return finder
}

$.extend( Han.fn, {
  jiya: null,

  renderJiya: function() {
    this.jiya = Han.renderJiya( this.context )
    return this
  },

  revertJiya: function() {
    try {
      this.jiya.revert( 'all' )
    } catch ( e ) {}
    return this
  }
})

return Han
})