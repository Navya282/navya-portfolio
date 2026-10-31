import { useRef, useState } from 'react';
import { photoUrl, uploadPhoto } from '../api.js';

const KEY_STORAGE = 'portfolio-admin-key';

// The "Change photo" button only appears when the page is opened with ?admin in the URL,
// e.g. http://localhost:5173/?admin. The upload itself is protected by the admin key on the backend.
const isAdminMode = new URLSearchParams(window.location.search).has('admin');

function readStoredKey() {
  try {
    return sessionStorage.getItem(KEY_STORAGE);
  } catch {
    return null;
  }
}

function storeKey(key) {
  try {
    if (key) sessionStorage.setItem(KEY_STORAGE, key);
    else sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    // storage unavailable; the key will just be asked again next time
  }
}

export default function ProfilePhoto({ name }) {
  const [version, setVersion] = useState(Date.now());
  const [failed, setFailed] = useState(false);
  const [status, setStatus] = useState('');
  const fileInput = useRef(null);

  const initials = name.split(' ').map((p) => p[0]).join('').slice(0, 2);

  async function handleFile(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;

    const key = readStoredKey() || window.prompt('Enter admin key to change the photo');
    if (!key) return;

    setStatus('Uploading…');
    try {
      await uploadPhoto(file, key);
      storeKey(key);
      setFailed(false);
      setVersion(Date.now());
      setStatus('Photo updated');
    } catch (err) {
      storeKey(null);
      setStatus(err.message);
    }
  }

  return (
    <div className="photo-wrap">
      <div className="photo">
        {failed ? (
          <span className="photo-initials">{initials}</span>
        ) : (
          <div className="photo-inner">
            <img src={photoUrl(version)} alt={name} onError={() => setFailed(true)} />
          </div>
        )}
      </div>
      {isAdminMode && (
        <>
          <button className="btn btn-small" onClick={() => fileInput.current.click()}>Change photo</button>
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handleFile} />
          {status && <p className="photo-status">{status}</p>}
        </>
      )}
    </div>
  );
}
