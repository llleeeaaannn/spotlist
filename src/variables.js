// Setlist.fm regex (ensures string contains 'setlist.fm')
const linkRegex = new RegExp('.*setlist\.fm.*');

// AWS API Gateway URL
const backendAPI = 'https://mkjs0ejsib.execute-api.us-east-1.amazonaws.com'

export { linkRegex, backendAPI }
