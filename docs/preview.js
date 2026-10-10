if (new URLSearchParams(location.search).get('preview') === '1' && window.self !== window.top) {
  document.documentElement.classList.add('sketch-preview');
}
