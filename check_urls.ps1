$urls = @(
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80',
  'https://images.unsplash.com/photo-1548777123-e216912df28b?w=1200&q=80',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80',
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=80',
  'https://images.unsplash.com/photo-1490750967868-88df5691a654?w=1200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&q=80',
  'https://images.unsplash.com/photo-1419833479183-22b14e1ae89d?w=1200&q=80',
  'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1200&q=80'
)

foreach ($url in $urls) {
  try {
    $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 10
    Write-Host "$url => $($response.StatusCode)"
  } catch {
    if ($_.Exception.Response) {
      $code = $_.Exception.Response.StatusCode.Value__
      Write-Host "$url => ERROR $code"
    } else {
      Write-Host "$url => ERROR $($_.Exception.Message)"
    }
  }
}
