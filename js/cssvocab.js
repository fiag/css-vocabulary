$(document).ready(function() {
  var vocab = [
    {
      'tokenName': 'comment',
      'humanName': '注释',
      'url': ''
    },
    {
      'tokenName': 'statement',
      'humanName': '声明',
      'url': ''
    },
    {
      'tokenName': 'rule-set',
      'humanName': '规则集',
      'url': ''
    },
    {
      'tokenName': 'at-rule',
      'humanName': '@规则',
      'url': ''
    },
    {
      'tokenName': 'media-query',
      'humanName': '媒介查询',
      'url': ''
    },
    {
      'tokenName': 'media-query-list',
      'humanName': '媒介查询列表',
      'url': ''
    },

    {
      'tokenName': 'media-type',
      'humanName': '媒介类型',
      'url': ''
    },
    {
      'tokenName': 'expression',
      'humanName': '表达式',
      'url': ''
    },
    {
      'tokenName': 'media-feature',
      'humanName': '媒介特征',
      'url': ''
    },
    {
      'tokenName': 'block',
      'humanName': '块',
      'url': ''
    },
    {
      'tokenName': 'declaration-block',
      'humanName': '声明块',
      'url': ''
    },
    {
      'tokenName': 'selector',
      'humanName': '选择器',
      'url': ''
    },
    {
      'tokenName': 'simple-selector',
      'humanName': '简单选择器',
      'url': ''
    },
    {
      'tokenName': 'type-selector',
      'humanName': '类型选择器',
      'url': ''
    },
    {
      'tokenName': 'universal-selector',
      'humanName': '通配选择器',
      'url': ''
    },
    {
      'tokenName': 'id-selector',
      'humanName': 'ID 选择器',
      'url': ''
    },
    {
      'tokenName': 'class-selector',
      'humanName': '类选择器',
      'url': ''
    },
    {
      'tokenName': 'attribute-selector',
      'humanName': '属性选择器',
      'url': ''
    },
    {
      'tokenName': 'pseudo-class',
      'humanName': '伪类',
      'url': ''
    },
    {
      'tokenName': 'pseudo-element',
      'humanName': '伪元素',
      'url': ''
    },
    {
      'tokenName': 'combinator',
      'humanName': '关系选择器',
      'url': ''
    },
    {
      'tokenName': 'descendant-combinator',
      'humanName': '后代选择器',
      'url': ''
    },
    {
      'tokenName': 'child-combinator',
      'humanName': '子选择器',
      'url': ''
    },
    {
      'tokenName': 'adjacent-sibling-combinator',
      'humanName': '相邻兄弟选择器',
      'url': ''
    },
    {
      'tokenName': 'general-sibling-combinator',
      'humanName': '一般兄弟选择器',
      'url': ''
    },
    {
      'tokenName': 'declaration',
      'humanName': '声明',
      'url': ''
    },
    {
      'tokenName': 'property',
      'humanName': '属性',
      'url': ''
    },
    {
      'tokenName': 'value',
      'humanName': '值',
      'url': ''
    },
    {
      'tokenName': 'function',
      'humanName': '函数',
      'url': ''
    },
    {
      'tokenName': 'keyword',
      'humanName': '关键字',
      'url': ''
    },
    /*{
      'tokenName': 'identifier',
      'humanName': 'Identifier',
      'url': ''
    },*/
    {
      'tokenName': 'string',
      'humanName': '字符串',
      'url': ''
    },
    {
      'tokenName': 'url',
      'humanName': 'URL',
      'url': ''
    },
    {
      'tokenName': 'number',
      'humanName': '数字',
      'url': ''
    },
    {
      'tokenName': 'percentage',
      'humanName': '百分比',
      'url': ''
    },
    {
      'tokenName': 'length',
      'humanName': '长度',
      'url': ''
    },
    {
      'tokenName': 'unit',
      'humanName': '单位',
      'url': ''
    },
    {
      'tokenName': 'color',
      'humanName': '颜色',
      'url': ''
    },
    {
      'tokenName': 'vendor-prefix',
      'humanName': '第三方前缀',
      'url': ''
    },
  ];

  //Build vocab list in the sidebar
  function buildVocabList (vocab) {
    for (var i = 0; i < vocab.length; i++) {
      text = vocab[i].humanName;
      token = vocab[i].tokenName;
      $('.vocabList').append('<li class="'+token+'" tabindex="0">'+text+'</li>');
    }
  }
  buildVocabList(vocab);

  /*
    build css selectors that select:
    - all tokens in the app
    - tokens in css panel and
    - tokens in vocabList
  */
  function buildSelectors (obj) {
    var all = '';
    var css = '';
    var vocab = '';
    obj.forEach(function (item, i, obj) {
      var name = item.tokenName;
      all = all + '.' + name + ',';
      css = css + '.css .' + name + ',';
      vocab = vocab + '.vocabList .' + name + ',';
    });
    // Remove the trailing comma in each selector string
    all = all.slice(0, -1);
    css = css.slice(0, -1);
    vocab = vocab.slice(0, -1);
    return {'allTokens': all, 'cssTokens': css, 'vocabTokens': vocab};
  }
  var selectors = buildSelectors(vocab);

  $(selectors.cssTokens).on('mouseover', function(event) {
    event.stopPropagation();
    $('.hover').removeClass('hover');
    $(this).addClass('hover');
  });

  $(selectors.cssTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.content').addClass('focus');
    $('.sidebar').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var pals = whatIsThis.split(' ');
    var $cssPals = $('.css ' + '.' + pals.join('.'));
    var vocabPalsSelector = '.vocabList .' + pals.join(', .vocabList .');
    $vocabPals = $(vocabPalsSelector);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
    $vocabPals.addClass('selected');
  });

  $(selectors.vocabTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.sidebar').addClass('focus');
    $('.content').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var $cssPals = $('.css .' + whatIsThis);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
  });

  $(selectors.allTokens).attr('tabindex', '0');
  //$('.vocabList .property').focus();

  key('up', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.prev().focus();
    }
  });
  key('down', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.next().focus();
    }
  });

  $('.sidebar-hide-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').addClass('sidebar-hide');
  });
  $('.sidebar-show-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').removeClass('sidebar-hide');
  });

});
