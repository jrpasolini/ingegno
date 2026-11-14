# Il Verdetto

The result follows the existing notebook palette: cream paper, blue ink, red
teacher corrections, the existing Einstein print and MSX decorations. The supplied
November 14 references guide the title, trophy, corrected exam and Genio note.
Books and trophy are reusable inline SVG drawings on the welcome screen as well.

The implementation deliberately keeps full question and answer text in a vertical
exam, rather than squeezing long generated questions into the reference's compact
columns or carousel. On phones, the score, tutor and actions stack vertically.

`public/performance.js` groups this attempt by subject and topic. Only a fully
correct group is listed as a strength; groups with mistakes are ranked by number
of errors. These are observations about the sampled questions, not a mastery claim.

`POST /ingegno/api/grade` keeps deterministic scoring and, when NVIDIA_API_KEY is
configured, requests an optional Nemotron study note using the existing model.
Only the score, topic aggregates and explanations of missed questions are sent.
The response is validated, length-limited and rendered as escaped text. A 12-second
timeout, upstream errors or invalid output fall back to local study guidance.
The UI identifies which source produced the note. No AI key is exposed to clients.
Study time stops before grading/model latency. No new provider is introduced.

Browser verification: completed a local five-question exam with 3/5; checked
incorrect-answer filtering, full review restoration and retry into a fresh exam
with the same configuration. Checked 390px mobile width with no horizontal
overflow, desktop rendering, and no browser console warnings/errors. Compared
the supplied reference and the saved result for paper palette, serif hierarchy,
blue/red corrections, score/trophy, tutor note and action layout.

Local environment had no NVIDIA key, so the provider-backed note still needs a
live production check; the fallback and deterministic grouping are tested.
