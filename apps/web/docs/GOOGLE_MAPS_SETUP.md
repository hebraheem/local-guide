# Google Maps Integration Setup

This guide will help you set up Google Maps for the map view feature.

## Prerequisites

1. A Google Cloud Platform (GCP) account
2. A credit card (required for Google Cloud, but you won't be charged unless you exceed free tier limits)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

## Step 2: Enable Required APIs

1. Navigate to **APIs & Services** > **Library**
2. Search for and enable the following APIs:
   - **Maps JavaScript API** (required)
   - **Geocoding API** (optional, for address to coordinates conversion)
   - **Places API** (optional, for location search)

## Step 3: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Your API key will be created
4. **Important:** Click on the key to edit it and add restrictions:

### Recommended Restrictions

#### Application Restrictions
- Select **HTTP referrers (websites)**
- Add your allowed domains:
  - `http://localhost:3000/*` (for development)
  - `https://yourdomain.com/*` (for production)
  - `https://*.yourdomain.com/*` (for subdomains)

#### API Restrictions
- Select **Restrict key**
- Choose:
  - Maps JavaScript API
  - Geocoding API (if using)
  - Places API (if using)

## Step 4: Add API Key to Your Project

1. Copy your API key
2. Open your `.env.local` file
3. Replace the placeholder with your actual API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/map` route
3. You should see a map with request markers

## Troubleshooting

### Map not loading?

**Check browser console for errors:**

1. **"This API key is not authorized to use this service"**
   - Make sure Maps JavaScript API is enabled
   - Check that your domain is in the allowed referrers list

2. **"RefererNotAllowedMapError"**
   - Add your domain to HTTP referrers in API key restrictions

3. **"ApiNotActivatedMapError"**
   - Enable the Maps JavaScript API in your GCP project

4. **Map shows "For development purposes only"**
   - You need to set up billing in Google Cloud Console
   - Don't worry, you won't be charged unless you exceed free tier limits

### Still having issues?

- Verify your API key is correct in `.env.local`
- Restart your development server after changing environment variables
- Clear browser cache
- Check [Google Maps Platform Status](https://status.cloud.google.com/)

## Free Tier Limits

Google Maps Platform offers generous free tier:
- $200 free credit per month
- Maps JavaScript API: 28,000 loads per month free
- This is typically enough for small to medium applications

## Security Best Practices

1. ✅ **Always restrict your API keys**
2. ✅ **Use different keys for development and production**
3. ✅ **Never commit API keys to version control**
4. ✅ **Monitor your API usage regularly**
5. ✅ **Set up billing alerts**

## Additional Resources

- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)

## Support

If you need help:
1. Check the [Google Maps Platform documentation](https://developers.google.com/maps)
2. Visit the [Stack Overflow tag](https://stackoverflow.com/questions/tagged/google-maps)
3. Consult the project's main README
