// This file is invisible to the initial page load
export async function hydrate() {
  await Promise.all([
    import('quasar/src/components/scroll-observer/QScrollObserver.js'),
    import('quasar/src/components/resize-observer/QResizeObserver.js'),
    import('quasar/src/components/layout/QLayout.js'),
    import('quasar/src/components/header/QHeader.js'),
    import('quasar/src/components/toolbar/QToolbar.js'),
    import('quasar/src/components/toolbar/QToolbarTitle.js'),
    import('quasar/src/components/page/QPageContainer.js'),
    import('quasar/src/components/item/QList.js'),
    import('quasar/src/components/item/QItem.js')
  ])
  return true
}