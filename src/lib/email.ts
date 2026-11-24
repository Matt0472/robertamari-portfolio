/**
 * A plausible email address, checked the same way in the form and in the worker.
 * No whitespace (so no CR/LF) and no angle brackets can pass: the worker relies on this to put
 * the address in the Reply-To header.
 */
export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
