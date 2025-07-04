// export const evaluationParamsPrompt = `
// Return JSON with keys: scores (key-value), overallFeedback (text), observation (text).
// Example format:
// {
//   "scores": { "greeting": 5, "collectionUrgency": 12, ... },
//   "overallFeedback": "...",
//   "observation": "..."
// }

// Scoring Rules:
// - PASS_FAIL → 0 or weight
// - SCORE → 0 to weight

// Parameters:
// 1. Greeting (5) - Call opening within 5 seconds [PASS_FAIL]
// 2. Collection Urgency (15) - Create urgency, cross-questioning [SCORE]
// 3. Rebuttal Handling (15) - Address penalties, objections [SCORE]
// 4. Call Etiquette (15) - Tone, empathy, clear speech [SCORE]
// 5. Call Disclaimer (5) - Take permission before ending [PASS_FAIL]
// 6. Correct Disposition (10) - Use correct category with remark [PASS_FAIL]
// 7. Call Closing (5) - Thank customer properly [PASS_FAIL]
// 8. Identification (5) - Mention agent/customer info [PASS_FAIL]
// 9. Tape Disclosure (10) - Inform about recording [PASS_FAIL]
// 10. Tone & Language (15) - No abuse or threat [PASS_FAIL]`

export const evaluationParamsPrompt = `
You are a JSON generator. Return only JSON output without any explanation.

The JSON must follow this structure:
{
  "scores": {
    "greeting": 0-5,
    "collectionUrgency": 0-15,
    "rebuttalCustomerHandling": 0-15,
    "callEtiquette": 0-15,
    "callDisclaimer": 0-5,
    "correctDisposition": 0-10,
    "callClosing": 0-5,
    "fatalIdentification": 0-5,
    "fatalTapeDiscloser": 0-10,
    "fatalToneLanguage": 0-15
  },
  "overallFeedback": "A concise summary of what went well and what could improve.",
  "observation": "A detailed explanation of call flow, agent behavior, and improvement points."
}

Scoring Rules:
- PASS_FAIL → Either 0 or the full weight
- SCORE → Any value between 0 and the max weight

Evaluation Parameters:
1. **greeting** (5) – Call opening within 5 seconds [PASS_FAIL]
2. **collectionUrgency** (15) – Create urgency, cross-questioning [SCORE]
3. **rebuttalCustomerHandling** (15) – Address penalties, objections [SCORE]
4. **callEtiquette** (15) – Tone, empathy, clear speech [SCORE]
5. **callDisclaimer** (5) – Take permission before ending [PASS_FAIL]
6. **correctDisposition** (10) – Use correct category with remark [PASS_FAIL]
7. **callClosing** (5) – Thank the customer properly [PASS_FAIL]
8. **fatalIdentification** (5) – Missing agent/customer info [PASS_FAIL]
9. **fatalTapeDiscloser** (10) – Inform customer about recording [PASS_FAIL]
10. **fatalToneLanguage** (15) – No abusive or threatening speech [PASS_FAIL]

Analyze the transcript accordingly and return the final JSON.
`;
