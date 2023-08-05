import axios from 'axios'

export async function checkImageUrl(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, { timeout: 3000 })

    const contentType = response.headers['content-type']
    if (contentType && contentType.startsWith('image/')) {
      return true
    }

    return false
  } catch (error) {
    console.error('Error checking image URL:', error)
    return false
  }
}

export async function checkDocumentUrl(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, { timeout: 3000 })

    const contentType = response.headers['content-type']
    if (contentType && contentType.startsWith('application/pdf')) {
      return true
    }

    return false
  } catch (error) {
    console.error('Error checking document URL:', error)
    return false
  }
}
