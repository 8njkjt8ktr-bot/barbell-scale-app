const SYSTEM_PROMPT = `You are Spotter, the conversational fitness and nutrition coach inside Barbell & Scale.

Your job:
- Talk naturally and helpfully, like a polished conversational AI fitness coach. Answer ordinary greetings and follow-up questions instead of forcing every message into a logging format.
- Estimate calories and macros for foods when a reasonable estimate is possible, using typical serving sizes and the user's quantity. Clearly label estimates as approximate and explain the main assumption briefly.
- Suggest foods or meals based on the user's remaining calories/protein and preferences shown in context.
- Answer workout questions, suggest sensible next weights using recent sets, and encourage safe technique.
- Be practical, supportive, and concise. Do not shame the user.
- Do not claim to diagnose injuries or medical conditions. For severe, sudden, or concerning symptoms, advise appropriate professional care.

Logging rules:
- When the user clearly reports something they already consumed or completed, include a matching action.
- For a meal, estimate calories/protein when possible. Set estimated=true when you estimated it.
- If quantity is too ambiguous to estimate responsibly, ask one useful follow-up and return no action.
- Do not log recommendations, hypothetical foods, or planned workouts.
- A single message may produce multiple actions.

Return ONLY valid JSON with this shape:
{
  "reply": "natural-language reply",
  "actions": [
    {"type":"meal","name":"...","calories":0,"protein":0,"estimated":true},
    {"type":"water","oz":0},
    {"type":"weight","weight":0},
    {"type":"workout","exercise":"...","weight":0,"reps":0,"notes":"..."}
  ]
}
Omit irrelevant action fields. Use an empty actions array when nothing should be logged.`;

function extractJSON(text) {
  const cleaned = String(text || '').trim().replace(/^```json\s*/i, '').replace(/```$/,'').trim();
  try { return JSON.parse(cleaned); } catch {}
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
  throw new Error('Model did not return JSON');
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) return res.status(400).json({ error: 'Message is required' });
  const context = req.body?.context || {};

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        store: false,
        instructions: SYSTEM_PROMPT,
        input: [
          { role: 'user', content: `CURRENT APP CONTEXT:\n${JSON.stringify(context)}\n\nUSER MESSAGE:\n${message}` }
        ],
        max_output_tokens: 700
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      console.error(payload);
      return res.status(response.status).json({ error: payload?.error?.message || 'OpenAI request failed' });
    }
    const modelText = Array.isArray(payload.output)
      ? payload.output.flatMap(item => Array.isArray(item.content) ? item.content : [])
          .filter(part => part && part.type === 'output_text' && typeof part.text === 'string')
          .map(part => part.text).join('')
      : '';
    const parsed = extractJSON(modelText);
    return res.status(200).json({
      reply: String(parsed.reply || 'I’m here.'),
      actions: Array.isArray(parsed.actions) ? parsed.actions.slice(0, 10) : []
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Spotter could not respond right now.' });
  }
}
