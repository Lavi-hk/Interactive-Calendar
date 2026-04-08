import ssl
import urllib.request

urls = [
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
    'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1200&q=80',
]
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

for url in urls:
    req = urllib.request.Request(url, method='HEAD')
    try:
        with urllib.request.urlopen(req, timeout=10, context=ctx) as r:
            print(url, r.status)
    except Exception as e:
        print(url, 'ERROR', type(e).__name__, e)
