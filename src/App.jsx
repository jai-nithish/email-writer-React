import { useState } from 'react'
import './App.css'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material'
import axios from 'axios'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post("https://email-writer-sb-4yvy.onrender.com/api/email/generate", {
        emailContent,
        tone
      })
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
    } catch (error) {
      setError('Failed to generate email reply. Please try again')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe, #ede9fe)',
        py: 6,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant='h3' component="h1" align="center" gutterBottom sx={{ fontWeight: 700, color: '#5b21b6' }}>
            ✉️ Email Reply Generator
          </Typography>

          <Typography variant="body1" align="center" sx={{ mb: 3, color: '#4b5563' }}>
            Paste the original email, choose a tone, and get a thoughtful AI-generated reply.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3, backgroundColor: 'white' }}
          />

          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              label="Tone (Optional)"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            sx={{
              py: 1.5,
              background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(to right, #7c3aed, #6d28d9)'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "✨ Generate Reply"}
          </Button>

          {error && (
            <Typography color='error' sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {generatedReply && (
            <Box sx={{ mt: 4 }}>
              <Typography variant='h6' gutterBottom sx={{ color: '#4c1d95' }}>
                🎉 Generated Reply:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant='outlined'
                value={generatedReply}
                inputProps={{ readOnly: true }}
                sx={{ backgroundColor: '#f9fafb' }}
              />

              <Button
                variant='outlined'
                sx={{
                  mt: 2,
                  borderColor: '#8b5cf6',
                  color: '#6d28d9',
                  '&:hover': {
                    backgroundColor: '#ede9fe'
                  }
                }}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
              >
                📋 Copy to Clipboard
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default App
