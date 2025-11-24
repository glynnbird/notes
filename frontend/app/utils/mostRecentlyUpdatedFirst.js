 export default function mostRecentlyUpdatedFirst(a, b) {
  a.lastEdited = a.lastEdited || 0
  b.lastEdited = b.lastEdited || 0
  if (a.lastEdited < b.lastEdited) {
    return 1;
  } else if (a.lastEdited > b.lastEdited) {
    return -1;
  }
  return 0;
}
