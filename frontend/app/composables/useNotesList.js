const NOTES_KEY = 'notescache'

// the default export
export default function () {

  // composables
  const notes = useState('notes', () => [])
  const { auth } = useAuth()
  const stick = useState('stick', () => { return false })
  const { setBusy, unsetBusy } = useBusy()
  const config = useRuntimeConfig()
  const { showAlert } = useShowAlert()
  const apiHome = config.public['apiBase'] || window.location.origin

  // create a custom fetch, prefilled with common stuff
  const $api = $fetch.create({
    baseURL: apiHome,
    method: 'post',
    headers: {
      'content-type': 'application/json',
      apikey: auth.value.apiKey
    }
  })

  // load notes from the API
  async function loadFromAPI() {
    setBusy()
    try {
      //  fetch the list from the API
      console.log('API', '/api/list')
      const r = await $api('/api/list')
      notes.value = r.list
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes.value))
      
    } catch (e) {
      console.error('failed to fetch list of notes', e)
    }
    unsetBusy()
  }


  // add a new note
  async function addNote(note, push = true) {
    setBusy()
    try {
      console.log('API', '/api/add', note)
      const ret = await $api('/api/add', { body: note })
      note.id = note.id
      if (push) {
        notes.value.push(note)
      } else {
        const ind = locateIndex(note.id)
        if (ind !== -1) {
          notes.value[ind] = note
        }
      }
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes.value))
      
      // create alert
      showAlert('Added/updated note', 'primary')
    } catch (e) {
      console.error(e)
    }
    unsetBusy()
  }

  async function getNoteFromAPI(id) {
    let retval = {}
    setBusy()
    //  fetch the list from the API
    try {
      console.log('API', '/api/get')
      const r = await $api('/api/get', { body: JSON.stringify({ id }) })
      retval = r.doc
    } catch (e) {
      console.error('Could not load note', id, e)
      // create alert
      showAlert('Could not load note', 'warning')
    }
    unsetBusy()
    return retval
  }

  const locateIndex = (id) => {
    let i
    for (i in notes.value) {
      if (id === notes.value[i].id) {
        return i
      }
    }
    return -1
  }

  // delete a note
  async function deleteNote(id) {
    const ind = locateIndex(id)
    if (ind) {
      notes.value.splice(ind, 1)
    }
    setBusy()
    console.log('API', '/api/del', id)
    await $api('/api/del', { body: { id } })
    unsetBusy()

    // create alert
    showAlert('Deleted note', 'error')
  }

  // load the data from the cache & the API, but only the first time this is invoked
  if (stick.value === false && notes.value.length === 0) {

    // load existing notes from localStorage
    console.log('loading from cache')
    const cache = localStorage.getItem(NOTES_KEY)
    if (cache) {
      notes.value = JSON.parse(cache)
    }

    // then later get fresh data from the API
    setTimeout(async () => {
      console.log('loading from API')
      await loadFromAPI()
      stick.value = true
    }, 1)
  }

  return { notes, locateIndex, addNote, loadFromAPI, deleteNote, getNoteFromAPI}
}
