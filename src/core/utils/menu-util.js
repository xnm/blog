const DEFAULT_PRIORITY = 20;
const DEFAULT_ICON = 'link';

/**
 * @param {String} name
 * @param {Map|Array} links
 * @param {Object} [options]
 **/
function convertExpandableMenu(name, links, {icon, priority}) {
  return {
    expandable: true,
    name: name,
    icon: icon || DEFAULT_ICON,
    priority: priority || DEFAULT_PRIORITY,
    links: links
  };
}

/**
 * @param {String} name
 * @param {String} link
 * @param {Object} [options]
 **/
function convertDirectMenu(name, link, {icon, priority}) {
  return {
    expandable: false,
    name: name,
    icon: icon || DEFAULT_ICON,
    priority: priority || DEFAULT_PRIORITY,
    link: link
  };
}

export default {
  convertExpandableMenu,
  convertDirectMenu
};
