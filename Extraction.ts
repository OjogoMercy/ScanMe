// Extraction Result
const ExtractionResult = {
  id: string,
  imageUri: string,
  extractedText: string,
  contacts: {
    phones: string[],
    emails: string[],
    websites: string[]
  },
  timestamp: Date,
  confidence: number
}

// App State
const AppState = {
  currentImage: string | null,
  extractionResult: ExtractionResult | null,
  history: ExtractionResult[],
  isLoading: boolean,
  error: string | null
}