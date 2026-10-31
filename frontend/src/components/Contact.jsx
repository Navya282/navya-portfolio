import { useState } from 'react';
import {
  TbAlertCircle, TbArrowUpRight, TbCheck, TbCircleCheckFilled, TbClock, TbCopy, TbMail,
  TbMapPin, TbMessage, TbPhone, TbSend, TbTag, TbUser,
} from 'react-icons/tb';
import { sendContactMessage } from '../api.js';
import { SOCIAL_LINKS } from '../icons.js';

const EMPTY = { name: '', email: '', subject: '', message: '' };
const MESSAGE_MAX = 2000;

// One input with an icon inside it
function Field({ label, icon: Icon, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="field-box">
        <Icon className="field-icon" aria-hidden="true" />
        {children}
      </span>
    </label>
  );
}

export default function Contact({ contact }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      const res = await sendContactMessage(form);
      setStatus({ type: 'ok', text: res.message });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setSending(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked by the browser; the mailto link still works
    }
  }

  // Only show the social links that have a URL in profile-seed.json
  const socials = SOCIAL_LINKS.filter((s) => contact[s.key]);

  return (
    <section className="section" id="contact">
      <h2 className="section-title">Get in touch</h2>
      <div className="contact-layout">
        <div className="card contact-info">
          <span className="avail"><span className="pulse" aria-hidden="true" /> Open to opportunities</span>
          <h3 className="contact-heading">Let's build something <span className="grad-text">together</span>.</h3>
          <p className="muted">Open to conversations about Java backend work, Spring Boot and Integrations.</p>

          <ul className="contact-rows">
            <li>
              <a className="contact-row" href={`mailto:${contact.email}`}>
                <span className="icon-badge icon-badge-sm" aria-hidden="true"><TbMail /></span>
                <span className="contact-row-text"><small>Email</small><strong>{contact.email}</strong></span>
                <TbArrowUpRight className="row-arrow" aria-hidden="true" />
              </a>
              <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copy email address" title="Copy email">
                {copied ? <TbCheck /> : <TbCopy />}
              </button>
            </li>
            <li>
              <a className="contact-row" href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                <span className="icon-badge icon-badge-sm" aria-hidden="true"><TbPhone /></span>
                <span className="contact-row-text"><small>Phone</small><strong>{contact.phone}</strong></span>
                <TbArrowUpRight className="row-arrow" aria-hidden="true" />
              </a>
            </li>
            <li>
              <div className="contact-row">
                <span className="icon-badge icon-badge-sm" aria-hidden="true"><TbMapPin /></span>
                <span className="contact-row-text"><small>Location</small><strong>{contact.location}</strong></span>
              </div>
            </li>
            <li>
              <div className="contact-row">
                <span className="icon-badge icon-badge-sm" aria-hidden="true"><TbClock /></span>
                <span className="contact-row-text"><small>Time zone</small><strong>IST (UTC +5:30)</strong></span>
              </div>
            </li>
          </ul>

          <a className="btn btn-primary contact-cta" href={`mailto:${contact.email}`}>
            <TbMail aria-hidden="true" /> Email me directly
          </a>
        </div>

        <form className="card contact-form" onSubmit={submit}>
          <div className="form-head">
            <h3>Send a message</h3>
            <p className="muted small">Have a question or an opportunity? Drop a note below.</p>
          </div>

          <div className="field-row">
            <Field label="Name" icon={TbUser}>
              <input value={form.name} onChange={update('name')} required maxLength={100} placeholder="Your name" />
            </Field>
            <Field label="Email" icon={TbMail}>
              <input type="email" value={form.email} onChange={update('email')} required placeholder="you@example.com" />
            </Field>
          </div>
          <Field label="Subject" icon={TbTag}>
            <input value={form.subject} onChange={update('subject')} required maxLength={150} placeholder="What's it about?" />
          </Field>
          <Field label="Message" icon={TbMessage}>
            <textarea
              rows={5}
              value={form.message}
              onChange={update('message')}
              required
              maxLength={MESSAGE_MAX}
              placeholder="Write your message…"
            />
          </Field>

          <div className="form-foot">
            <button className="btn btn-primary btn-send" disabled={sending}>
              {sending ? 'Sending…' : <>Send message <TbSend aria-hidden="true" /></>}
            </button>
            <span className="muted small">{form.message.length} / {MESSAGE_MAX}</span>
          </div>

          {status.text && (
            <p className={`form-status ${status.type}`} role="status">
              {status.type === 'ok' ? <TbCircleCheckFilled aria-hidden="true" /> : <TbAlertCircle aria-hidden="true" />}
              {status.text}
            </p>
          )}
        </form>
      </div>

      <div className="socials">
        {socials.map(({ key, label, Icon, color }) => (
          <a
            key={key}
            className="social"
            href={contact[key]}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            style={color ? { '--brand': color } : undefined}
          >
            <Icon aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
